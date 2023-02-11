import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	UseGuards,
} from '@nestjs/common';

import { InjectToken, Token } from '../auth/token.decorator';
import { AdminGuard } from '../guards/admin/admin.guard';
import { Ticket } from './ticket.schema';
import { TicketService } from './ticket.service';

@Controller('ticket')
export class TicketController {
	constructor(private readonly ticketService: TicketService) {}

	@Get()
	async getAllTickets(): Promise<Ticket[]> {
		return this.ticketService.getAllTickets();
	}

	@Get('unreserved/:matchId')
	async getAllUnreservedTicketsFromMatch(
		@Param('matchId') matchId: string
	): Promise<Ticket[]> {
		return this.ticketService.getAllUnreservedTicketsFromMatch(matchId);
	}

	@Get('user')
	async getAllTicketsFromUser(
		@InjectToken() token: Token
	): Promise<Ticket[]> {
		return this.ticketService.getAllTicketsFromUser(token.id);
	}

	// @Get(':matchId')
	// async getAllTicketsFromMatch(
	//     @Param('matchId') matchId: string,
	// ): Promise<Ticket[]> {
	//     return this.ticketService.getAllTicketsFromMatch(matchId);
	// }

	@Get(':ticketId')
	async getTicketById(@Param('ticketId') ticketId: string): Promise<Ticket> {
		return this.ticketService.getTicketById(ticketId);
	}

	@Post('cancel/:ticketId')
	async cancelTicket(
		@InjectToken() token: Token,
		@Param('ticketId') ticketId: string
	): Promise<Ticket> {
		return this.ticketService.cancelTicket(token.id, ticketId);
	}

	@Post('reserve/:ticketId')
	async ReserveTicket(
		@InjectToken() token: Token,
		@Param('ticketId') ticketId: string
	): Promise<Ticket> {
		return this.ticketService.reserveTicket(token.id, ticketId);
	}

	@Post()
	@UseGuards(AdminGuard)
	async addTicket(@Body() ticket: Ticket): Promise<Ticket> {
		return this.ticketService.addTicket(ticket);
	}

	@Put(':ticketId')
	@UseGuards(AdminGuard)
	async editTicketById(
		@Param('ticketId') ticketId: string,
		@Body() ticket: Ticket
	): Promise<Ticket> {
		return this.ticketService.editTicketById(ticketId, ticket);
	}

	@Delete(':ticketId')
	@UseGuards(AdminGuard)
	async deleteTicketById(
		@Param('ticketId') ticketId: string
	): Promise<Ticket> {
		return this.ticketService.deleteTicketById(ticketId);
	}
}
