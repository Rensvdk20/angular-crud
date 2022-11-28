import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserManagerEditComponent } from './user-manager-edit.component';

describe('UserManagerEditComponent', () => {
	let component: UserManagerEditComponent;
	let fixture: ComponentFixture<UserManagerEditComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [UserManagerEditComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(UserManagerEditComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
