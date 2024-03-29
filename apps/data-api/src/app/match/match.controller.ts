import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	UseGuards,
} from '@nestjs/common';

import { MatchService } from './match.service';
import { Match } from './match.schema';
import { InjectToken, Token } from '../auth/token.decorator';
import { AdminGuard } from '../guards/admin/admin.guard';
import { IMatch } from '@drone-races/shared/src';

@Controller('match')
export class MatchController {
	constructor(private readonly matchService: MatchService) {}

	@Get('recommended/for-me')
	async getRecommendedMatches(
		@InjectToken() token: Token
	): Promise<IMatch[]> {
		console.log(token);
		return this.matchService.getRecommendedMatches(token.id);
	}

	@Get('racer/my-matches')
	async get(@InjectToken() token: Token): Promise<IMatch[]> {
		console.log(token);
		return this.matchService.getRacerFromMatch(token.id);
	}

	@Get()
	async getAllMatches(): Promise<Match[]> {
		return this.matchService.getAllMatches();
	}

	@Get(':id')
	async getMatchById(@Param('id') matchId: string): Promise<Match> {
		return this.matchService.getMatchById(matchId);
	}

	@Post('compete/:matchId')
	async competeInMatch(
		@InjectToken() token: Token,
		@Param('matchId') matchId: string
	): Promise<Match> {
		return this.matchService.competeInMatch(token.id, matchId);
	}

	@Post()
	@UseGuards(AdminGuard)
	async addMatch(@Body() match: Match): Promise<Match> {
		return this.matchService.addMatch(match);
	}

	@Put(':id')
	@UseGuards(AdminGuard)
	async editMatchById(
		@Param('id') matchId: string,
		@Body() match: Match
	): Promise<Match> {
		return this.matchService.editMatchById(matchId, match);
	}

	@Delete(':id')
	@UseGuards(AdminGuard)
	async deleteMatchById(@Param('id') matchId: string): Promise<Match> {
		return this.matchService.deleteMatchById(matchId);
	}
}
