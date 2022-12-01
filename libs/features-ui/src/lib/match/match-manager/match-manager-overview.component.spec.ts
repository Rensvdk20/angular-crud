import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchManagerOverviewComponent } from './match-manager-overview.component';

describe('MatchManagerOverviewComponent', () => {
	let component: MatchManagerOverviewComponent;
	let fixture: ComponentFixture<MatchManagerOverviewComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [MatchManagerOverviewComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(MatchManagerOverviewComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
