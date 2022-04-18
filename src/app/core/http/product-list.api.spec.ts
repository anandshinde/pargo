import { TestBed } from '@angular/core/testing';

import { ProductListApi } from './product-list.api';

describe('ProductList.ApiService', () => {
  let service: ProductListApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductListApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
