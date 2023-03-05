import { Test } from '@nestjs/testing';

import { Model, disconnect } from 'mongoose';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { validate, version } from 'uuid';

import { Match, MatchDocument, MatchSchema } from './match.schema';

describe('MatchSchema', () => {
	let mongod: MongoMemoryServer;
	let matchModel: Model<MatchDocument>;

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
					{ name: Match.name, schema: MatchSchema },
				]),
			],
		}).compile();

		matchModel = app.get<Model<MatchDocument>>(getModelToken(Match.name));
        
		await matchModel.ensureIndexes();
	});

	afterAll(async () => {
		await disconnect();
		await mongod.stop();
	});

	it('has a default uuid v4 as id', () => {
		const model = new matchModel();

		expect(validate(model.id)).toBeTruthy();
		expect(version(model.id)).toBe(4);
	});

	it('has a required name', () => {
		const model = new matchModel();

		const err = model.validateSync();

		expect(err.errors.name).toBeInstanceOf(Error);
	});
});
