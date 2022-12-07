import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IMatch } from '../models/match.model';

@Injectable({
	providedIn: 'root',
})
export class MatchService {
	constructor(private httpClient: HttpClient) {}

	getAllMatches(): Observable<IMatch[]> {
		const headers = new HttpHeaders({
			'Access-Control-Allow-Origin': '*',
		});
		return this.httpClient.get<IMatch[]>(
			`http://localhost:3333/data-api/match`,
			{
				headers: headers,
			}
		);
	}

	getMatchById(id: number) {
		const headers = new HttpHeaders({
			'Access-Control-Allow-Origin': '*',
		});
		return this.httpClient.get<IMatch>(
			`http://localhost:3333/data-api/match/${id}`,
			{
				headers: headers,
			}
		);
	}

	editMatchById(Match: IMatch) {
		// let MatchToEdit = this.matches.findIndex((u) => u.id == Match.id);
		// this.matches[MatchToEdit] = Match;
	}

	deleteMatchById(id: number) {
		// let MatchToDelete = this.matches.findIndex((match) => match.id == id);
		// this.matches.splice(MatchToDelete, 1);
	}

	addNewMatch(Match: IMatch) {
		// this.matches.push(Match);
	}
}
