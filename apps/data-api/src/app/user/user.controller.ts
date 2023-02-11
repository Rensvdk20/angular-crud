import { InjectionToken } from '@angular/core';
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

import { UserService } from './user.service';
import { User } from './user.schema';
import { InjectToken, Token } from '../auth/token.decorator';
import { Racer } from '../racer/racer.schema';
import { Drone } from '../drone/drone.schema';
import { AdminGuard } from '../guards/admin/admin.guard';

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	// ##### User #####

	@Get()
	@UseGuards(AdminGuard)
	async getAllUsers(): Promise<User[]> {
		return this.userService.getAllUsers();
	}

	@Get('info')
	async getUserInfo(@InjectToken() token: Token): Promise<User> {
		return this.userService.getUserInfo(token.id);
	}

	@Get(':id')
	@UseGuards(AdminGuard)
	async getUserById(@Param('id') id: string): Promise<User> {
		return this.userService.getUserById(id);
	}

	@Put()
	async updateUserInfo(
		@InjectToken() token: Token,
		@Body() user: User
	): Promise<User> {
		return this.userService.updateUser(token.id, user);
	}

	@Delete()
	@UseGuards(AdminGuard)
	async deleteUser(@InjectToken() token: Token): Promise<User> {
		return this.userService.deleteUser(token.id, token.email);
	}

	// ##### Racer #####

	@Post('racer')
	async registerRacer(
		@InjectToken() token: Token,
		@Body() racer: Racer
	): Promise<User> {
		return this.userService.registerRacer(token.id, racer);
	}

	@Put('racer')
	async editRacer(
		@InjectToken() token: Token,
		@Body() racer: Racer
	): Promise<User> {
		return this.userService.editRacer(token.id, racer);
	}

	@Delete('racer')
	async deleteRacer(@InjectToken() token: Token): Promise<User> {
		return this.userService.deleteRacer(token.id);
	}

	// ##### Drone #####

	@Post('drone')
	async registerDrone(
		@InjectToken() token: Token,
		@Body() drone: Drone
	): Promise<User> {
		return this.userService.registerDrone(token.id, drone);
	}

	@Put('drone')
	async editDrone(
		@InjectToken() token: Token,
		@Body() drone: Drone
	): Promise<User> {
		return this.userService.editDrone(token.id, drone);
	}

	@Delete('drone')
	async deleteDrone(@InjectToken() token: Token): Promise<User> {
		return this.userService.deleteDrone(token.id);
	}
}
