import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { IUser } from '@drone-races/shared';
import { UserService } from '@drone-races/shared';

@Component({
	selector: 'drone-races-user-manager-details',
	templateUrl: './user-manager-details.component.html',
	styleUrls: ['./user-manager-details.component.scss'],
})
export class UserManagerDetailsComponent implements OnInit {
	user: IUser | undefined;

	constructor(
		private userService: UserService,
		private route: ActivatedRoute
	) {}

	ngOnInit(): void {
		this.route.params.subscribe((params: Params) => {
			this.userService
				.getUserById(params['id'])
				.subscribe((user: any) => {
					this.user = user.results;
				});
		});
	}
}
