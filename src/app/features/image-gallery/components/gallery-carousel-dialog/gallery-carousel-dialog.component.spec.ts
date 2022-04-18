import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryCarouselDialogComponent } from './gallery-carousel-dialog.component';

describe('GalleryCarouselDialogComponent', () => {
  let component: GalleryCarouselDialogComponent;
  let fixture: ComponentFixture<GalleryCarouselDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GalleryCarouselDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryCarouselDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
