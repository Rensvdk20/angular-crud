import { InjectionToken } from '@angular/core';
import { Body, Controller, Get, Post } from '@nestjs/common';

import { MatchService } from './match.service';
import { Match } from './match.schema';
import { InjectToken, Token } from '../auth/token.decorator';
import { ResourceId } from '@drone-races/shared';
import { Racer } from '../racer/racer.schema';

@Controller('match')
export class MatchController {
	constructor(private readonly matchService: MatchService) {}

	@Get()
	async getAllMatches(@InjectToken() token: Token): Promise<Match[]> {
		return this.matchService.getAllMatches(token.id);
	}

	@Post()
	async addMatch(
		@InjectToken() token: Token,
		@Body() match: Match
	): Promise<Match> {
		return this.matchService.addMatch(token.id, match);
	}
}
