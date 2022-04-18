import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryPaginationComponent } from './gallery-pagination.component';

describe('GalleryPaginationComponent', () => {
  let component: GalleryPaginationComponent;
  let fixture: ComponentFixture<GalleryPaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GalleryPaginationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
