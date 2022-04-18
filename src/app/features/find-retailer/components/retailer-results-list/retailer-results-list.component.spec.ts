import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RetailerResultsListComponent } from './retailer-results-list.component';
import { MockModule } from 'ng-mocks';
import { SharedModule } from '@shared/shared.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('RetailerResultsListComponent', () => {
  let component: RetailerResultsListComponent;
  let fixture: ComponentFixture<RetailerResultsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetailerResultsListComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [MockModule(SharedModule)],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RetailerResultsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(
    'should render the Reatiler List',
    waitForAsync(() => {
      fixture = TestBed.createComponent(RetailerResultsListComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('.retailer-results-list')).toBeTruthy();
    })
  );

});
