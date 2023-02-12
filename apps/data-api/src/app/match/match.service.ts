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
			.populate('winner')
			.populate('racers');

		if (match == null)
			throw new HttpException('Match not found', HttpStatus.NOT_FOUND);

		return match;
	}

	async editMatchById(matchId: string, match: Match): Promise<Match> {
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

	async competeInMatch(userId: string, matchId: string): Promise<Match> {
		const user = await this.userService.getUserInfo(userId);
		const match = await this.getMatchById(matchId);

		if (user.racer == null) {
			throw new HttpException(
				'You are not a racer',
				HttpStatus.BAD_REQUEST
			);
		}

		if (match.racers.filter((racer) => racer.id === user.id).length > 0) {
			throw new HttpException(
				`You're already competing in this match`,
				HttpStatus.BAD_REQUEST
			);
		}

		if (user.racer.rank > match.rank) {
			throw new HttpException(
				`Your rank '${user.racer.rank}' is too high for the rank of this match '${match.rank}'`,
				HttpStatus.BAD_REQUEST
			);
		} else if (user.racer.rank < match.rank) {
			throw new HttpException(
				`Your rank '${user.racer.rank}' is too low for the rank of this match '${match.rank}'`,
				HttpStatus.BAD_REQUEST
			);
		}

		match.racers.push(user);

		const newMatch = new this.matchModel(match);
		return newMatch.save();
	}

	async addMatch(match: Match): Promise<Match> {
		if ('winner' in match) {
			const matchWinner = await this.userService.getUserInfo(
				String(match.winner)
			);

			match.winner = matchWinner;
		}

		const newMatch = new this.matchModel(match);
		return newMatch.save();
	}

	async deleteMatchById(matchId: string): Promise<Match> {
		const match = await this.matchModel.findOne({ id: matchId });

		if (match == null) {
			throw new HttpException('Not found', HttpStatus.NOT_FOUND);
		}

		return await match.remove();
	}
}
