import { TestBed } from '@angular/core/testing';
import { MyAccountFacade } from './my-account.facade';

describe('MyAccount.FacadeService', () => {
	let service: MyAccountFacade;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(MyAccountFacade);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
