import { Component, Input } from '@angular/core';
import { IMatch } from '@drone-races/shared';
import { MatchService } from '@drone-races/shared';

@Component({
	selector: 'drone-races-match-list',
	templateUrl: './match-list.component.html',
	styleUrls: ['./match-list.component.scss'],
})
export class MatchListComponent {
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
			this.matchService.getAllMatches().subscribe((matches: any) => {
				this.matches = matches.results;
			});
		}
	}
}
