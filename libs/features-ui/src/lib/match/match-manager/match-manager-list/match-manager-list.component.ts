import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IMatch } from '@drone-races/shared';
import { MatchService } from '@drone-races/shared';

@Component({
	selector: 'drone-races-match-manager-list',
	templateUrl: './match-manager-list.component.html',
	styleUrls: ['./match-manager-list.component.scss'],
})
export class MatchManagerListComponent {
	matches: IMatch[] = [];

	constructor(
		private route: ActivatedRoute,
		private matchService: MatchService,
		private router: Router
	) {
		this.route.params.subscribe((val) => {
			console.log('retrieveee');
			this.matchService.getAllMatches().subscribe((matches: any) => {
				this.matches = matches.results;
			});
		});
	}

	ngOnInit(): void {}

	ngOnnDestroy(): void {}

	deleteMatch(id: number) {
		this.matchService.deleteMatchById(id);
	}
}
