import { Test } from '@nestjs/testing';

import { Model, disconnect } from 'mongoose';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { validate, version } from 'uuid';

import { Drone, DroneSchema, DroneDocument } from './drone.schema';

describe('DroneSchema', () => {
	let mongod: MongoMemoryServer;

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
					{ name: Drone.name, schema: DroneSchema },
				]),
			],
		}).compile();
	});
});
