import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { IMatch } from '@drone-races/shared';
import { MatchService } from '@drone-races/shared';

@Component({
	selector: 'drone-races-match-details',
	templateUrl: './match-details.component.html',
	styleUrls: ['./match-details.component.scss'],
})
export class MatchDetailsComponent {
	match!: IMatch;

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
