import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryFormChipsComponent } from './gallery-form-chips.component';

describe('GalleryFormChipsComponent', () => {
  let component: GalleryFormChipsComponent;
  let fixture: ComponentFixture<GalleryFormChipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GalleryFormChipsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryFormChipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
