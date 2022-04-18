import { TestBed } from '@angular/core/testing';

import { AccountGuardGuard } from './account-guard.guard';

describe('RouteGuardGuard', () => {
	let guard: AccountGuardGuard;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		guard = TestBed.inject(AccountGuardGuard);
	});

	it('should be created', () => {
		expect(guard).toBeTruthy();
	});
});
