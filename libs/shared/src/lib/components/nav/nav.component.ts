import { Component, OnInit } from '@angular/core';
import { UserInfo } from '@drone-races/shared';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
	selector: 'app-nav',
	templateUrl: './nav.component.html',
	styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
	loggedInUser$!: Observable<UserInfo | undefined>;

	constructor(private authService: AuthService) {}

	ngOnInit(): void {
		this.loggedInUser$ = this.authService.currentUser$;
		console.log('User3', this.loggedInUser$);
	}
}
