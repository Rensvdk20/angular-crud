import { Component, Input } from '@angular/core';
import { IMatch, MatchService } from '@drone-races/shared/src';

@Component({
	selector: 'drone-races-match-recommended-list',
	templateUrl: './match-recommended-list.component.html',
	styleUrls: ['./match-recommended-list.component.scss'],
})
export class MatchRecommendedListComponent {
	matches: IMatch[] = [];

	constructor(private matchService: MatchService) {}

	ngOnInit(): void {
		this.matchService.getRecommendedMatches().subscribe((matches: any) => {
			this.matches = matches.results;
		});
	}
}
