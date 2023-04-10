import { Test, TestingModule } from '@nestjs/testing';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthService } from '../auth/auth.service';

describe('UserController', () => {
	let app: TestingModule;
	let userController: UserController;
	let userService: UserService;

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

	beforeEach(async () => {
		app = await Test.createTestingModule({
			controllers: [UserController],
			providers: [
				{
					provide: UserService,
					useFactory: () => ({
						getAllUsers: jest.fn(),
						getUserById: jest.fn(),
					}),
				},
				{
					provide: AuthService,
					useFactory: () => ({
						validateUser: jest.fn(),
					}),
				},
			],
		}).compile();

		userService = app.get<UserService>(UserService);
		userController = app.get<UserController>(UserController);
	});

	describe('getAllUsers', () => {
		it('should getAll users from service', async () => {
			const getAllUsers = jest
				.spyOn(userService, 'getAllUsers')
				.mockImplementation(async () => users);
			const results = await userController.getAllUsers();

			expect(results.length).toBe(1);
			expect(results[0].id).toBe(users[0].id);
		});

		it('should return empty array if no users are found', async () => {
			const getAllUsers = jest
				.spyOn(userService, 'getAllUsers')
				.mockImplementation(async () => []);
			const results = await userController.getAllUsers();

			expect(results.length).toBe(0);
		});
	});

	describe('GetUserById', () => {
		it('should call getUserById on the service', async () => {
			const getOne = jest
				.spyOn(userService, 'getUserById')
				.mockImplementation(async () => users[0]);

			const result = await userController.getUserById(users[0].id);

			expect(result.id).toBe(users[0].id);
		});

		it('should return null if no user is found', async () => {
			const getOne = jest
				.spyOn(userService, 'getUserById')
				.mockImplementation(async () => null);

			const result = await userController.getUserById(users[0].id);

			expect(result).toBeNull();
		});
	});
});
