import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
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
			`https://angular-crud-production.up.railway.app/data-api/match`,
			{
				headers: headers,
			}
		);
	}

	getRecommendedMatches(): Observable<IMatch[]> {
		const token = JSON.parse(localStorage.getItem('userToken') || '').token;
		const headers = new HttpHeaders({
			'Access-Control-Allow-Origin': '*',
			Authorization: `${token}`,
		});
		return this.httpClient.get<IMatch[]>(
			`https://angular-crud-production.up.railway.app/data-api/match/recommended/for-me`,
			{
				headers: headers,
			}
		);
	}

	getMatchById(id: string): Observable<IMatch> {
		const headers = new HttpHeaders({
			'Access-Control-Allow-Origin': '*',
		});
		return this.httpClient.get<IMatch>(
			`https://angular-crud-production.up.railway.app/data-api/match/${id}`,
			{
				headers: headers,
			}
		);
	}

	editMatchById(match: IMatch): Observable<IMatch> {
		const token = JSON.parse(localStorage.getItem('userToken') || '').token;
		const headers = new HttpHeaders({
			'Access-Control-Allow-Origin': '*',
			Authorization: `${token}`,
		});
		return this.httpClient.put<IMatch>(
			`https://angular-crud-production.up.railway.app/data-api/match/${match.id}`,
			match,
			{
				headers: headers,
			}
		);
	}

	deleteMatchById(matchId: string): Observable<IMatch> {
		const token = JSON.parse(localStorage.getItem('userToken') || '').token;
		const headers = new HttpHeaders({
			'Access-Control-Allow-Origin': '*',
			Authorization: `${token}`,
		});
		return this.httpClient.delete<IMatch>(
			`https://angular-crud-production.up.railway.app/data-api/match/${matchId}`,
			{
				headers: headers,
			}
		);
	}

	addNewMatch(match: IMatch): Observable<IMatch> {
		const token = JSON.parse(localStorage.getItem('userToken') || '').token;
		const headers = new HttpHeaders({
			'Access-Control-Allow-Origin': '*',
			Authorization: `${token}`,
		});
		return this.httpClient.post<IMatch>(
			`https://angular-crud-production.up.railway.app/data-api/match`,
			match,
			{
				headers: headers,
			}
		);
	}

	competeInMatch(matchId: string): Observable<IMatch> {
		const token = JSON.parse(localStorage.getItem('userToken') || '').token;
		const headers = new HttpHeaders({
			'Access-Control-Allow-Origin': '*',
			Authorization: `${token}`,
		});
		return this.httpClient
			.post<IMatch>(
				`https://angular-crud-production.up.railway.app/data-api/match/compete/${matchId}`,
				{},
				{
					headers: headers,
				}
			)
			.pipe(
				catchError((error) => {
					return of(error.error);
				})
			);
	}
}
