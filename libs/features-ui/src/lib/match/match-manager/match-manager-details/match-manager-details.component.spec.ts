import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchManagerDetailsComponent } from './match-manager-details.component';

describe('MatchManagerDetailsComponent', () => {
	let component: MatchManagerDetailsComponent;
	let fixture: ComponentFixture<MatchManagerDetailsComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [MatchManagerDetailsComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(MatchManagerDetailsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
