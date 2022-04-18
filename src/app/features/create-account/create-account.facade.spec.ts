import { TestBed } from '@angular/core/testing';
import { CreateAccountFacade } from './create-account.facade';

describe('CreateAccount.FacadeService', () => {
	let service: CreateAccountFacade;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(CreateAccountFacade);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
