import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RetailerDetailsComponent } from './retailer-details.component';
import { MockModule } from 'ng-mocks';
import { SharedModule } from '@shared/shared.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('RetailerDetailsComponent', () => {
  let component: RetailerDetailsComponent;
  let fixture: ComponentFixture<RetailerDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetailerDetailsComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [MockModule(SharedModule)],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RetailerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(
    'should render the Retailer Detail Components',
    waitForAsync(() => {
      fixture = TestBed.createComponent(RetailerDetailsComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('.retailer-detail-component')).toBeTruthy();
    })
  );
});
