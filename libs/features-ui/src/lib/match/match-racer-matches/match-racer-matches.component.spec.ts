import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchRacerMatchesComponent } from './match-racer-matches.component';

describe('MatchRacerMatchesComponent', () => {
	let component: MatchRacerMatchesComponent;
	let fixture: ComponentFixture<MatchRacerMatchesComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [MatchRacerMatchesComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(MatchRacerMatchesComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
