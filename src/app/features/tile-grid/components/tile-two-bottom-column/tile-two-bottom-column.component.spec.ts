import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TileTwoBottomColumnComponent } from './tile-two-bottom-column.component';

describe('TileTwoBottomColumnComponent', () => {
  let component: TileTwoBottomColumnComponent;
  let fixture: ComponentFixture<TileTwoBottomColumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TileTwoBottomColumnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TileTwoBottomColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
