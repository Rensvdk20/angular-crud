import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchManagerEditComponent } from './match-manager-edit.component';

describe('MatchManagerEditComponent', () => {
	let component: MatchManagerEditComponent;
	let fixture: ComponentFixture<MatchManagerEditComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [MatchManagerEditComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(MatchManagerEditComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
