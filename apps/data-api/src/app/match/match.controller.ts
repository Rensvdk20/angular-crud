import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
} from '@nestjs/common';

import { MatchService } from './match.service';
import { Match } from './match.schema';
import { InjectToken, Token } from '../auth/token.decorator';

@Controller('match')
export class MatchController {
	constructor(private readonly matchService: MatchService) {}

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
	async addMatch(
		@InjectToken() token: Token,
		@Body() match: Match
	): Promise<Match> {
		return this.matchService.addMatch(token.id, match);
	}

	@Put(':id')
	async editMatchById(
		@Param('id') matchId: string,
		@Body() match: Match
	): Promise<Match> {
		return this.matchService.editMatchById(matchId, match);
	}

	@Delete(':id')
	async deleteMatchById(
		@InjectToken() token: Token,
		@Param('id') matchId: string
	): Promise<Match> {
		return this.matchService.deleteMatchById(token.id, matchId);
	}
}
