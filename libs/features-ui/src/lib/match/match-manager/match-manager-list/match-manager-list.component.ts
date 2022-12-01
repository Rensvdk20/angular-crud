import { Component } from '@angular/core';
import { IMatch } from '@drone-races/shared';
import { MatchService } from '@drone-races/shared';

@Component({
	selector: 'drone-races-match-manager-list',
	templateUrl: './match-manager-list.component.html',
	styleUrls: ['./match-manager-list.component.scss'],
})
export class MatchManagerListComponent {
	matches: IMatch[] = [];

	constructor(private matchService: MatchService) {}

	ngOnInit(): void {
		this.matches = this.matchService.getAllMatches();
	}

	deleteMatch(id: number) {
		this.matchService.deleteMatchById(id);
	}
}
