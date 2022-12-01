import { Component, OnInit } from '@angular/core';
import { IUser } from '@drone-races/shared/src/lib/models/user.model';
import { UserService } from '@drone-races/shared/src/lib/services/user.service';

@Component({
	selector: 'drone-races-user-manager-list',
	templateUrl: './user-manager-list.component.html',
	styleUrls: ['./user-manager-list.component.scss'],
})
export class UserManagerListComponent implements OnInit {
	users: IUser[] = [];

	constructor(private userService: UserService) {}

	ngOnInit(): void {
		this.users = this.userService.getAllUsers();
	}

	deleteUser(id: number) {
		this.userService.deleteUserById(id);
	}
}
