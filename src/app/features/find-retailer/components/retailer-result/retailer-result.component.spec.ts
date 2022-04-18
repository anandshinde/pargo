import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RetailerResultComponent } from './retailer-result.component';
import { MockModule } from 'ng-mocks';
import { SharedModule } from '@shared/shared.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('RetailerResultComponent', () => {
  let component: RetailerResultComponent;
  let fixture: ComponentFixture<RetailerResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetailerResultComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [MockModule(SharedModule)],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RetailerResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(
    'should render the Reatiler result',
    waitForAsync(() => {
      fixture = TestBed.createComponent(RetailerResultComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('.result')).toBeTruthy();
    })
  );
});
