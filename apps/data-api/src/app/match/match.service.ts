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

	async getMatchById(matchId: string): Promise<Match> {
		const user = await this.matchModel
			.findOne({ id: matchId })
			.populate('winner');

		if (user == null) return null;

		return user;
	}

	async editMatchById(
		userId: string,
		matchId: string,
		match: Match
	): Promise<Match> {
		if (await this.userService.checkIfAdmin(userId)) {
			if ('winner' in match) {
				const matchWinner = await this.userService.getUserInfo(
					String(match.winner)
				);

				match.winner = matchWinner;
			}

			return this.matchModel.findOneAndUpdate({ id: matchId }, match, {
				new: true,
			});
		}
	}

	async addMatch(userId: string, match: Match): Promise<Match> {
		if (await this.userService.checkIfAdmin(userId)) {
			if ('winner' in match) {
				const matchWinner = await this.userService.getUserInfo(
					String(match.winner)
				);

				match.winner = matchWinner;
			}

			const newMatch = new this.matchModel(match);
			return newMatch.save();
		}

		throw new HttpException('Unauthorised', HttpStatus.UNAUTHORIZED);
	}
}
