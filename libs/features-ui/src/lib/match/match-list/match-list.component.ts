import { Component } from '@angular/core';
import { IMatch } from '@drone-races/shared';
import { MatchService } from '@drone-races/shared';

@Component({
	selector: 'drone-races-match-list',
	templateUrl: './match-list.component.html',
	styleUrls: ['./match-list.component.scss'],
})
export class MatchListComponent {
	matches: IMatch[] = [];

	constructor(private matchService: MatchService) {}

	ngOnInit(): void {
		this.matchService.getAllMatches().subscribe((matches: any) => {
			this.matches = matches.results;
		});
	}
}
