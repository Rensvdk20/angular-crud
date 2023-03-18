import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchRecommendedListComponent } from './match-recommended-list.component';

describe('MatchRecommendedListComponent', () => {
	let component: MatchRecommendedListComponent;
	let fixture: ComponentFixture<MatchRecommendedListComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [MatchRecommendedListComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(MatchRecommendedListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
