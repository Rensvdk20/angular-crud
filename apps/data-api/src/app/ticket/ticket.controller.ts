import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
} from '@nestjs/common';

import { InjectToken, Token } from '../auth/token.decorator';
import { Ticket } from './ticket.schema';
import { TicketService } from './ticket.service';

@Controller('ticket')
export class TicketController {
	constructor(private readonly ticketService: TicketService) {}

    @Get('unreserved/:matchId')
    async getAllUnreservedTicketsFromMatch(
        @Param('matchId') matchId: string,
    ): Promise<Ticket[]> {
        return this.ticketService.getAllUnreservedTicketsFromMatch(matchId);
    }

    @Get(':matchId')
    async getAllTicketsFromMatch(
        @Param('matchId') matchId: string,
    ): Promise<Ticket[]> {
        return this.ticketService.getAllTicketsFromMatch(matchId);
    }

    @Post('reserve/:ticketId')
    async ReserveTicket(
        @InjectToken() token: Token,
        @Param('ticketId') ticketId: string,
    ): Promise<Ticket> {
        return this.ticketService.reserveTicket(token.id, ticketId);
    }

	@Post()
	async addTicket(
		@Body() ticket: Ticket
	): Promise<Ticket> {
		return this.ticketService.addTicket(ticket);
	}
}
