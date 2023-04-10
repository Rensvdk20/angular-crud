import { Test } from '@nestjs/testing';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { Model, disconnect } from 'mongoose';
import { MongoClient } from 'mongodb';
import { Match, MatchSchema } from '../match/match.schema';
import { User, UserDocument, UserSchema } from './user.schema';
import { Identity, IdentitySchema } from '../auth/identity.schema';

describe('UserService', () => {
	let service: UserService;
	let mongod: MongoMemoryServer;
	let mongoc: MongoClient;
	let userModel: Model<UserDocument>;

	const users = [
		{
			id: 'c65f36e6-96d3-49a8-ae77-6c9fe53f5123',
			firstName: 'Ash',
			lastName: 'Bridge',
			email: 'ashb@gmail.com',
			birthday: new Date('1990-01-01'),
			isAdmin: false,
			racer: {
				team: 'Team 1',
				rank: 1,
				drone: {
					name: 'Drone 1',
					category: 'Category 1',
					weight: 1,
					brushless: true,
				},
			},
		},
	];

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
					{ name: Identity.name, schema: IdentitySchema },
					{ name: User.name, schema: UserSchema },
				]),
			],
			providers: [UserService, UserService],
		}).compile();

		service = app.get<UserService>(UserService);
		userModel = app.get<Model<UserDocument>>(getModelToken(User.name));

		mongoc = new MongoClient(uri);
		await mongoc.connect();
	});

	beforeEach(async () => {
		await userModel.deleteMany({});

		const user = new userModel(users[0]);
		await user.save();
	});

	afterAll(async () => {
		await mongoc.close();
		await disconnect();
		await mongod.stop();
	});

	describe('getAllTickets', () => {
		it('should return an array of users', async () => {
			const result = await service.getAllUsers();
			expect(result).toBeInstanceOf(Array);
			expect(result.length).toBe(1);
			expect(result[0].id).toEqual(users[0].id);
		});

		it('Should return empty array if no users are found', async () => {
			await userModel.deleteMany({});
			const result = await service.getAllUsers();
			expect(result).toBeInstanceOf(Array);
			expect(result.length).toBe(0);
		});
	});

	describe('getUserById', () => {
		it('should return a user', async () => {
			const result = await service.getUserById(users[0].id);
			expect(result).toBeInstanceOf(Object);
			expect(result.id).toEqual(users[0].id);
		});

		it('should return null if user is not found', async () => {
			const result = await service.getUserById('123');
			expect(result).toBeNull();
		});
	});
});
