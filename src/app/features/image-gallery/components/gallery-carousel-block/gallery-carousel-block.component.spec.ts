import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryCarouselBlockComponent } from './gallery-carousel-block.component';

describe('GalleryCarouselBlockComponent', () => {
  let component: GalleryCarouselBlockComponent;
  let fixture: ComponentFixture<GalleryCarouselBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GalleryCarouselBlockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryCarouselBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
