import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FindRetailerComponent } from './find-retailer.component';
import { MockModule } from 'ng-mocks';
import { SharedModule } from '@shared/shared.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('FindRetailerComponent', () => {
  let component: FindRetailerComponent;
  let fixture: ComponentFixture<FindRetailerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindRetailerComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [MockModule(SharedModule)],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FindRetailerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(
    'should render the Search Result',
    waitForAsync(() => {
      fixture = TestBed.createComponent(FindRetailerComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('.retailer-results__search')).toBeTruthy();
    })
  );

  it(
    'should render the Sortby',
    waitForAsync(() => {
      fixture = TestBed.createComponent(FindRetailerComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('.retailer__sortBy')).toBeTruthy();
    })
  );

  it(
    'should render the Sortby',
    waitForAsync(() => {
      fixture = TestBed.createComponent(FindRetailerComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('.retailer__sortBy')).toBeTruthy();
    })
  );

  it(
    'should render the View More',
    waitForAsync(() => {
      fixture = TestBed.createComponent(FindRetailerComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('.retailer-results__view-more')).toBeTruthy();
    })
  );
});
