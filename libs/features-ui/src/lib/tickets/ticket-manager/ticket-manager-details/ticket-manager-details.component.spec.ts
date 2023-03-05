import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketManagerDetailsComponent } from './ticket-manager-details.component';

describe('TicketManagerDetailsComponent', () => {
	let component: TicketManagerDetailsComponent;
	let fixture: ComponentFixture<TicketManagerDetailsComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [TicketManagerDetailsComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(TicketManagerDetailsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
