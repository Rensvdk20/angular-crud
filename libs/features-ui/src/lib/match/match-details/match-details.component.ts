import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { IMatch } from '@drone-races/shared';
import { IUser } from '@drone-races/shared';
import { MatchService } from '@drone-races/shared';
import { UserService } from '@drone-races/shared';

@Component({
	selector: 'drone-races-match-details',
	templateUrl: './match-details.component.html',
	styleUrls: ['./match-details.component.scss'],
})
export class MatchDetailsComponent {
	match: IMatch | undefined;
	matchWinner: IUser | undefined;

	constructor(
		private matchService: MatchService,
		private userService: UserService,
		private route: ActivatedRoute
	) {}

	ngOnInit(): void {
		this.route.params.subscribe((params: Params) => {
			this.match = this.matchService.getMatchById(params['id']);
			this.matchWinner = this.userService.getUserById(
				this.match!.winnerId!
			);
		});
	}
}
