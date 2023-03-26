import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchCompeteAsRacerComponent } from './match-compete-as-racer.component';

describe('MatchCompeteAsRacerComponent', () => {
	let component: MatchCompeteAsRacerComponent;
	let fixture: ComponentFixture<MatchCompeteAsRacerComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [MatchCompeteAsRacerComponent],
			imports: [HttpClientTestingModule],
		}).compileComponents();

		fixture = TestBed.createComponent(MatchCompeteAsRacerComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
