import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { IMatch } from '@drone-races/shared/src/lib/models/match.model';
import { IUser } from '@drone-races/shared/src/lib/models/user.model';
import { MatchService } from '@drone-races/shared/src/lib/services/match.service';
import { UserService } from '@drone-races/shared/src/lib/services/user.service';

@Component({
	selector: 'drone-races-match-manager-details',
	templateUrl: './match-manager-details.component.html',
	styleUrls: ['./match-manager-details.component.scss'],
})
export class MatchManagerDetailsComponent {
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
