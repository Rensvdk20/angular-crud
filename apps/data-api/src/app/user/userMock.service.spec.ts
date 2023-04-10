import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from './user.schema';

describe('UserService', () => {
	let userService: UserService;
	let userModel: Model<UserDocument>;

	const user = {
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
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				UserService,
				{
					provide: getModelToken('User'),
					useValue: {
						find: jest.fn().mockResolvedValue([user]),
						findOne: jest.fn().mockResolvedValue(user),
					},
				},
				{
					provide: getModelToken('Identity'),
					useValue: {},
				},
			],
		}).compile();

		userService = module.get<UserService>(UserService);
		userModel = module.get<Model<UserDocument>>(getModelToken('User'));
	});

	describe('getAllUsers', () => {
		it('should return an array of users', async () => {
			const users = await userService.getAllUsers();

			expect(users).toEqual([user]);
		});

		it('Should return empty array if no users are found', async () => {
			jest.spyOn(userModel, 'find').mockResolvedValueOnce([]);
			const users = await userService.getAllUsers();

			expect(users).toEqual([]);
		});
	});

	describe('getUserById', () => {
		it('should return a user by id', async () => {
			const user = await userService.getUserById(
				'c65f36e6-96d3-49a8-ae77-6c9fe53f5123'
			);

			expect(user).toEqual({
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
			});
		});

		it('should return null if user is not found', async () => {
			jest.spyOn(userModel, 'findOne').mockResolvedValueOnce(null);
			const user = await userService.getUserById('unknown-id');

			expect(user).toBeNull();
		});
	});
});
