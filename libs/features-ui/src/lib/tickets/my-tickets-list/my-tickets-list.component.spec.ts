import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTicketsListComponent } from './my-tickets-list.component';

describe('MyMatchesListComponent', () => {
	let component: MyTicketsListComponent;
	let fixture: ComponentFixture<MyTicketsListComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [MyTicketsListComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(MyTicketsListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
