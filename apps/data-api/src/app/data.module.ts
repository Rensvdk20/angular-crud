import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserController } from './user/user.controller';
import { UserSchema } from './user/user.schema';
import { UserService } from './user/user.service';

import { MatchController } from './match/match.controller';
import { MatchSchema } from './match/match.schema';
import { MatchService } from './match/match.service';

import { IdentitySchema } from './auth/identity.schema';
import { TicketSchema } from './ticket/ticket.schema';
import { TicketService } from './ticket/ticket.service';
import { TicketController } from './ticket/ticket.controller';
import { AuthService } from './auth/auth.service';
@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: 'Identity', schema: IdentitySchema },
			{ name: 'User', schema: UserSchema },
			{ name: 'Match', schema: MatchSchema },
			{ name: 'Ticket', schema: TicketSchema },
		]),
	],
	controllers: [UserController, TicketController, MatchController],
	providers: [UserService, TicketService, MatchService, AuthService],
})
export class DataModule {}
