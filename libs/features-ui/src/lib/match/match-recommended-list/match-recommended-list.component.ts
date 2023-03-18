import { Component, Input } from '@angular/core';
import { IMatch, MatchService } from '@drone-races/shared/src';

@Component({
	selector: 'drone-races-match-recommended-list',
	templateUrl: './match-recommended-list.component.html',
	styleUrls: ['./match-recommended-list.component.scss'],
})
export class MatchRecommendedListComponent {
	matches: IMatch[] = [];
	@Input() recommended: boolean = false;

	constructor(private matchService: MatchService) {}

	ngOnInit(): void {
		if (this.recommended) {
			this.matchService
				.getRecommendedMatches()
				.subscribe((matches: any) => {
					this.matches = matches.results;
				});
		} else {
			this.matchService
				.getAllRecommendedMatches()
				.subscribe((matches: any) => {
					this.matches = matches.results;
				});
		}
	}
}
