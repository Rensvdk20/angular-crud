import { HttpClient } from '@angular/common/http';
import {
	HttpClientTestingModule,
	HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { IMatch } from '../models/match.model';

import { MatchService } from './match.service';

describe('MatchService', () => {
	let service: MatchService;
	let httpMock: HttpTestingController;
	let httpClientSpy: any;

	const MATCHES = {
		results: [
			{
				name: 'Beginner match',
				date: new Date('2023-05-05T00:00:00.000+00:00'),
				location: 'Jaarbeurs Utrecht',
				rank: 1,
				prizeMoney: 100,
				id: '7c27b334-a1f4-4526-a90b-79556797d732',
			} as IMatch,
		],
	};

	beforeEach(() => {
		httpClientSpy = {
			get: jest.fn(),
			post: jest.fn(),
			put: jest.fn(),
			delete: jest.fn(),
		};
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
			providers: [{ provide: HttpClient, useValue: httpClientSpy }],
		});
		service = TestBed.inject(MatchService);
		httpMock = TestBed.inject(HttpTestingController);
	});

	afterEach(() => {
		httpMock.verify();
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should return matches list', () => {
		httpClientSpy.get.mockReturnValue(of(MATCHES));
		service.getAllMatches().subscribe((matches) => {
			expect(matches).toEqual(MATCHES.results);
		});
		expect(httpClientSpy.get).toHaveBeenCalled();
	});

	it('should add a new match', () => {
		httpClientSpy.post.mockReturnValue(of(MATCHES));
		service.addNewMatch(MATCHES.results[0]).subscribe((matches) => {
			expect(matches).toEqual(MATCHES.results[0]);
		});
		expect(httpClientSpy.post).toHaveBeenCalled();
	});

	it('should edit a match', () => {
		httpClientSpy.put.mockReturnValue(of(MATCHES));
		service.editMatchById(MATCHES.results[0]).subscribe((matches) => {
			expect(matches).toEqual(MATCHES.results[0]);
		});
		expect(httpClientSpy.put).toHaveBeenCalled();
	});

	it('should delete a match', () => {
		httpClientSpy.delete.mockReturnValue(of(MATCHES));
		service.deleteMatchById(MATCHES.results[0].id).subscribe((matches) => {
			expect(matches).toEqual(MATCHES.results[0]);
		});
		expect(httpClientSpy.delete).toHaveBeenCalled();
	});
});
