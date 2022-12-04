import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserController } from './user/user.controller';
import { UserSchema } from './user/user.schema';
import { UserService } from './user/user.service';

@Module({
	imports: [
		MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
	],
	controllers: [UserController],
	providers: [UserService],
})
export class DataModule {}
