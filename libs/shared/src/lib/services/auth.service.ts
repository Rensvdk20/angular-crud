import { Injectable } from '@angular/core';
// import { UserIdentity } from '@drone-races/shared';
import {
	BehaviorSubject,
	catchError,
	map,
	Observable,
	of,
	switchMap,
} from 'rxjs';
import {
	Token,
	UserCredentials,
	UserRegistration,
} from '../models/auth/auth.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserInfo, UserService } from '@drone-races/shared';
import { Router } from '@angular/router';

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

	constructor(
		private http: HttpClient,
		private userService: UserService,
		private router: Router
	) {
		this.getUserFromLocalStorage()
			.pipe(
				switchMap((user: UserInfo | undefined) => {
					if (user) {
						this.currentUser$.next(user);
						return of(user);
					} else {
						return of(undefined);
					}
				})
			)
			.subscribe(() => console.log('Startup auth done'));
	}

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

	logout() {
		this.router.navigate(['/']);
		localStorage.removeItem(this.TOKEN);
		localStorage.removeItem(this.CURRENT_USER);
		this.currentUser$.next(undefined);
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
