import { Component } from '@angular/core';
import { ITicket, TicketService } from '@drone-races/shared/src';

@Component({
	selector: 'drone-races-my-tickets-list',
	templateUrl: './my-tickets-list.component.html',
	styleUrls: ['./my-tickets-list.component.scss'],
})
export class MyTicketsListComponent {
    tickets: ITicket[] = [];

	constructor(private ticketService: TicketService) {}

	ngOnInit(): void {
        this.ticketService.getAllTicketsFromUser().subscribe((tickets: any) => {
            console.log(tickets);
            this.tickets = tickets;
        });
    }
}
