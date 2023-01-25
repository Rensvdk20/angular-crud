import { Component, Input } from '@angular/core';

@Component({
	selector: 'drone-races-match-compete-as-racer',
	templateUrl: './match-compete-as-racer.component.html',
	styleUrls: ['./match-compete-as-racer.component.scss'],
})
export class MatchCompeteAsRacerComponent {
    @Input() matchId!: string;

    constructor() { }

    ngOnInit(): void {

    }
}
