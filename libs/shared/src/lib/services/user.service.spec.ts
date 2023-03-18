import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { UserService } from './user.service';

describe('UserService', () => {
	let service: UserService;

	const ALL_USERS = {
		_id: '6391f222370c7ede09e7b1b7',
		firstName: 'john',
		lastName: 'doe',
		email: 'johnd@gmail.com',
		birthday: '2002-06-05T22:00:00.000Z',
		isAdmin: true,
		id: '5321a4c1-0682-483e-829f-bcf4b0329a59',
	};

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
			providers: [UserService],
		});
		service = TestBed.inject(UserService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should return users list', () => {
		const result = service.getAllUsers();
		result.subscribe((res) => {
			expect(res).toEqual(ALL_USERS);
		});
	});
});
