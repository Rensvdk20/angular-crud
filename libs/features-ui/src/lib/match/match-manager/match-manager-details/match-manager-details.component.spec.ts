import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatchManagerDetailsComponent } from './match-manager-details.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatchService } from '@drone-races/shared/src';
import { of } from 'rxjs';

describe('MatchManagerDetailComponent', () => {
	let component: MatchManagerDetailsComponent;
	let fixture: ComponentFixture<MatchManagerDetailsComponent>;
	const MATCH = {
		name: 'Beginner match',
		date: new Date('2023-05-05T00:00:00.000+00:00'),
		location: 'Jaarbeurs Utrecht',
		rank: 1,
		prizeMoney: 100,
		id: '7c27b334-a1f4-4526-a90b-79556797d732',
	};

	const matchServiceSpy = {
		getMatchById: jest.fn().mockReturnValue(of({ results: MATCH })),
	};

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [MatchManagerDetailsComponent],
			imports: [
				RouterTestingModule.withRoutes([]),
				HttpClientTestingModule,
			],
			providers: [{ provide: MatchService, useValue: matchServiceSpy }],
		}).compileComponents();

		fixture = TestBed.createComponent(MatchManagerDetailsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should fetch match details on init', () => {
		component.ngOnInit();

		expect(matchServiceSpy.getMatchById).toHaveBeenCalledWith(1);
		expect(component.match).toEqual({ results: MATCH });
	});
});
