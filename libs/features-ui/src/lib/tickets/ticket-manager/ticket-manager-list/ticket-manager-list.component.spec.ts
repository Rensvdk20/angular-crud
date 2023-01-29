import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketManagerListComponent } from './ticket-manager-list.component';

describe('TicketManagerListComponent', () => {
	let component: TicketManagerListComponent;
	let fixture: ComponentFixture<TicketManagerListComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [TicketManagerListComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(TicketManagerListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
