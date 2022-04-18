import { TestBed } from '@angular/core/testing';

import { TransferInterceptorService } from './transfer.interceptor';

describe('TransferInterceptorService', () => {
	beforeEach(() =>
		TestBed.configureTestingModule({
			providers: [TransferInterceptorService],
		})
	);

	it('should be created', () => {
		const interceptor: TransferInterceptorService = TestBed.inject(
			TransferInterceptorService
		);

		expect(interceptor).toBeTruthy();
	});
});
