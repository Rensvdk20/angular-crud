import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';

import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from './auth/auth.module';
import { TokenMiddleware } from './auth/token.middleware';
import { DataModule } from './data.module';
import { Neo4jModule } from './neo4j/neo4j.module';

@Module({
	imports: [
		MongooseModule.forRoot(
			`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PWD}@${process.env.MONGO_HOST}/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`
		),
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
export class AppModule {
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
