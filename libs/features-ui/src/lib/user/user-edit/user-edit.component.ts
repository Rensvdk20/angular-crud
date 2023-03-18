import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IUser, UserService } from '@drone-races/shared/src';

@Component({
	selector: 'drone-races-user-edit',
	templateUrl: './user-edit.component.html',
	styleUrls: ['./user-edit.component.scss'],
})
export class UserEditComponent {
	user!: IUser;

	constructor(private userService: UserService) {
		this.getUserInfo();
	}

	onSubmit(userEditForm: NgForm) {
		this.userService.editUser(this.user).subscribe((user) => {
			this.user = user;
		});
	}

	getUserInfo() {
		this.userService.getUserInfo().subscribe((user) => {
			this.user = user;
		});
	}

	registerAsRacer() {
		this.userService.registerAsRacer().subscribe((user) => {
			console.log(user);
			this.getUserInfo();
		});
	}

	retireAsRacer() {
		this.userService.retireAsRacer().subscribe((user) => {
			this.getUserInfo();
		});
	}
}
