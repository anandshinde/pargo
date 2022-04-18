import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TileTwoTopColumnComponent } from './tile-two-top-column.component';

describe('TileTwoTopColumnComponent', () => {
  let component: TileTwoTopColumnComponent;
  let fixture: ComponentFixture<TileTwoTopColumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TileTwoTopColumnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TileTwoTopColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
