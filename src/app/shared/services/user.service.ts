import { Injectable } from '@angular/core';
import { IUser } from '../models/user.model';

@Injectable({
	providedIn: 'root',
})
export class UserService {
	users: IUser[] = [
		{
			id: 1,
			firstName: 'John',
			lastName: 'Doe',
			age: 25,
			job: 'Developer',
		},
		{
			id: 2,
			firstName: 'Jane',
			lastName: 'Bridge',
			age: 23,
			job: 'Designer',
		},
		{
			id: 3,
			firstName: 'Jack',
			lastName: 'Butter',
			age: 27,
			job: 'Manager',
		},
	];

	constructor() {}

	getAllUsers() {
		return this.users;
	}

	getUserById(id: number) {
		return this.users.find((user) => user.id == id);
	}

	editUserById(user: IUser) {
		let userToEdit = this.users.findIndex((u) => u.id == user.id);
		this.users[userToEdit] = user;
	}

	deleteUserById(id: number) {
		let userToDelete = this.users.findIndex((user) => user.id == id);
		this.users.splice(userToDelete, 1);
	}

	addNewUser(user: IUser) {
		this.users.push(user);
	}
}
