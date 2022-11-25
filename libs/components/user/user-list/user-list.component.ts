import { Component, OnInit } from '@angular/core';
import { IUser } from '../../../shared/models/user.model';
import { UserService } from '../../../shared/services/user.service';

@Component({
	selector: 'app-user-list',
	templateUrl: './user-list.component.html',
	styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
	users: IUser[] = [];

	constructor(private userService: UserService) {}

	ngOnInit(): void {
		this.users = this.userService.getAllUsers();
	}

	deleteUser(id: number) {
		this.userService.deleteUserById(id);
	}
}
