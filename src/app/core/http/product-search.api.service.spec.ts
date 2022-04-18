import { TestBed } from '@angular/core/testing';

import { ProductSearchApi } from './product-search.api.service';

describe('ProductSearch.ApiService', () => {
  let service: ProductSearchApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductSearchApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
