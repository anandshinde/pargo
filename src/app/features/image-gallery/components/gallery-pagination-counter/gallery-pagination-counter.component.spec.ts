import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BloomreachBaseClass } from '@app/core/bloomreach';
import { GalleryPaginationCounterComponent } from './gallery-pagination-counter.component';
import { MatDialogModule } from '@angular/material/dialog';
import { NO_ERRORS_SCHEMA } from '@angular/compiler/src/core';
describe('GalleryPaginationCounterComponent', () => {
  let component: GalleryPaginationCounterComponent;
  let fixture: ComponentFixture<GalleryPaginationCounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GalleryPaginationCounterComponent ],
      providers: [BloomreachBaseClass],
      imports: [RouterTestingModule, MatDialogModule, NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryPaginationCounterComponent);
              component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
