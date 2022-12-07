import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { IUser } from '@drone-races/shared';
import { UserService } from '@drone-races/shared';

@Component({
	selector: 'drone-races-user-manager-edit',
	templateUrl: './user-manager-edit.component.html',
	styleUrls: ['./user-manager-edit.component.scss'],
})
export class UserManagerEditComponent implements OnInit {
	user: IUser | undefined;
	tempUser: IUser | undefined;

	constructor(
		private userService: UserService,
		private route: ActivatedRoute,
		private router: Router
	) {}

	ngOnInit(): void {
		this.route.params.subscribe((params: Params) => {
			if (params['id']) {
				//Get the user by id
				this.userService
					.getUserById(params['id'])
					.subscribe((user: any) => {
						this.user = user.results;
					});

				//Deepclone the user
				this.tempUser = JSON.parse(JSON.stringify(this.user));
			} else {
				//Create an empty user
				this.tempUser = {
					id: 0,
					firstName: '',
					lastName: '',
					birthday: new Date(),
					email: '',
				};
			}
		});
	}

	onSubmit(userForm: NgForm) {
		if (!this.user) {
			//Add new user

			//Add id to the new user
			this.tempUser = {
				// id: this.userService.getAllUsers().length + 1,
				...userForm.value,
			};

			//Add the user
			this.userService.addNewUser(this.tempUser!);
		} else {
			// Edit user

			//Add the old id to the edited user
			this.tempUser = {
				id: this.user!.id,
				...userForm.value,
			};

			//Edit the user
			this.userService.editUserById(this.tempUser!);
		}

		//Redirect to the user overview
		this.router.navigate(['user']);
	}
}
