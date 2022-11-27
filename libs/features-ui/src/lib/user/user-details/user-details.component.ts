import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { IUser } from '@drone-races/shared/src/lib/models/user.model';
import { UserService } from '@drone-races/shared/src/lib/services/user.service';

@Component({
	selector: 'drone-races-user-details',
	templateUrl: './user-details.component.html',
	styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent implements OnInit {
	user: IUser | undefined;

	constructor(
		private userService: UserService,
		private route: ActivatedRoute
	) {}

	ngOnInit(): void {
		this.route.params.subscribe((params: Params) => {
			this.user = this.userService.getUserById(params['id']);
		});
	}
}
