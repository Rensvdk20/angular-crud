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
import { Racer } from '../racer/racer.schema';

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get()
	async getAllUsers(@InjectToken() token: Token): Promise<User[]> {
		return this.userService.getAllUsers(token.id);
	}

	@Get('info')
	async getUserInfo(@InjectToken() token: Token): Promise<User> {
		return this.userService.getUserInfo(token.id);
	}

	@Get(':id')
	async getUserById(
		@InjectToken() token: Token,
		@Param('id') id: string
	): Promise<User> {
		return this.userService.getUserById(token.id, id);
	}

	@Put()
	async updateUserInfo(
		@InjectToken() token: Token,
		@Body() user: User
	): Promise<User> {
		return this.userService.update(token.id, user);
	}

	@Post('register-racer')
	async registerRacer(
		@InjectToken() token: Token,
		@Body() racer: Racer
	): Promise<User> {
		return this.userService.registerRacer(token.id, racer);
	}
}
