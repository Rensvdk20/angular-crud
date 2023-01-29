import { Component } from '@angular/core';
import { ITicket, TicketService } from '@drone-races/shared/src';

@Component({
	selector: 'drone-races-my-tickets-list',
	templateUrl: './my-tickets-list.component.html',
	styleUrls: ['./my-tickets-list.component.scss'],
})
export class MyTicketsListComponent {
    tickets: ITicket[] = [];
    successMessage: string = '';
    errorMessage: string = '';

	constructor(private ticketService: TicketService) {}

	ngOnInit(): void {
        this.getAllTicketsFromUser();
    }

    cancelTicket(ticketId: string) {
        this.emptyMessages();

        this.ticketService.cancelTicket(ticketId).subscribe((result) => {
            if(result.results) {
                this.successMessage = `You succesfully cancelled your ticket to the ${result.results.match.name} with seatnumber ${result.results.seatNumber}` ;
            } else {
                if(result.statusCode == 400) {
                    this.errorMessage = result.message;
                }
            }

            this.getAllTicketsFromUser();
        });
    }

    getAllTicketsFromUser() {
        this.ticketService.getAllTicketsFromUser().subscribe((tickets: any) => {
            this.tickets = tickets;
        });
    }

    emptyMessages() {
        this.successMessage = '';
        this.errorMessage = '';
    }
}
