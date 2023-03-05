import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Injectable({
	providedIn: 'root',
})
export class AdminGuard implements CanActivate {
	constructor(private authService: AuthService) {}

	canActivate() {
		let isAdmin = false;

		return this.authService.getUserFromLocalStorage().pipe(
			map((user) => {
				user?.isAdmin == true ? (isAdmin = true) : (isAdmin = false);
				return isAdmin;
			})
		);
	}
}
