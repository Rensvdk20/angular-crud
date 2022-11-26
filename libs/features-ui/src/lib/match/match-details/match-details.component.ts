import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { IMatch } from '@drone-races/shared/src/lib/models/match.model';
import { MatchService } from '@drone-races/shared/src/lib/services/match.service';

@Component({
	selector: 'drone-races-match-details',
	templateUrl: './match-details.component.html',
	styleUrls: ['./match-details.component.scss'],
})
export class MatchDetailsComponent {
	match: IMatch | undefined;

	constructor(
		private matchService: MatchService,
		private route: ActivatedRoute
	) {}

	ngOnInit(): void {
		this.route.params.subscribe((params: Params) => {
			this.match = this.matchService.getMatchById(params['id']);
		});
	}
}
