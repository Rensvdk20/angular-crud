import { Injectable } from '@angular/core';
// import { UserIdentity } from '@drone-races/shared';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';
import {
	Token,
	UserCredentials,
	UserRegistration,
} from '../models/auth/auth.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserInfo, UserService } from '@drone-races/shared';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	public currentUser$ = new BehaviorSubject<UserInfo | undefined>(undefined);
	private readonly TOKEN = 'userToken';
	private readonly CURRENT_USER = 'currentUser';
	private readonly headers = new HttpHeaders({
		'Access-Control-Allow-Origin': '*',
		'Content-Type': 'application/json',
	});

	constructor(private http: HttpClient, private userService: UserService) {}

	login(formData: UserCredentials) {
		return this.http
			.post<any>(`http://localhost:3333/auth-api/login`, formData, {
				headers: this.headers,
			})
			.pipe(
				map((data: any) => data.results),
				map((token: Token) => {
					this.saveTokenToLocalStorage(token);
					this.userService.getUserInfo().subscribe((user) => {
						this.currentUser$.next(user);
						this.saveUserToLocalStorage(user);
					});
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

	private saveTokenToLocalStorage(token: Token): void {
		localStorage.setItem(this.TOKEN, JSON.stringify(token));
	}

	private saveUserToLocalStorage(user: UserInfo): void {
		localStorage.setItem(this.CURRENT_USER, JSON.stringify(user));
	}
}
