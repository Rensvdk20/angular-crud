require('dotenv').config();
import { Test } from '@nestjs/testing';

import { MongooseModule } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { disconnect } from 'mongoose';
import { MongoClient } from 'mongodb';

import { sign } from 'jsonwebtoken';

import { AuthService } from './auth.service';
import { Identity, IdentitySchema } from './identity.schema';
import { User, UserSchema } from '../user/user.schema';

describe('AuthService', () => {
	let service: AuthService;
	let mongod: MongoMemoryServer;
	let mongoc: MongoClient;

	beforeAll(async () => {
		let uri: string;

		const app = await Test.createTestingModule({
			imports: [
				MongooseModule.forRootAsync({
					useFactory: async () => {
						mongod = await MongoMemoryServer.create();
						uri = mongod.getUri();
						return { uri };
					},
				}),
				MongooseModule.forFeature([
					{ name: Identity.name, schema: IdentitySchema },
				]),
				MongooseModule.forFeature([
					{ name: User.name, schema: UserSchema },
				]),
			],
			providers: [AuthService],
		}).compile();

		service = app.get<AuthService>(AuthService);

		mongoc = new MongoClient(uri);
		await mongoc.connect();
	});

	beforeEach(async () => {
		await mongoc.db('test').collection('identities').deleteMany({});
	});

	afterAll(async () => {
		await mongoc.close();
		await disconnect();
		await mongod.stop();
	});

	describe('create user', () => {
		it('should create a new user', async () => {
			const exampleUser = {
				firstName: 'John',
				lastName: 'Doe',
				email: 'johnd@gmail.com',
				birthday: new Date(),
				isAdmin: false,
			};

			await service.createUser(
				exampleUser.firstName,
				exampleUser.lastName,
				exampleUser.email,
				exampleUser.birthday,
				exampleUser.isAdmin
			);

			const found = await mongoc
				.db('test')
				.collection('users')
				.findOne({ firstName: exampleUser.firstName });

			expect(found.firstName).toBe(exampleUser.firstName);
		});
	});

	describe('verify token', () => {
		it('should accept a valid token', async () => {
			const examplePayload = {
				email: 'test@gmail.com',
				id: 'c98acee5-3bdd-431d-9a2b-dfae5d063b00',
			};

			const token = sign(examplePayload, process.env.JWT_SECRET);

			const verifiedToken = await service.verifyToken(token);

			expect(verifiedToken).toHaveProperty('email', examplePayload.email);
			expect(verifiedToken).toHaveProperty('id', examplePayload.id);
		});

		it('should throw on invalid token', async () => {
			const token = 'fake.fake.fake';

			await expect(service.verifyToken(token)).rejects.toThrow();
		});
	});
});
