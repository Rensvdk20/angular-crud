import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserManagerColumnsComponent } from './user-manager-overview.component';

describe('UserManagerColumnsComponent', () => {
	let component: UserManagerColumnsComponent;
	let fixture: ComponentFixture<UserManagerColumnsComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [UserManagerColumnsComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(UserManagerColumnsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
