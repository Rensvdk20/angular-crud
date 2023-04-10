import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { disconnect, Model } from 'mongoose';
import { User, UserDocument, UserSchema } from './user.schema';
import { validate, version } from 'uuid';

describe('User Schema', () => {
	let mongod: MongoMemoryServer;
	let userModel: Model<UserDocument>;

	beforeAll(async () => {
		const app = await Test.createTestingModule({
			imports: [
				MongooseModule.forRootAsync({
					useFactory: async () => {
						mongod = await MongoMemoryServer.create();
						const uri = mongod.getUri();
						return { uri };
					},
				}),
				MongooseModule.forFeature([
					{ name: User.name, schema: UserSchema },
				]),
			],
		}).compile();

		userModel = app.get<Model<UserDocument>>(getModelToken(User.name));

		await userModel.ensureIndexes();
	});

	afterAll(async () => {
		await disconnect();
		await mongod.stop();
	});

	it('should be defined', () => {
		expect(UserSchema).toBeDefined();
	});

	it('has a default uuid v4 as id', () => {
		const model = new userModel();

		expect(validate(model.id)).toBeTruthy();
		expect(version(model.id)).toBe(4);
	});

	it('has a required firstName', () => {
		const model = new userModel();
		expect(model.validateSync().errors.firstName).toBeDefined();
	});

	it('has a required lastName', () => {
		const model = new userModel();
		expect(model.validateSync().errors.lastName).toBeDefined();
	});

	it('has a required email', () => {
		const model = new userModel();
		expect(model.validateSync().errors.email).toBeDefined();
	});

	it('has a required birthday', () => {
		const model = new userModel();
		expect(model.validateSync().errors.birthday).toBeDefined();
	});

	it('has a property isadmin that is false by default', () => {
		const model = new userModel();
		expect(model.isAdmin).toBe(false);
	});
});
