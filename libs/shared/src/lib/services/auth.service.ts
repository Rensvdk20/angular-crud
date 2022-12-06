import { Injectable } from '@angular/core';
// import { UserIdentity } from '@drone-races/shared';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';
import {
	Token,
	UserCredentials,
	UserRegistration,
} from '../models/auth/auth.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserInfo } from '@drone-races/shared';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private readonly CURRENT_USER = 'userToken';
	private readonly headers = new HttpHeaders({
		'Access-Control-Allow-Origin': '*',
		'Content-Type': 'application/json',
	});

	constructor(private http: HttpClient) {}

	login(formData: UserCredentials) {
		return this.http
			.post<any>(`http://localhost:3333/auth-api/login`, formData, {
				headers: this.headers,
			})
			.pipe(
				map((data: any) => data.results),
				map((token: Token) => {
					this.saveUserToLocalStorage(token);
					return 'success';
				}),
				catchError((error) => {
					console.log('error:', error);
					return of(error);
				})
			);
	}

	getUserFromLocalStorage(): Observable<UserInfo | undefined> {
		const userData = localStorage.getItem(this.CURRENT_USER);
		if (userData) {
			const localUser = JSON.parse(userData);
			return of(localUser);
		} else {
			return of(undefined);
		}
	}

	private saveUserToLocalStorage(token: Token): void {
		localStorage.setItem(this.CURRENT_USER, JSON.stringify(token));
	}
}
