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
			location: 'Jaarbeurs Utrecht',
			rank: 1,
			prizeMoney: 100,
			winner: null,
		},
		{
			id: 2,
			name: 'Intermediate match',
			date: new Date('7-5-2023'),
			location: 'Jaarbeurs Utrecht',
			rank: 2,
			prizeMoney: 300,
			winner: {
				id: 1,
				firstName: 'John',
				lastName: 'Doe',
				email: 'johnd@gmai.com',
				birthday: new Date('1-1-1990'),
			},
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
