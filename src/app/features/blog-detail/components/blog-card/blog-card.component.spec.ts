import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BlogCardComponent } from './blog-card.component';
import { MockModule } from 'ng-mocks';
import { SharedModule } from '@shared/shared.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';
 
describe('BlogCardComponent', () => {
  let component: BlogCardComponent;
  let fixture: ComponentFixture<BlogCardComponent>;
 
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BlogCardComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [MockModule(SharedModule)],
    }).compileComponents();
  });
 
  beforeEach(() => {
    fixture = TestBed.createComponent(BlogCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
 
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it(
    'should render the blog cards ',
    waitForAsync(() => {
      fixture = TestBed.createComponent(BlogCardComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('.blog-card')).toBeTruthy();
    })
  );
 
  it(
    'should render the blog card container ',
    waitForAsync(() => {
      fixture = TestBed.createComponent(BlogCardComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('.blog-card__container')).toBeTruthy();
    })
  );
 
  it(
    'should render the blog card image content ',
    waitForAsync(() => {
      fixture = TestBed.createComponent(BlogCardComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('.blog-card__imageContent')).toBeTruthy();
    })
  );
 
  it(
    'should render the blog card image',
    waitForAsync(() => {
      fixture = TestBed.createComponent(BlogCardComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('.blog-card__image')).toBeTruthy();
    })
  );
 
  it(
    'should render the blog card header',
    waitForAsync(() => {
      fixture = TestBed.createComponent(BlogCardComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('.blog-card__header')).toBeTruthy();
    })
  );
 
  it(
    'should render the blog card header title',
    waitForAsync(() => {
      fixture = TestBed.createComponent(BlogCardComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('.blog-card__header__title')).toBeTruthy();
    })
  );
 
  it(
    'should render the blog card read more button',
    waitForAsync(() => {
      fixture = TestBed.createComponent(BlogCardComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('.blog-card__readMore')).toBeTruthy();
    })
  );
});