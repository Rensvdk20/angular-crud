import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Match, MatchDocument } from './match.schema';
import { UserService } from '../user/user.service';

@Injectable()
export class MatchService {
	constructor(
		@InjectModel(Match.name) private matchModel: Model<MatchDocument>,
		private readonly userService: UserService
	) {}

	async getAllMatches(): Promise<Match[]> {
		return this.matchModel.find().exec();
	}

	async getMatchById(matchId: string): Promise<Match> {
		const match = await this.matchModel
			.findOne({ id: matchId })
			.populate('winner');

		if (match == null) return null;

		return match;
	}

	async editMatchById(
		userId: string,
		matchId: string,
		match: Match
	): Promise<Match> {
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

	async addMatch(userId: string, match: Match): Promise<Match> {
        if ('winner' in match) {
            const matchWinner = await this.userService.getUserInfo(
                String(match.winner)
            );

            match.winner = matchWinner;
        }

        const newMatch = new this.matchModel(match);
        return newMatch.save();
	}

	async deleteMatchById(userId: string, matchId: string): Promise<Match> {
        const match = await this.matchModel.findOne({ id: matchId });

        if (match == null) {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }

        return await match.remove();
	}
}
