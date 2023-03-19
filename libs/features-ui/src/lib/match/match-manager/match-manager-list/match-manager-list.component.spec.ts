import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatchManagerListComponent } from './match-manager-list.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatchService } from '@drone-races/shared/src';
import { of } from 'rxjs';

describe('MatchManagerListComponent', () => {
	let component: MatchManagerListComponent;
	let fixture: ComponentFixture<MatchManagerListComponent>;
	const MATCH_LIST = [
		{
			name: 'Beginner match',
			date: new Date('2023-05-05T00:00:00.000+00:00'),
			location: 'Jaarbeurs Utrecht',
			rank: 1,
			prizeMoney: 100,
			id: '7c28b345-a2f4-4556-a90q-795h679fd732',
		},
	];

	const matchServiceSpy = {
		getAllMatches: jest.fn().mockReturnValue(of({ results: MATCH_LIST })),
	};

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [MatchManagerListComponent],
			imports: [
				RouterTestingModule.withRoutes([]),
				HttpClientTestingModule,
			],
			providers: [{ provide: MatchService, useValue: matchServiceSpy }],
		}).compileComponents();

		fixture = TestBed.createComponent(MatchManagerListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should have a list of matches', () => {
		expect(component.matches.length).toEqual(1);
	});

	it('should call getAllMatches on init', () => {
		expect(matchServiceSpy.getAllMatches).toHaveBeenCalled();
	});
});
