import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchListComponent } from './match-list.component';

describe('MatchListComponent', () => {
	let component: MatchListComponent;
	let fixture: ComponentFixture<MatchListComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [MatchListComponent],
			imports: [HttpClientTestingModule],
		}).compileComponents();

		fixture = TestBed.createComponent(MatchListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
