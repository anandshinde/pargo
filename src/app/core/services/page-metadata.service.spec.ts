import { TestBed } from '@angular/core/testing';

import { PageMetadataService } from './page-metadata.service';

describe('PageMetadataService', () => {
	let service: PageMetadataService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(PageMetadataService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
