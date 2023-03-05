import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketManagerEditComponent } from './ticket-manager-edit.component';

describe('TicketManagerEditComponent', () => {
	let component: TicketManagerEditComponent;
	let fixture: ComponentFixture<TicketManagerEditComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [TicketManagerEditComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(TicketManagerEditComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
