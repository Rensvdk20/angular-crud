import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatchManagerListComponent } from './match-manager-list.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MatchManagerListComponent', () => {
	let component: MatchManagerListComponent;
	let fixture: ComponentFixture<MatchManagerListComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [MatchManagerListComponent],
			imports: [RouterTestingModule, HttpClientTestingModule],
		}).compileComponents();

		fixture = TestBed.createComponent(MatchManagerListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should have a list of matches', () => {
		expect(component.matches.length).toBeGreaterThanOrEqual(0);
	});
});
