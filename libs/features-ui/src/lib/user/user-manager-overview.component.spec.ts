import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserManagerOverviewComponent } from './user-manager-overview.component';

describe('UserManagerOverviewComponent', () => {
	let component: UserManagerOverviewComponent;
	let fixture: ComponentFixture<UserManagerOverviewComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [UserManagerOverviewComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(UserManagerOverviewComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
