import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { ITicket, TicketService } from '@drone-races/shared/src';
import { filter, map } from 'rxjs';

@Component({
	selector: 'drone-races-ticket-manager-list',
	templateUrl: './ticket-manager-list.component.html',
	styleUrls: ['./ticket-manager-list.component.scss'],
})
export class TicketManagerListComponent {
    tickets: ITicket[] = [];

	constructor(
		private route: ActivatedRoute,
		private ticketService: TicketService,
		private router: Router
	) {
        router.events.pipe(
            filter(event => event instanceof NavigationEnd),
            map(event => event as NavigationStart),
            filter(event => event.url === '/ticket-manager' || event.url === '/ticket-manager-list')
        ).subscribe(() => {
            this.getAllTickets();
        });
	}

	ngOnInit(): void {
        this.getAllTickets();
    }

    getAllTickets() {
        this.ticketService.getAllTickets().subscribe((tickets: ITicket[]) => {
            this.tickets = tickets;
        });
    }

	deleteTicket(id: string) {
		this.ticketService.deleteTicketById(id).subscribe(() => {
            this.getAllTickets();
        });
	}
}
