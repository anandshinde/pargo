import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryFormSelectComponent } from './gallery-form-select.component';

describe('GalleryFormSelectComponent', () => {
  let component: GalleryFormSelectComponent;
  let fixture: ComponentFixture<GalleryFormSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GalleryFormSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryFormSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
