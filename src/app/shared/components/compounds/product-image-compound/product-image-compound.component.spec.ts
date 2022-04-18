import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductImageCompoundComponent } from './product-image-compound.component';

describe('ProductImageCompoundComponent', () => {
  let component: ProductImageCompoundComponent;
  let fixture: ComponentFixture<ProductImageCompoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductImageCompoundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductImageCompoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
