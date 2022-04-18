import { TestBed } from '@angular/core/testing';

import { FindRetailerFacadeService } from './find-retailer-facade.service';

describe('FindRetailerFacadeService', () => {
  let service: FindRetailerFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FindRetailerFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
