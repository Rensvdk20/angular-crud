import { Component } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
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
    matchForm!: FormGroup;
	match: IMatch | undefined;
	tempMatch: IMatch | undefined;

	users: IUser[] | undefined;

	constructor(
		private matchService: MatchService,
		private userService: UserService,
		private route: ActivatedRoute,
		private router: Router,
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
					});
			} else {
				//Create an empty user
				this.tempMatch = {
					id: "",
					name: '',
					date: new Date(),
					location: '',
					rank: 1,
					prizeMoney: 0,
                    racers: [],
					winner: null,
				};
			}
		});

		this.userService.getAllUsers().subscribe((users: any) => {
			this.users = users.results;
		});
	}

	onSubmit(userForm: NgForm) {
		if (!this.match) {
			//Add new match
			this.tempMatch = {
				// id: this.matchService.getAllMatches().length + 1,
				// ...userForm.value,
                ...userForm.value
			};

			//Add the match
			this.matchService.addNewMatch(this.tempMatch!).subscribe(() => {
                this.router.navigate(['match-manager']);
            });
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
				.subscribe(() => {
                    this.router.navigate(['match-manager']);
				});
		}
	}
}
