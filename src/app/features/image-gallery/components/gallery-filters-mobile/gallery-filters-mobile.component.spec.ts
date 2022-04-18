import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryFiltersMobileComponent } from './gallery-filters-mobile.component';

describe('GalleryFiltersMobileComponent', () => {
  let component: GalleryFiltersMobileComponent;
  let fixture: ComponentFixture<GalleryFiltersMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GalleryFiltersMobileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryFiltersMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
