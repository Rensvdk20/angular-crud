import { InjectionToken } from '@angular/core';
import {
	Body,
	Controller,
	Get,
	HttpException,
	HttpStatus,
	Param,
	Post,
	Put,
} from '@nestjs/common';

import { UserService } from './user.service';
import { User } from './user.schema';
import { InjectToken, Token } from '../auth/token.decorator';
import { ResourceId } from '@drone-races/shared';

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get()
	async getUserInfo(@InjectToken() token: Token): Promise<User> {
		console.log('token', token);
		return this.userService.getOne(token.id);
	}

	@Put()
	async updateUserInfo(
		@InjectToken() token: Token,
		@Body() user: User
	): Promise<User> {
		return this.userService.update(token.id, user);
	}
}
