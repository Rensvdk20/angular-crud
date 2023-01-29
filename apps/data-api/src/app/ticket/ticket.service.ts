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

    async getAllTickets(): Promise<Ticket[]> {
        return this.ticketModel.find().populate('match').sort({ match: 1 });
    }

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

    async getTicketById(ticketId: string): Promise<Ticket> {
        const ticket = await await this.ticketModel.findOne({ id: ticketId }).populate('reservedBy').populate('match');

        if(ticket == null) {
            throw new HttpException('Ticket not found', HttpStatus.NOT_FOUND);
        }

        return ticket;
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

    async cancelTicket(userId: string, ticketId: string): Promise<Ticket> {
        const ticket = await this.getTicketById(ticketId);

        if(ticket.reservedBy == null) {
            throw new HttpException('This ticket is not reserved by anyone', HttpStatus.BAD_REQUEST);
        }

        if(ticket.reservedBy.id !== userId) {
            throw new HttpException('You cannot cancel this ticket', HttpStatus.BAD_REQUEST);
        }

        //If the ticket match date is 7 days or less in the future, the ticket cannot be cancelled
        const matchDate = ticket.match.date;
        const currentDate = new Date();
        const differenceInTime = matchDate.getTime() - currentDate.getTime();
        const differenceInDays = differenceInTime / (1000 * 3600 * 24);

        if(differenceInDays <= 7) {
            throw new HttpException('You can only cancel a ticket 7 days before the match', HttpStatus.BAD_REQUEST);
        }

        ticket.reservedBy = null;
        
        return await this.ticketModel.findOneAndUpdate(
            { id: ticket.id },
            ticket,
            { new: true }
        ).populate('match');
    }

    async reserveTicket(userId: string, ticketId: string): Promise<Ticket> {
        const ticket = await this.getTicketById(ticketId);

        if (ticket == null) {
            throw new HttpException('Ticket not found', HttpStatus.NOT_FOUND);
        }

        if (ticket.reservedBy != null) {
            throw new HttpException('Ticket already reserved', HttpStatus.BAD_REQUEST);
        }

        ticket.reservedBy = await this.userService.getUserById(userId);

        return await this.ticketModel.findOneAndUpdate(
            { id: ticket.id},
            ticket,
            { new: true}
        );
    }

    async editTicketById(ticketId: string, ticket: Ticket): Promise<Ticket> {
        if ('match' in ticket) {
            const match = await this.matchService.getMatchById(
                String(ticket.match)
            );

            ticket.match = match;
        }

        return await this.ticketModel.findOneAndUpdate(
            { id: ticketId },
            ticket,
            { new: true }
        );
    }

    async deleteTicketById(ticketId: string): Promise<Ticket> {
        const ticket = await this.ticketModel.findOneAndDelete({ id: ticketId });
        if(ticket == null) {
            throw new HttpException('Ticket not found', HttpStatus.NOT_FOUND);
        }

        return ticket;
    }
}
