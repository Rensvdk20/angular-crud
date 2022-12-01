import { Component } from '@angular/core';
import { IMatch } from '@drone-races/shared/src/lib/models/match.model';
import { MatchService } from '@drone-races/shared/src/lib/services/match.service';

@Component({
	selector: 'drone-races-match-list',
	templateUrl: './match-list.component.html',
	styleUrls: ['./match-list.component.scss'],
})
export class MatchListComponent {
	matches: IMatch[] = [];

	constructor(private matchService: MatchService) {}

	ngOnInit(): void {
		this.matches = this.matchService.getAllMatches();
	}
}
