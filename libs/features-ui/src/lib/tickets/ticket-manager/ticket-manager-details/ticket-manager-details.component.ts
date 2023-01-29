import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ITicket, MatchService, TicketService } from '@drone-races/shared/src';

@Component({
	selector: 'drone-races-ticket-manager-details',
	templateUrl: './ticket-manager-details.component.html',
	styleUrls: ['./ticket-manager-details.component.scss'],
})
export class TicketManagerDetailsComponent {
    ticket: ITicket | undefined;

	constructor(
		private ticketService: TicketService,
		private route: ActivatedRoute
	) {}

	ngOnInit(): void {
		this.route.params.subscribe((params: Params) => {
			this.ticketService
				.getTicketById(params['id'])
				.subscribe((ticket: any) => {
					this.ticket = ticket;
				});
		});
	}
}
