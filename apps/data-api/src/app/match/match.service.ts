import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ResourceId } from '@drone-races/shared';
import { Match, MatchDocument } from './match.schema';
import { UserService } from '../user/user.service';

@Injectable()
export class MatchService {
	constructor(
		@InjectModel('Match') private matchModel: Model<MatchDocument>,
		private readonly userService: UserService
	) {}

	async getAllMatches(): Promise<Match[]> {
		return this.matchModel.find().exec();
	}

	async getMatchById(userId: string, matchId: string): Promise<Match> {
		if (await this.userService.checkIfAdmin(userId)) {
			const user = await this.matchModel
				.findOne({ id: matchId })
				.populate('winnerId');

			if (user == null) return null;

			return user;
		}
	}

	async addMatch(userId: string, match: Match): Promise<Match> {
		if (await this.userService.checkIfAdmin(userId)) {
			if ('winnerId' in match) {
				const matchWinner = await this.userService.getUser(
					String(match.winnerId)
				);

				match.winnerId = matchWinner;
			}

			const newMatch = new this.matchModel(match);
			return newMatch.save();
		}

		throw new HttpException('Unauthorised', HttpStatus.UNAUTHORIZED);
	}
}
