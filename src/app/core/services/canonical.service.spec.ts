import { TestBed } from '@angular/core/testing';
import { CanonicalService } from './canonical.service';

describe('CanonicalService', () => {
	let service: CanonicalService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [CanonicalService],
		});
		service = TestBed.inject(CanonicalService);
	});

	it('should be created', () => {
		const urlMock = 'https://google.com';
		service.updateCanonicalUrl(urlMock);

		expect(service).toBeTruthy();
	});
});
