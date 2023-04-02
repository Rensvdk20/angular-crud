import { Component } from '@angular/core';
import { IMatch, MatchService } from '@drone-races/shared/src';

@Component({
	selector: 'drone-races-match-racer-matches',
	templateUrl: './match-racer-matches.component.html',
	styleUrls: ['./match-racer-matches.component.scss'],
})
export class MatchRacerMatchesComponent {
	matches: IMatch[] = [];

	constructor(private matchService: MatchService) {}

	ngOnInit(): void {
		this.getAllMatchesFromRacer();
	}

	getAllMatchesFromRacer() {
		this.matchService.getAllMatchesFromRacer().subscribe((data: any) => {
			console.log(data);
			this.matches = data.results;
		});
	}
}
