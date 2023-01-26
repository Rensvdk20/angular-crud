import { Component, Input } from '@angular/core';
import { IMatch, MatchService } from '@drone-races/shared/src';

@Component({
	selector: 'drone-races-match-compete-as-racer',
	templateUrl: './match-compete-as-racer.component.html',
	styleUrls: ['./match-compete-as-racer.component.scss'],
})
export class MatchCompeteAsRacerComponent {
    @Input() matchId!: string;
    successMessage: string = '';
    errorMessage: string = '';

    constructor(private matchService: MatchService) { }

    ngOnInit(): void {

    }

    competeInMatch() {
        this.matchService.competeInMatch(this.matchId).subscribe((result: any) => {
            this.emptyMessages();

            if(result.results) {
                this.successMessage = `You are now competing in the ${result.results.name}` ;
            } else {
                if(result.statusCode == 400) {
                    this.errorMessage = result.message;
                }
            }
        });
    }

    emptyMessages() {
        this.successMessage = '';
        this.errorMessage = '';
    }
}
