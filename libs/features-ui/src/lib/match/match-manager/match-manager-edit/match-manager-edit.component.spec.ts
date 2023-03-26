import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { NgForm } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { IMatch, MatchService } from '@drone-races/shared/src';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';

import { MatchManagerEditComponent } from './match-manager-edit.component';
import { Router } from '@angular/router';

describe('MatchManagerEditComponent', () => {
	let component: MatchManagerEditComponent;
	let fixture: ComponentFixture<MatchManagerEditComponent>;
	let router: Router;

	const MATCH = {
		results: [
			{
				name: 'Beginner match',
				date: new Date('2023-05-05T00:00:00.000+00:00'),
				location: 'Jaarbeurs Utrecht',
				rank: 1,
				prizeMoney: 100,
				id: '7c27b334-a1f4-4526-a90b-79556797d732',
			},
		],
	};

	const matchServiceSpy = {
		addNewMatch: jest.fn().mockReturnValue(of({ results: MATCH })),
		editMatchById: jest.fn().mockReturnValue(of({ results: MATCH })),
	};

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [MatchManagerEditComponent],
			imports: [
				RouterTestingModule.withRoutes([
					{
						path: 'match-manager',
						component: MatchManagerEditComponent,
					},
				]),
				HttpClientTestingModule,
				FormsModule,
			],
			providers: [{ provide: MatchService, useValue: matchServiceSpy }],
		}).compileComponents();

		fixture = TestBed.createComponent(MatchManagerEditComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();

		router = TestBed.inject(Router);
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('create new match', () => {
		const navigateSpy = jest.spyOn(router, 'navigate');
		component.onSubmit(<NgForm>{
			value: {
				name: 'Beginner match',
				date: new Date('2023-05-05T00:00:00.000+00:00'),
				location: 'Jaarbeurs Utrecht',
				rank: 1,
				prizeMoney: 100,
			},
		});

		//Check if the create function was called
		expect(matchServiceSpy.addNewMatch).toHaveBeenCalled();
		//Check if the user was navigated after the creation
		expect(navigateSpy).toHaveBeenCalledWith(['match-manager']);
	});

	it('Edit a match', () => {
		const navigateSpy = jest.spyOn(router, 'navigate');

		//Set the existing match that will be edited
		component.match = {
			name: 'Beginner match',
			date: new Date('2023-05-05T00:00:00.000+00:00'),
			location: 'Jaarbeurs Utrecht',
			rank: 1,
			prizeMoney: 100,
			id: '7c27b334-a1f4-4526-a90b-79556797d732',
		} as IMatch;

		component.onSubmit(<NgForm>{
			value: {
				name: 'Beginner match',
				date: new Date('2023-05-05T00:00:00.000+00:00'),
				location: 'Jaarbeurs Utrecht',
				rank: 1,
				prizeMoney: 200,
				id: '7c27b334-a1f4-4526-a90b-79556797d732',
			},
		});

		//Check if the edit function was called
		expect(matchServiceSpy.editMatchById).toHaveBeenCalled();
		//Check if the user was navigated after the editing
		expect(navigateSpy).toHaveBeenCalledWith(['match-manager']);
	});
});
