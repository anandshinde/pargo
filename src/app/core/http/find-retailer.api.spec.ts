import { TestBed } from '@angular/core/testing';

import { FindRetailerApi } from './find-retailer.api';

describe('FindRetailerApi', () => {
  let service: FindRetailerApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FindRetailerApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
