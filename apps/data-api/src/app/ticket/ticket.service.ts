import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserService } from '../user/user.service';
import { Ticket, TicketDocument } from './ticket.schema';
import { MatchService } from '../match/match.service';

@Injectable()
export class TicketService {
	constructor(
		@InjectModel(Ticket.name) private ticketModel: Model<TicketDocument>,
		private readonly userService: UserService,
		private readonly matchService: MatchService
	) {}

    async getAllTicketsFromMatch(matchId: string): Promise<Ticket[]> {
        const match = await this.matchService.getMatchById(matchId);
        return this.ticketModel.find({ match: match });
    }

    async getAllUnreservedTicketsFromMatch(matchId: string): Promise<Ticket[]> {
        const match = await this.matchService.getMatchById(matchId);
        return this.ticketModel.find({ match: match, reservedBy: null });
    }

    async getAllTicketsFromUser(userId: string): Promise<Ticket[]> {
        const user = await this.userService.getUserById(userId);
        return this.ticketModel.find({ reservedBy: user }).populate('match');
    }

	async addTicket(ticket: Ticket): Promise<Ticket> {
        if ('match' in ticket) {
            const match = await this.matchService.getMatchById(
                String(ticket.match)
            );

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

    async reserveTicket(userId: string, ticketId: string): Promise<Ticket> {
        const ticket = await this.ticketModel.findOne({ id: ticketId });

        if (ticket == null) {
            throw new HttpException('Ticket not found', HttpStatus.NOT_FOUND);
        }

        if (ticket.reservedBy != null) {
            throw new HttpException('Ticket already reserved', HttpStatus.BAD_REQUEST);
        }

        ticket.reservedBy = await this.userService.getUserById(userId);

        return ticket.save();
    }
}
