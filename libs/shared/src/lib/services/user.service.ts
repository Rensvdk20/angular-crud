import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IUser } from '../models/user.model';

@Injectable({
	providedIn: 'root',
})
export class UserService {
	API_URL: string = 'http://localhost:3333/data-api/user/';
	users: IUser[] = [
		{
			id: 1,
			firstName: 'John',
			lastName: 'Doe',
			email: 'johnd@gmail.com',
			birthday: new Date('6-25-2002'),
		},
		{
			id: 2,
			firstName: 'Jane',
			lastName: 'Bridge',
			email: 'janeb@gmail.com',
			birthday: new Date('7-5-1998'),
		},
		{
			id: 3,
			firstName: 'Jack',
			lastName: 'Butter',
			email: 'jackb@hotmail.com',
			birthday: new Date('3-7-1995'),
		},
		{
			id: 4,
			firstName: 'Jill',
			lastName: 'Baker',
			email: 'jillb@outlook.com',
			birthday: new Date('5-2-2004'),
		},
		{
			id: 5,
			firstName: 'Bob',
			lastName: 'Smith',
			email: 'bobs@gmail.com',
			birthday: new Date('9-5-2000'),
		},
	];

	constructor(private httpClient: HttpClient) {}

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

	getUserInfo(): Observable<IUser> {
		const token = JSON.parse(localStorage.getItem('userToken') || '').token;
		const headers = new HttpHeaders({
			'Access-Control-Allow-Origin': '*',
			Authorization: `${token}`,
		});
		return this.httpClient.get<IUser>(
			`http://localhost:3333/data-api/user`,
			{
				headers: headers,
			}
		);
	}
}
