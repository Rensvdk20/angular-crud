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

	async getAllMatches(userId: string): Promise<Match[]> {
		return this.matchModel.find().exec();
	}

	async addMatch(userId: string, match: Match): Promise<Match> {
		if (await this.userService.checkIfAdmin(userId)) {
			const newMatch = new this.matchModel(match);
			return newMatch.save();
		}

		throw new HttpException('Unauthorised', HttpStatus.UNAUTHORIZED);
	}
}
