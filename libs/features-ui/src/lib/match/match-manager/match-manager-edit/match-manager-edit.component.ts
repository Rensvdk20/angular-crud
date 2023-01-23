import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { IMatch } from '@drone-races/shared';
import { IUser } from '@drone-races/shared';
import { MatchService } from '@drone-races/shared';
import { UserService } from '@drone-races/shared';

@Component({
	selector: 'drone-races-match-manager-edit',
	templateUrl: './match-manager-edit.component.html',
	styleUrls: ['./match-manager-edit.component.scss'],
})
export class MatchManagerEditComponent {
	match: IMatch | undefined;
	tempMatch: IMatch | undefined;

	users: IUser[] | undefined;

	constructor(
		private matchService: MatchService,
		private userService: UserService,
		private route: ActivatedRoute,
		private router: Router
	) {}

	ngOnInit(): void {
		this.route.params.subscribe((params: Params) => {
			if (params['id']) {
				//Get the user by id
				this.matchService
					.getMatchById(params['id'])
					.subscribe((match: any) => {
						this.match = match.results;
						//Deepclone the user
						this.tempMatch = JSON.parse(JSON.stringify(this.match));

						console.log(this.tempMatch);
					});
			} else {
				//Create an empty user
				this.tempMatch = {
					id: 0,
					name: '',
					date: new Date(),
					location: '',
					rank: 0,
					prizeMoney: 0,
					winner: null,
				};
			}
		});

		// this.users = this.userService.getAllUsers();
		this.userService.getAllUsers().subscribe((users: any) => {
			this.users = users.results;
		});
	}

	onSubmit(userForm: NgForm) {
		if (!this.match) {
			//Add new match

			//Add id to the new match
			// this.tempMatch = {
			// 	id: this.matchService.getAllMatches().length + 1,
			// 	...userForm.value,
			// };

			//Add the match
			this.matchService.addNewMatch(this.tempMatch!);
		} else {
			// Edit match

			//Add the old id to the edited match
			this.tempMatch = {
				id: this.match!.id,
				...userForm.value,
			};

			//Edit the user
			this.matchService
				.editMatchById(this.tempMatch!)
				.subscribe((test: any) => {
					//Redirect to the match overview
					console.log('redirect', test);
					this.router.navigate(['match-manager']);
				});
		}
	}
}