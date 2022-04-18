import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryCarouselItemComponent } from './gallery-carousel-item.component';

describe('GalleryCarouselItemComponent', () => {
  let component: GalleryCarouselItemComponent;
  let fixture: ComponentFixture<GalleryCarouselItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GalleryCarouselItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryCarouselItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
