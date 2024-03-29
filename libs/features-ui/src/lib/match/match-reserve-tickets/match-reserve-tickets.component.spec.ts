import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchReserveTicketsComponent } from './match-reserve-tickets.component';

describe('MatchReserveTicketsComponent', () => {
	let component: MatchReserveTicketsComponent;
	let fixture: ComponentFixture<MatchReserveTicketsComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [MatchReserveTicketsComponent],
			imports: [HttpClientTestingModule],
		}).compileComponents();

		fixture = TestBed.createComponent(MatchReserveTicketsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
