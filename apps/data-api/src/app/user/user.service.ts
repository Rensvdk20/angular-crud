import { Body, HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { Racer } from '../racer/racer.schema';
import { IdentityDocument } from '../auth/identity.schema';
import { Drone } from '../drone/drone.schema';
import { Neo4jService } from '../neo4j/neo4j.service';

@Injectable()
export class UserService {
	constructor(
		@InjectModel('User') private userModel: Model<UserDocument>,
		@InjectModel('Identity') private identityModel: Model<IdentityDocument>
	) // private readonly neo4jService: Neo4jService
	{}

	// ##### User #####

	async getAllUsers(): Promise<User[]> {
		// const movies = await this.neo4jService.singleRead(
		// 	'MATCH (n) RETURN n LIMIT 25'
		// );
		// movies.records.forEach((record) => {
		// 	console.log(record.get('n'));
		// });

		return this.userModel.find().exec();
	}

	async getUserById(id: string): Promise<User> {
		const user = this.userModel.findOne({ id: id });

		if (user == null) return null;

		return user;
	}

	async getUserInfo(userId: string): Promise<User | null> {
		const user = await this.userModel.findOne({ id: userId });

		if (user == null) return null;

		return user;
	}

	async updateUser(userId: string, user: User): Promise<User> {
		return this.userModel.findOneAndUpdate({ id: userId }, user, {
			new: true,
		});
	}

	async deleteUser(userId: string, userEmail: string): Promise<User> {
		const identity = await this.identityModel.findOne({ email: userEmail });
		const user = await this.userModel.findOne({ id: userId });

		if (identity == null || user == null) {
			throw new HttpException('Not found', HttpStatus.NOT_FOUND);
		}

		await identity.remove();
		return await user.remove();
	}

	// ##### Racer #####

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

	async editRacer(userId: string, racer: Racer): Promise<User> {
		const user = await this.userModel.findOne({ id: userId });

		if (user == null) {
			throw new HttpException('User Not found', HttpStatus.NOT_FOUND);
		}

		if (user.racer == null) {
			throw new HttpException(
				'User is not a racer',
				HttpStatus.BAD_REQUEST
			);
		}

		user.racer = racer;
		return await user.save();
	}

	async deleteRacer(userId: string): Promise<User> {
		const user = await this.userModel.findOne({ id: userId });

		if (user == null) {
			throw new HttpException('User not found', HttpStatus.NOT_FOUND);
		}

		if (user.racer == null) {
			throw new HttpException(
				'User is not a racer',
				HttpStatus.BAD_REQUEST
			);
		}

		user.racer = undefined;
		return await user.save();
	}

	async checkIfAdmin(userId: string): Promise<boolean> {
		const user = await this.getUserInfo(userId);
		return user.isAdmin;
	}

	// ##### Drone #####

	async registerDrone(userId: string, @Body() drone: Drone): Promise<User> {
		const user = await this.userModel.findOne({ id: userId });

		if (user == null) {
			throw new HttpException('User not found', HttpStatus.NOT_FOUND);
		}

		if (user.racer == null) {
			throw new HttpException(
				'User is not a racer',
				HttpStatus.BAD_REQUEST
			);
		}

		if (user.racer.drone != null) {
			throw new HttpException(
				'User already has a drone',
				HttpStatus.BAD_REQUEST
			);
		}

		user.racer.drone = drone;
		return await user.save();
	}

	async editDrone(userId: string, drone: Drone): Promise<User> {
		const user = await this.userModel.findOne({ id: userId });

		if (user == null) {
			throw new HttpException('User not found', HttpStatus.NOT_FOUND);
		}

		if (user.racer == null) {
			throw new HttpException(
				'User is not a racer',
				HttpStatus.BAD_REQUEST
			);
		}

		if (user.racer.drone == null) {
			throw new HttpException(
				'User does not have a drone',
				HttpStatus.BAD_REQUEST
			);
		}

		user.racer.drone = drone;
		return await user.save();
	}

	async deleteDrone(userId: string): Promise<User> {
		const user = await this.userModel.findOne({ id: userId });

		if (user == null) {
			throw new HttpException('User not found', HttpStatus.NOT_FOUND);
		}

		if (user.racer == null) {
			throw new HttpException(
				'User is not a racer',
				HttpStatus.BAD_REQUEST
			);
		}

		if (user.racer.drone == null) {
			throw new HttpException(
				'User does not have a drone',
				HttpStatus.BAD_REQUEST
			);
		}

		user.racer.drone = undefined;
		return await user.save();
	}
}
