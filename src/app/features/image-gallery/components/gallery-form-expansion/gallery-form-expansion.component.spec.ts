import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryFormExpansionComponent } from './gallery-form-expansion.component';

describe('GalleryFormExpansionComponent', () => {
  let component: GalleryFormExpansionComponent;
  let fixture: ComponentFixture<GalleryFormExpansionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GalleryFormExpansionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryFormExpansionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
