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

	@Post()
	async addTicket(
		@InjectToken() token: Token,
		@Body() ticket: Ticket
	): Promise<Ticket> {
		return this.ticketService.addTicket(token.id, ticket);
	}
}
