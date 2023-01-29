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
        const token = JSON.parse(localStorage.getItem('userToken') || '').token;
        const headers = new HttpHeaders({
            'Access-Control-Allow-Origin': '*',
            Authorization: `${token}`,
        });
        return this.httpClient.get<ITicket[]>(
            `http://localhost:3333/data-api/ticket`,
            {
                headers: headers,
            }
        ).pipe(map((data: any) => data.results));
    }

    getTicketById(ticketId: string): Observable<ITicket> {
        const token = JSON.parse(localStorage.getItem('userToken') || '').token;
        const headers = new HttpHeaders({
            'Access-Control-Allow-Origin': '*',
            Authorization: `${token}`,
        });
        return this.httpClient.get<ITicket>(
            `http://localhost:3333/data-api/ticket/${ticketId}`,
            {
                headers: headers,
            }
        ).pipe(map((data: any) => data.results));
    }

    getUnreservedTicketsForMatch(matchId: string): Observable<ITicket[]> {
        const token = JSON.parse(localStorage.getItem('userToken') || '').token;
        const headers = new HttpHeaders({
            'Access-Control-Allow-Origin': '*',
            Authorization: `${token}`,
        });
        return this.httpClient.get<ITicket[]>(
            `http://localhost:3333/data-api/ticket/unreserved/${matchId}`,
            {
                headers: headers,
            }
        ).pipe(map((data: any) => data.results));
    }

    getAllTicketsFromUser(): Observable<ITicket[]> {
        const token = JSON.parse(localStorage.getItem('userToken') || '').token;
        const headers = new HttpHeaders({
            'Access-Control-Allow-Origin': '*',
            Authorization: `${token}`,
        });
        return this.httpClient.get<ITicket[]>(
            `http://localhost:3333/data-api/ticket/user`,
            {
                headers: headers,
            }
        ).pipe(map((data: any) => data.results));
    }

    addNewTicket(ticket: ITicket): Observable<ITicket> {
        const token = JSON.parse(localStorage.getItem('userToken') || '').token;
        const headers = new HttpHeaders({
            'Access-Control-Allow-Origin': '*',
            Authorization: `${token}`,
        });
        return this.httpClient.post<ITicket>(
            `http://localhost:3333/data-api/ticket`, ticket,
            {
                headers: headers,
            }
        ).pipe(map((data: any) => data.results));
    }

    cancelTicket(ticketId: string): Observable<any> {
        const token = JSON.parse(localStorage.getItem('userToken') || '').token;
        const headers = new HttpHeaders({
            'Access-Control-Allow-Origin': '*',
            Authorization: `${token}`,
        });
        return this.httpClient.post<any>(
            `http://localhost:3333/data-api/ticket/cancel/${ticketId}`, {},
            {
                headers: headers,
            }
        ).pipe(
            catchError((error) => {
                return of(error.error);
            })
        );
    }

    reserveTicketsForMatch(ticketId: string): Observable<ITicket> {
        const token = JSON.parse(localStorage.getItem('userToken') || '').token;
        const headers = new HttpHeaders({
            'Access-Control-Allow-Origin': '*',
            Authorization: `${token}`,
        });
        return this.httpClient.post<ITicket>(
            `http://localhost:3333/data-api/ticket/reserve/${ticketId}`, {},
            {
                headers: headers,
            }
        ).pipe(map((data: any) => data.results));
    }

    editTicket(ticketId: string, ticket: ITicket): Observable<ITicket> {
        const token = JSON.parse(localStorage.getItem('userToken') || '').token;
        const headers = new HttpHeaders({
            'Access-Control-Allow-Origin': '*',
            Authorization: `${token}`,
        });
        return this.httpClient.put<ITicket>(
            `http://localhost:3333/data-api/ticket/${ticketId}`,
            ticket,
            {
                headers: headers,
            }
        ).pipe(map((data: any) => data.results));
    }

    deleteTicketById(ticketId: string): Observable<any> {
        const token = JSON.parse(localStorage.getItem('userToken') || '').token;
        const headers = new HttpHeaders({
            'Access-Control-Allow-Origin': '*',
            Authorization: `${token}`,
        });
        return this.httpClient.delete<any>(
            `http://localhost:3333/data-api/ticket/${ticketId}`,
            {
                headers: headers,
            }
        ).pipe(
            catchError((error) => {
                return of(error.error);
            })
        );
    }
}
