import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketManagerOverviewComponent } from './ticket-manager-overview.component';

describe('TicketManagerComponent', () => {
	let component: TicketManagerOverviewComponent;
	let fixture: ComponentFixture<TicketManagerOverviewComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [TicketManagerOverviewComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(TicketManagerOverviewComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
