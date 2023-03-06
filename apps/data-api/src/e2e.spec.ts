require('dotenv').config();
import request = require('supertest');

import { MongooseModule } from '@nestjs/mongoose';
import { Neo4jModule } from './app/neo4j/neo4j.module';
import { Test, TestingModule } from '@nestjs/testing';
import {
	INestApplication,
	MiddlewareConsumer,
	Module,
	RequestMethod,
} from '@nestjs/common';
import { RouterModule } from '@nestjs/core';

import { MongoClient } from 'mongodb';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { disconnect } from 'mongoose';

import { AuthModule } from './app/auth/auth.module';
import { DataModule } from './app/data.module';
import { TokenMiddleware } from './app/auth/token.middleware';
import { ApiResponseInterceptor } from './app/api-response.interceptor';

let mongod: MongoMemoryServer;
let uri: string;

@Module({
	imports: [
		MongooseModule.forRootAsync({
			useFactory: async () => {
				mongod = await MongoMemoryServer.create();
				uri = mongod.getUri();
				return { uri };
			},
		}),
		Neo4jModule.forRoot({
			// Localhost
			// scheme: 'neo4j',

			// Aura
			scheme: 'neo4j+s',
			host: process.env.NEO4J_HOST,
			username: process.env.NEO4J_USERNAME,
			password: process.env.NEO4J_PASSWORD,
			database: process.env.NEO4J_DATABASE,
		}),
		AuthModule,
		DataModule,
		RouterModule.register([
			{
				path: 'auth-api',
				module: AuthModule,
			},
			{
				path: 'data-api',
				module: DataModule,
			},
		]),
	],
	controllers: [],
	providers: [],
})
export class TestAppModule {
	configure(consumer: MiddlewareConsumer) {
		consumer
			.apply(TokenMiddleware)
			.exclude(
				{ path: 'data-api/match', method: RequestMethod.GET },
				{ path: 'data-api/match/:id', method: RequestMethod.GET }
			)
			.forRoutes('data-api');
	}
}

describe('end-to-end tests of data API', () => {
	let app: INestApplication;
	let server;
	let module: TestingModule;
	let mongoc: MongoClient;

	beforeAll(async () => {
		// sadly I have not found a way to override the Mongoose connection of the AppModule,
		// so here we duplicate the config of the AppModule...
		// contact me if you know how to do this better!
		// https://github.com/nestjs/nest/issues/4905
		module = await Test.createTestingModule({
			imports: [TestAppModule],
		}).compile();

		app = module.createNestApplication();
		app.useGlobalInterceptors(new ApiResponseInterceptor());
		await app.init();

		mongoc = new MongoClient(uri);
		await mongoc.connect();

		server = app.getHttpServer();
	});

	beforeEach(async () => {
		await mongoc.db('test').collection('identities').deleteMany({});
		await mongoc.db('test').collection('users').deleteMany({});
		await mongoc.db('test').collection('matches').deleteMany({});
		await mongoc.db('test').collection('tickets').deleteMany({});
	});

	afterAll(async () => {
		await mongoc.close();
		await disconnect();
		await mongod.stop();
	});

	describe('matches', () => {
		// beforeEach(() => {

		// });

		it('should get all matches', async () => {
			const matches = await request(server).get('/data-api/match');
			console.log(matches.body);
			expect(matches.status).toBe(200);
			expect(matches.body.results.length).toBeGreaterThanOrEqual(1);
		});
	});
});
