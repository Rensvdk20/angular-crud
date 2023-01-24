import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ITicket } from '../models/ticket.model';

@Injectable({
	providedIn: 'root',
})
export class TicketService {
    constructor(private httpClient: HttpClient) {}

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

	// reserveTicketsForMatch(matchId: string, amountOfTickets: number): Observable<any> {
    //     const token = JSON.parse(localStorage.getItem('userToken') || '').token;
    //     const headers = new HttpHeaders({
    //         'Access-Control-Allow-Origin': '*',
    //         Authorization: `${token}`,
    //     });
    //     return this.httpClient.post<any>(
    //         `http://localhost:3333/data-api/ticket/reserve/${matchId}`,
    //         { amountOfTickets },
    //         {
    //             headers: headers,
    //         }
    //     );
    // }
}
