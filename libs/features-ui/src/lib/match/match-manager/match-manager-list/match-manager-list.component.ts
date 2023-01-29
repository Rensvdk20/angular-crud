import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { IMatch } from '@drone-races/shared';
import { MatchService } from '@drone-races/shared';
import { filter, map } from 'rxjs';

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
        router.events.pipe(
            filter(event => event instanceof NavigationEnd),
            map(event => event as NavigationStart),
            filter(event => event.url === '/match-manager' || event.url === '/match-manager-list')
        ).subscribe(() => {
            this.getAllMatches();
        });
	}

	ngOnInit(): void {
        this.getAllMatches();
    }

    getAllMatches() {
        this.matchService.getAllMatches().subscribe((matches: any) => {
            this.matches = matches.results;
        });
    }

	deleteMatch(id: string) {
		this.matchService.deleteMatchById(id).subscribe(() => {
            this.getAllMatches();
        });
	}
}
