import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AuthService, IMatch, UserInfo, UserService } from '@drone-races/shared';
import { MatchService } from '@drone-races/shared';
import { Observable } from 'rxjs';

@Component({
	selector: 'drone-races-match-details',
	templateUrl: './match-details.component.html',
	styleUrls: ['./match-details.component.scss'],
})
export class MatchDetailsComponent {
	match!: IMatch;
    user: any;
    
	constructor(
        private matchService: MatchService,
        private userService: UserService,
		private route: ActivatedRoute
        ) {}
        
    ngOnInit(): void {
		this.route.params.subscribe((params: Params) => {
			this.matchService
				.getMatchById(params['id'])
				.subscribe((match: any) => {
					this.match = match.results;
				});
		});

        this.userService.getUserInfo().subscribe((user: any) => {
            this.user = user;
        });
	}
}
