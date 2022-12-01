import { Injectable } from '@angular/core';
import { IMatch } from '../models/match.model';

@Injectable({
	providedIn: 'root',
})
export class MatchService {
	matches: IMatch[] = [
		{
			id: 1,
			name: 'Beginner match',
			date: new Date('6-25-2023'),
			location: 'Rotterdam Maassilo',
			rank: 1,
			prizeMoney: 100,
			winnerId: null,
		},
		{
			id: 2,
			name: 'Intermediate match',
			date: new Date('7-5-2021'),
			location: 'Rotterdam Maassilo',
			rank: 2,
			prizeMoney: 300,
			winnerId: 1,
		},
		{
			id: 3,
			name: 'Expert match',
			date: new Date('2-8-2021'),
			location: 'Jaarbeurs Utrecht',
			rank: 3,
			prizeMoney: 800,
			winnerId: 3,
		},
		{
			id: 4,
			name: 'National match',
			date: new Date('2-8-2021'),
			location: 'Jaarbeurs Utrecht',
			rank: 4,
			prizeMoney: 8000,
			winnerId: 3,
		},
		{
			id: 5,
			name: 'World Champion match',
			date: new Date('2-8-2021'),
			location: 'London O2 Arena',
			rank: 5,
			prizeMoney: 25000,
			winnerId: 3,
		},
	];

	constructor() {}

	getAllMatches() {
		return this.matches;
	}

	getMatchById(id: number) {
		return this.matches.find((match) => match.id == id);
	}

	editMatchById(Match: IMatch) {
		let MatchToEdit = this.matches.findIndex((u) => u.id == Match.id);
		this.matches[MatchToEdit] = Match;
	}

	deleteMatchById(id: number) {
		let MatchToDelete = this.matches.findIndex((match) => match.id == id);
		this.matches.splice(MatchToDelete, 1);
	}

	addNewMatch(Match: IMatch) {
		this.matches.push(Match);
	}
}
