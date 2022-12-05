import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserController } from './user/user.controller';
import { UserSchema } from './user/user.schema';
import { UserService } from './user/user.service';

import { MatchController } from './match/match.controller';
import { MatchSchema } from './match/match.schema';
import { MatchService } from './match/match.service';
@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: 'User', schema: UserSchema },
			{ name: 'Match', schema: MatchSchema },
		]),
	],
	controllers: [UserController, MatchController],
	providers: [UserService, MatchService],
})
export class DataModule {}
