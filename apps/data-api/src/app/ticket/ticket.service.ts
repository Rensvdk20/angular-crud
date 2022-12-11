import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserService } from '../user/user.service';
import { Ticket, TicketDocument } from './ticket.schema';
import { MatchService } from '../match/match.service';

@Injectable()
export class TicketService {
	constructor(
		@InjectModel('Match') private ticketModel: Model<TicketDocument>,
		private readonly userService: UserService,
		private readonly matchService: MatchService
	) {}

	async addTicket(userId: string, ticket: Ticket): Promise<Ticket> {
		if (await this.userService.checkIfAdmin(userId)) {
			if ('match' in ticket) {
				const match = await this.matchService.getMatchById(
					String(ticket.match)
				);

				console.log(match);
				ticket.match = match;
			} else {
				throw new HttpException(
					'Match is required',
					HttpStatus.BAD_REQUEST
				);
			}

			const newTicket = new this.ticketModel(ticket);
			return newTicket.save();
		}

		throw new HttpException('Unauthorised', HttpStatus.UNAUTHORIZED);
	}
}
