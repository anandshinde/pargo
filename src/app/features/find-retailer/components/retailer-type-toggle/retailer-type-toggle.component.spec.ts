import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailerTypeToggleComponent } from './retailer-type-toggle.component';

describe('RetailerTypeToggleComponent', () => {
  let component: RetailerTypeToggleComponent;
  let fixture: ComponentFixture<RetailerTypeToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetailerTypeToggleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RetailerTypeToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
