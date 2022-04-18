import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BloomreachBaseClass } from '@app/core/bloomreach';
import { GalleryFiltersDesktopComponent } from './gallery-filters-desktop.component';
import { MatDialogModule } from '@angular/material/dialog';
import { NO_ERRORS_SCHEMA } from '@angular/compiler/src/core';
describe('GalleryFiltersDesktopComponent', () => {
  let component: GalleryFiltersDesktopComponent;
  let fixture: ComponentFixture<GalleryFiltersDesktopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GalleryFiltersDesktopComponent ],
      providers: [BloomreachBaseClass],
      imports: [RouterTestingModule, MatDialogModule, NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryFiltersDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
