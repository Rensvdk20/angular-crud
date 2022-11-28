import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchManagerListComponent } from './match-manager-list.component';

describe('MatchManagerListComponent', () => {
	let component: MatchManagerListComponent;
	let fixture: ComponentFixture<MatchManagerListComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [MatchManagerListComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(MatchManagerListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
