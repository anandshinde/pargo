import { TestBed } from '@angular/core/testing';
import { ForgotPwdFacade } from './forgot-pwd.facade';

describe('ForgotPwd.FacadeService', () => {
	let service: ForgotPwdFacade;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(ForgotPwdFacade);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
