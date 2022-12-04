import { Injectable } from '@nestjs/common';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { ResourceId } from '@drone-races/shared';

@Injectable()
export class UserService {
	constructor(@InjectModel('User') private userModel: Model<UserDocument>) {}

	async getAll(): Promise<User[]> {
		return this.userModel.find().exec();
	}

	async getOne(userId: string): Promise<User | null> {
		const user = await this.userModel.findOne({ id: userId });

		if (user == null) return null;

		return this.userModel.findOne();
	}

	async update(userId: string, user: User): Promise<User> {
		return this.userModel.findOneAndUpdate({ id: userId }, user, {
			new: true,
		});
	}
}
