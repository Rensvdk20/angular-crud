import { Component } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { IMatch, ITicket, MatchService, TicketService } from '@drone-races/shared/src';

@Component({
	selector: 'drone-races-ticket-manager-edit',
	templateUrl: './ticket-manager-edit.component.html',
	styleUrls: ['./ticket-manager-edit.component.scss'],
})
export class TicketManagerEditComponent {
    ticketForm!: FormGroup;
	ticket: ITicket | undefined;
	tempTicket: ITicket | undefined;

	matches: IMatch[] | undefined;

	constructor(
		private ticketService: TicketService,
		private matchService: MatchService,
		private route: ActivatedRoute,
		private router: Router,
	) {}

	ngOnInit(): void {
		this.route.params.subscribe((params: Params) => {
			if (params['id']) {
				//Get the user by id
				this.ticketService
					.getTicketById(params['id'])
					.subscribe((ticket: any) => {
						this.ticket = ticket;
						//Deepclone the user
						this.tempTicket = JSON.parse(JSON.stringify(this.ticket));
					});
			} else {
				//Create an empty user
				this.tempTicket = {
					id: "",
					price: 0,
                    type: "",
                    seatNumber: 0,
                    match: {} as IMatch,
                    reservedBy: null
				};
			}
		});

		this.matchService.getAllMatches().subscribe((matches: any) => {
			this.matches = matches.results;
		});
	}

	onSubmit(userForm: NgForm) {
		if (!this.ticket) {
			//Add new ticket
			this.tempTicket = {
                ...userForm.value
			};

			//Add the ticket
			this.ticketService.addNewTicket(this.tempTicket!).subscribe(() => {
                this.router.navigate(['ticket-manager']);
            });
		} else {
			// Edit ticket

			//Add the old id to the edited ticket
			this.tempTicket = {
				id: this.ticket!.id,
				...userForm.value,
			};

			//Edit the user
			this.ticketService
				.editTicket(this.tempTicket!.id, this.tempTicket!)
				.subscribe(() => {
                    this.router.navigate(['ticket-manager']);
				});
		}
	}
}
