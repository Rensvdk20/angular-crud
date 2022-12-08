import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { ResourceId } from '@drone-races/shared';
import { Racer } from '../racer/racer.schema';

@Injectable()
export class UserService {
	constructor(@InjectModel('User') private userModel: Model<UserDocument>) {}

	async getAllUsers(userId: string): Promise<User[]> {
		if (await this.checkIfAdmin(userId)) {
			return this.userModel.find().exec();
		}

		throw new HttpException('Unauthorised', HttpStatus.UNAUTHORIZED);
	}

	async getUserById(userId: string, id: string): Promise<User> {
		if (await this.checkIfAdmin(userId)) {
			return this.userModel.findOne({ id: id });
		}

		throw new HttpException('Unauthorised', HttpStatus.UNAUTHORIZED);
	}

	async getUserInfo(userId: string): Promise<User | null> {
		const user = await this.userModel.findOne({ id: userId });

		if (user == null) return null;

		return user;
	}

	async update(userId: string, user: User): Promise<User> {
		if (await this.checkIfAdmin(userId)) {
			return this.userModel.findOneAndUpdate({ id: userId }, user, {
				new: true,
			});
		}

		throw new HttpException('Unauthorised', HttpStatus.UNAUTHORIZED);
	}

	async registerRacer(userId: string, racer: Racer): Promise<User> {
		const user = await this.userModel.findOne({ id: userId });

		if (user.racer != null) {
			throw new HttpException(
				'User is already a racer',
				HttpStatus.BAD_REQUEST
			);
		}

		return this.userModel.findOneAndUpdate(
			{ id: userId },
			{ racer: racer },
			{ new: true }
		);
	}

	async checkIfAdmin(userId: string): Promise<boolean> {
		const user = await this.userModel.findOne({ id: userId });

		if (user != null) {
			return user.isAdmin;
		}
	}
}
