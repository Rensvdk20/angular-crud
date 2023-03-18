import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IUser } from '../models/user.model';

@Injectable({
	providedIn: 'root',
})
export class UserService {
	constructor(private httpClient: HttpClient) {}

	getAllUsers() {
		const token = JSON.parse(localStorage.getItem('userToken') || '').token;
		const headers = new HttpHeaders({
			'Access-Control-Allow-Origin': '*',
			Authorization: `${token}`,
		});
		return this.httpClient.get<IUser[]>(
			`https://angular-crud-production.up.railway.app/data-api/user/`,
			{
				headers: headers,
			}
		);
	}

	getUserById(id: string) {
		const token = JSON.parse(localStorage.getItem('userToken') || '').token;
		const headers = new HttpHeaders({
			'Access-Control-Allow-Origin': '*',
			Authorization: `${token}`,
		});
		return this.httpClient.get<IUser>(
			`https://angular-crud-production.up.railway.app/data-api/user/${id}`,
			{
				headers: headers,
			}
		);
	}

	editUser(user: IUser) {
		const token = JSON.parse(localStorage.getItem('userToken') || '').token;
		const headers = new HttpHeaders({
			'Access-Control-Allow-Origin': '*',
			Authorization: `${token}`,
		});
		return this.httpClient
			.put<IUser>(
				`https://angular-crud-production.up.railway.app/data-api/user`,
				user,
				{
					headers: headers,
				}
			)
			.pipe(map((data: any) => data.results));
	}

	getUserInfo(): Observable<IUser> {
		const token = JSON.parse(localStorage.getItem('userToken') || '').token;
		const headers = new HttpHeaders({
			'Access-Control-Allow-Origin': '*',
			Authorization: `${token}`,
		});
		return this.httpClient
			.get<IUser>(
				`https://angular-crud-production.up.railway.app/data-api/user/info`,
				{
					headers: headers,
				}
			)
			.pipe(map((data: any) => data.results));
	}

	registerAsRacer(): Observable<IUser> {
		const token = JSON.parse(localStorage.getItem('userToken') || '').token;
		const headers = new HttpHeaders({
			'Access-Control-Allow-Origin': '*',
			Authorization: `${token}`,
		});
		return this.httpClient
			.post<IUser>(
				`https://angular-crud-production.up.railway.app/data-api/user/racer`,
				{},
				{
					headers: headers,
				}
			)
			.pipe(map((data: any) => data.results));
	}

	retireAsRacer(): Observable<IUser> {
		const token = JSON.parse(localStorage.getItem('userToken') || '').token;
		const headers = new HttpHeaders({
			'Access-Control-Allow-Origin': '*',
			Authorization: `${token}`,
		});
		return this.httpClient
			.delete<IUser>(
				`https://angular-crud-production.up.railway.app/data-api/user/racer`,
				{
					headers: headers,
				}
			)
			.pipe(map((data: any) => data.results));
	}
}
