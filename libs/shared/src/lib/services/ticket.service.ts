import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ITicket } from '../models/ticket.model';

@Injectable({
	providedIn: 'root',
})
export class TicketService {
	constructor(private httpClient: HttpClient) {}

	getAllTickets(): Observable<ITicket[]> {
		const userToken = localStorage.getItem('userToken');
		const token = userToken ? JSON.parse(userToken).token : '';
		const headers = new HttpHeaders({
			'Access-Control-Allow-Origin': '*',
			Authorization: `${token}`,
		});
		return this.httpClient
			.get<ITicket[]>(
				`https://angular-crud-production.up.railway.app/data-api/ticket`,
				{
					headers: headers,
				}
			)
			.pipe(map((data: any) => data.results));
	}

	getTicketById(ticketId: string): Observable<ITicket> {
		const userToken = localStorage.getItem('userToken');
		const token = userToken ? JSON.parse(userToken).token : '';
		const headers = new HttpHeaders({
			'Access-Control-Allow-Origin': '*',
			Authorization: `${token}`,
		});
		return this.httpClient
			.get<ITicket>(
				`https://angular-crud-production.up.railway.app/data-api/ticket/${ticketId}`,
				{
					headers: headers,
				}
			)
			.pipe(map((data: any) => data.results));
	}

	getUnreservedTicketsForMatch(matchId: string): Observable<ITicket[]> {
		const userToken = localStorage.getItem('userToken');
		const token = userToken ? JSON.parse(userToken).token : '';
		const headers = new HttpHeaders({
			'Access-Control-Allow-Origin': '*',
			Authorization: `${token}`,
		});
		return this.httpClient
			.get<ITicket[]>(
				`https://angular-crud-production.up.railway.app/data-api/ticket/unreserved/${matchId}`,
				{
					headers: headers,
				}
			)
			.pipe(map((data: any) => data.results));
	}

	getAllTicketsFromUser(): Observable<ITicket[]> {
		const userToken = localStorage.getItem('userToken');
		const token = userToken ? JSON.parse(userToken).token : '';
		const headers = new HttpHeaders({
			'Access-Control-Allow-Origin': '*',
			Authorization: `${token}`,
		});
		return this.httpClient
			.get<ITicket[]>(
				`https://angular-crud-production.up.railway.app/data-api/ticket/user`,
				{
					headers: headers,
				}
			)
			.pipe(map((data: any) => data.results));
	}

	addNewTicket(ticket: ITicket): Observable<ITicket> {
		const userToken = localStorage.getItem('userToken');
		const token = userToken ? JSON.parse(userToken).token : '';
		const headers = new HttpHeaders({
			'Access-Control-Allow-Origin': '*',
			Authorization: `${token}`,
		});
		return this.httpClient
			.post<ITicket>(
				`https://angular-crud-production.up.railway.app/data-api/ticket`,
				ticket,
				{
					headers: headers,
				}
			)
			.pipe(map((data: any) => data.results));
	}

	cancelTicket(ticketId: string): Observable<any> {
		const userToken = localStorage.getItem('userToken');
		const token = userToken ? JSON.parse(userToken).token : '';
		const headers = new HttpHeaders({
			'Access-Control-Allow-Origin': '*',
			Authorization: `${token}`,
		});
		return this.httpClient
			.post<any>(
				`https://angular-crud-production.up.railway.app/data-api/ticket/cancel/${ticketId}`,
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

	reserveTicketsForMatch(ticketId: string): Observable<ITicket> {
		const userToken = localStorage.getItem('userToken');
		const token = userToken ? JSON.parse(userToken).token : '';
		const headers = new HttpHeaders({
			'Access-Control-Allow-Origin': '*',
			Authorization: `${token}`,
		});
		return this.httpClient
			.post<ITicket>(
				`https://angular-crud-production.up.railway.app/data-api/ticket/reserve/${ticketId}`,
				{},
				{
					headers: headers,
				}
			)
			.pipe(map((data: any) => data.results));
	}

	editTicket(ticketId: string, ticket: ITicket): Observable<ITicket> {
		const userToken = localStorage.getItem('userToken');
		const token = userToken ? JSON.parse(userToken).token : '';
		const headers = new HttpHeaders({
			'Access-Control-Allow-Origin': '*',
			Authorization: `${token}`,
		});
		return this.httpClient
			.put<ITicket>(
				`https://angular-crud-production.up.railway.app/data-api/ticket/${ticketId}`,
				ticket,
				{
					headers: headers,
				}
			)
			.pipe(map((data: any) => data.results));
	}

	deleteTicketById(ticketId: string): Observable<any> {
		const userToken = localStorage.getItem('userToken');
		const token = userToken ? JSON.parse(userToken).token : '';
		const headers = new HttpHeaders({
			'Access-Control-Allow-Origin': '*',
			Authorization: `${token}`,
		});
		return this.httpClient
			.delete<any>(
				`https://angular-crud-production.up.railway.app/data-api/ticket/${ticketId}`,
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
