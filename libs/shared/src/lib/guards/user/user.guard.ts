import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Injectable({
	providedIn: 'root',
})
export class UserGuard implements CanActivate {
	constructor(private authService: AuthService) {}

	canActivate() {
		let isLoggedIn = false;

		return this.authService.getUserFromLocalStorage().pipe(
			map((user) => {
				user ? (isLoggedIn = true) : (isLoggedIn = false);
				return isLoggedIn;
			})
		);
	}
}
