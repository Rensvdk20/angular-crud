import { Test } from '@nestjs/testing';

import { MongooseModule } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { disconnect } from 'mongoose';
import { MongoClient } from 'mongodb';

import { MatchService } from './match.service';
import { Match, MatchSchema } from './match.schema';
import { User, UserSchema } from '../user/user.schema';
import { UserService } from '@drone-races/shared/src';

describe('MatchService', () => {
	let matchService: MatchService;
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
					{ name: Match.name, schema: MatchSchema },
				]),
				MongooseModule.forFeature([
					{ name: User.name, schema: UserSchema },
				]),
			],
			providers: [MatchService, UserService],
		}).compile();

		matchService = app.get<MatchService>(MatchService);

		mongoc = new MongoClient(uri);
		await mongoc.connect();
	});

	beforeEach(async () => {
		await mongoc.db('test').collection('matches').deleteMany({});
	});

	afterAll(async () => {
		await mongoc.close();
		await disconnect();
		await mongod.stop();
	});

	// describe('create', () => {
	// 	it('should create a new match', async () => {
	// 		const exampleMatch = {
	// 			name: 'Rookie Race',
	// 			date: new Date(),
	// 			location: 'Amsterdam',
	// 			rank: 1,
	// 			prizeMoney: 25,
	// 		} as Match;

	// 		await matchService.addMatch(exampleMatch);

	// 		const found = await mongoc
	// 			.db('test')
	// 			.collection('matches')
	// 			.findOne({ name: exampleMatch.name });

	// 		expect(found.name).toBe(exampleMatch.name);
	// 	});
	// });

	// describe('register user', () => {
	// 	it('should register a new user', async () => {
	// 		const exampleUser = {
	// 			username: 'henk',
	// 			password: 'supersecret123',
	// 			emailAddress: 'mail@mail.com',
	// 		};

	// 		await ticketService.registerUser(
	// 			exampleUser.username,
	// 			exampleUser.password,
	// 			exampleUser.emailAddress
	// 		);

	// 		const record = await mongoc
	// 			.db('test')
	// 			.collection('identities')
	// 			.findOne({ username: exampleUser.username });

	// 		expect(record).toHaveProperty('username', exampleUser.username);
	// 		expect(record).toHaveProperty('hash');
	// 	});
	// });
});
