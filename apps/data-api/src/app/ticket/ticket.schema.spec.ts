import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { disconnect, Model } from 'mongoose';
import { Ticket, TicketDocument, TicketSchema } from './ticket.schema';
import { validate, version } from 'uuid';

describe('Ticket Schema', () => {
	let mongod: MongoMemoryServer;
	let ticketModel: Model<TicketDocument>;

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
					{ name: Ticket.name, schema: TicketSchema },
				]),
			],
		}).compile();

		ticketModel = app.get<Model<TicketDocument>>(
			getModelToken(Ticket.name)
		);

		await ticketModel.ensureIndexes();
	});

	afterAll(async () => {
		await disconnect();
		await mongod.stop();
	});

	it('should be defined', () => {
		expect(TicketSchema).toBeDefined();
	});

	it('has a default uuid v4 as id', () => {
		const model = new ticketModel();

		expect(validate(model.id)).toBeTruthy();
		expect(version(model.id)).toBe(4);
	});

	it('has a required price', () => {
		const model = new ticketModel();
		expect(model.validateSync().errors.price).toBeDefined();
	});

	it('has a required type', () => {
		const model = new ticketModel();
		expect(model.validateSync().errors.type).toBeDefined();
	});

	it('has a required seatNumber', () => {
		const model = new ticketModel();
		expect(model.validateSync().errors.seatNumber).toBeDefined();
	});

	it('has a required match', () => {
		const model = new ticketModel();
		expect(model.validateSync().errors.match).toBeDefined();
	});

	it('has a reserved by (user) that is default undefined', () => {
		const model = new ticketModel();
		expect(model.reservedBy).toBeUndefined();
	});
});
