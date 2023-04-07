import {
	Body,
	Controller,
	HttpException,
	HttpStatus,
	Post,
} from '@nestjs/common';
import { ResourceId } from '@drone-races/shared';
import {
	UserRegistration,
	UserCredentials,
	Token,
} from '@drone-races/shared/src/lib/models/auth/auth.model';

import { AuthService } from './auth.service';

@Controller()
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('register')
	async register(@Body() credentials: UserRegistration): Promise<ResourceId> {
		try {
			await this.authService.registerUser(
				credentials.email,
				credentials.password
			);

			return {
				id: await this.authService.createUser(
					credentials.firstName,
					credentials.lastName,
					credentials.email,
					credentials.birthday,
					false
				),
			};
		} catch (e) {
			throw new HttpException('Invalid input', HttpStatus.BAD_REQUEST);
		}
	}

	@Post('login')
	async login(@Body() credentials: UserCredentials): Promise<Token> {
		try {
			return {
				token: await this.authService.generateToken(
					credentials.email,
					credentials.password
				),
			};
		} catch (e) {
			throw new HttpException(
				'Invalid credentials',
				HttpStatus.UNAUTHORIZED
			);
		}
	}
}
