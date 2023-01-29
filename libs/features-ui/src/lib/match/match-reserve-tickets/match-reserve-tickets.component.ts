import { Component, Input } from '@angular/core';
import { IMatch, ITicket, MatchService, TicketService } from '@drone-races/shared/src';

@Component({
	selector: 'drone-races-match-reserve-tickets',
	templateUrl: './match-reserve-tickets.component.html',
	styleUrls: ['./match-reserve-tickets.component.scss'],
})
export class MatchReserveTicketsComponent {
    @Input() matchId!: string;
    tickets: ITicket[] = [];
    amountOfTickets: number = 1;

    constructor(private ticketService: TicketService) { }

    ngOnChanges(): void {
        this.getUnreservedTicketsForMatch();
    }

    getUnreservedTicketsForMatch() {
        this.ticketService.getUnreservedTicketsForMatch(String(this.matchId)).subscribe((tickets) => {
            this.tickets = tickets;
        });
    }

    reserveTicket(ticketId: string) {
        this.ticketService.reserveTicketsForMatch(ticketId).subscribe((result) => {
            this.getUnreservedTicketsForMatch();
        });
    }
}

