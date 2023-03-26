import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { IMatch } from '@drone-races/shared';
import { IUser } from '@drone-races/shared';
import { MatchService } from '@drone-races/shared';
import { UserService } from '@drone-races/shared';

@Component({
	selector: 'drone-races-match-manager-details',
	templateUrl: './match-manager-details.component.html',
	styleUrls: ['./match-manager-details.component.scss'],
})
export class MatchManagerDetailsComponent {
	match: IMatch = {} as IMatch;

	constructor(
		private matchService: MatchService,
		private route: ActivatedRoute
	) {}

	ngOnInit(): void {
		this.route.params.subscribe((params: Params) => {
			this.matchService
				.getMatchById(params['id'])
				.subscribe((match: any) => {
					this.match = match.results;
				});
		});
	}
}
