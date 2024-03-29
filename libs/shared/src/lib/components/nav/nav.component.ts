import { Component, OnInit } from '@angular/core';
import { UserInfo } from '@drone-races/shared';
import { Observable, race } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
	selector: 'app-nav',
	templateUrl: './nav.component.html',
	styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
	loggedInUser$!: Observable<UserInfo | undefined>;
	isAdmin: boolean = false;
	isRacer: boolean = false;

	constructor(private authService: AuthService) {}

	ngOnInit(): void {
		this.loggedInUser$ = this.authService.currentUser$;
		this.authService.getUserFromLocalStorage().subscribe((user) => {
			if (user) {
				this.isAdmin = user.isAdmin;
				this.isRacer = user.racer == null ? false : true;
			}
		});
	}

	logout() {
		this.authService.logout();
	}
}
