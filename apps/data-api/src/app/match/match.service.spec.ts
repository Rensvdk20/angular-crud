import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { MatchService } from './match.service';
import { Match, MatchDocument } from './match.schema';
import { UserService } from '../user/user.service';
import { Neo4jService } from '../neo4j/neo4j.service';
import { User } from '../user/user.schema';
import { Identity } from '../auth/identity.schema';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('MatchService', () => {
	let matchService: MatchService;
	let matchModel: Model<MatchDocument>;
	const match = {
		id: '8b91c85e-6a5a-42d5-b722-2b24c5dd405b',
		name: 'Training match',
		date: new Date(),
		location: 'Ahoy Rotterdam',
		rank: 1,
		prizeMoney: 0,
		racers: null,
		winner: null,
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				MatchService,
				UserService,
				Neo4jService,
				{
					provide: getModelToken(Match.name),
					useValue: {
						find: jest.fn(),
						findOne: jest.fn(),
						create: jest.fn(),
						save: jest.fn(),
						findByIdAndUpdate: jest.fn(),
					},
				},
				{
					provide: getModelToken(User.name),
					useValue: {},
				},
				{
					provide: getModelToken(Identity.name),
					useValue: {},
				},
			],
		}).compile();

		matchService = module.get<MatchService>(MatchService);
		matchModel = module.get<Model<MatchDocument>>(
			getModelToken(Match.name)
		);
	});

	describe('getMatchById', () => {
		it('should return a match', async () => {
			jest.spyOn(matchModel, 'findOne').mockReturnValueOnce({
				populate: jest.fn().mockReturnValueOnce(match),
			} as any);

			const result = await matchService.getMatchById(match.id);

			expect(result).toEqual(match);
		});

		it('should throw an exception when the match is not found', async () => {
			jest.spyOn(matchModel, 'findOne').mockReturnValueOnce(null);

			await expect(matchService.getMatchById(match.id)).toThrowError(
				new HttpException('Match not found', HttpStatus.NOT_FOUND)
			);
		});
	});

	describe('getAllMatches', () => {
		it('should return an array of matches', async () => {
			const matches = [new Match(), new Match()];

			jest.spyOn(matchModel, 'find').mockReturnValueOnce({
				exec: jest.fn().mockResolvedValueOnce(matches),
			} as any);

			const result = await matchService.getAllMatches();

			expect(result).toEqual(matches);
		});
	});
});
