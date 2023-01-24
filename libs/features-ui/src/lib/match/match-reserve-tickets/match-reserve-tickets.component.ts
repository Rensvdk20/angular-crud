import { Component, Input } from '@angular/core';
import { IMatch, ITicket, MatchService, TicketService } from '@drone-races/shared/src';

@Component({
	selector: 'drone-races-match-reserve-tickets',
	templateUrl: './match-reserve-tickets.component.html',
	styleUrls: ['./match-reserve-tickets.component.scss'],
})
export class MatchReserveTicketsComponent {
    @Input() matchId!: number;
    tickets: ITicket[] = [];
    amountOfTickets: number = 1;

    constructor(private ticketService: TicketService) {
        // console.log(this.match);
        // this.ticketService.getUnreservedTicketsForMatch(String(this.match.id)).subscribe((result) => {
        //     console.log(result);
        //     this.tickets = result;
        // });
    }

    ngOnChanges(): void {
        this.ticketService.getUnreservedTicketsForMatch(String(this.matchId)).subscribe((tickets) => {
            console.log(this.matchId);
            console.log(tickets);
            this.tickets = tickets;
        });
    }

    // reserveTickets() {
    //     this.ticketService.reserveTicketsForMatch(this.match?.id, this.amountOfTickets).subscribe();
    // }
}

