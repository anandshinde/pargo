
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RetailerApptModalComponent } from './retailer-appt-modal.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { BloomreachBaseClass } from '@app/core/bloomreach';
import { SharedModule } from '@app/shared/shared.module';
import { MockModule } from 'ng-mocks';

describe('RetailerApptModalComponent', () => {
	let component: RetailerApptModalComponent;
	let fixture: ComponentFixture<RetailerApptModalComponent>;
  
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [RetailerApptModalComponent],
			schemas: [NO_ERRORS_SCHEMA,],
      
     
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(RetailerApptModalComponent);
		component = fixture.componentInstance;

		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
	it(
		'should render the Header ',
		waitForAsync(() => {
			fixture = TestBed.createComponent(RetailerApptModalComponent);
			component = fixture.componentInstance;
			fixture.detectChanges();
			const compiled = fixture.debugElement.nativeElement;
			expect(compiled.querySelector('.intro-header')).toBeTruthy();
		})
	);
	it(
		'should render the intro-header__retailer-name ',
		waitForAsync(() => {
			fixture = TestBed.createComponent(RetailerApptModalComponent);
			component = fixture.componentInstance;
			fixture.detectChanges();
			const compiled = fixture.debugElement.nativeElement;
			expect(compiled.querySelector('.intro-header__retailer-name')).toBeTruthy();
		})
	);
	it(
		'should render the intro-header__appointment ',
		waitForAsync(() => {
			fixture = TestBed.createComponent(RetailerApptModalComponent);
			component = fixture.componentInstance;
			fixture.detectChanges();
			const compiled = fixture.debugElement.nativeElement;
			expect(compiled.querySelector('.intro-header__appointment')).toBeTruthy();
		})
	);
	it(
		'should render the intro-header__stepper ',
		waitForAsync(() => {
			fixture = TestBed.createComponent(RetailerApptModalComponent);
			component = fixture.componentInstance;
			fixture.detectChanges();
			const compiled = fixture.debugElement.nativeElement;
			expect(compiled.querySelector('.intro-header__stepper')).toBeTruthy();
		})
	);
	it(
		'should render the step-label ',
		waitForAsync(() => {
			fixture = TestBed.createComponent(RetailerApptModalComponent);
			component = fixture.componentInstance;
			fixture.detectChanges();
			const compiled = fixture.debugElement.nativeElement;
			expect(compiled.querySelector('.step-label')).toBeTruthy();
		})
	);
	it(
		'should render the label-text ',
		waitForAsync(() => {
			fixture = TestBed.createComponent(RetailerApptModalComponent);
			component = fixture.componentInstance;
			fixture.detectChanges();
			const compiled = fixture.debugElement.nativeElement;
			expect(compiled.querySelector('.label-text')).toBeTruthy();
		})
	);
	it(
		'should render form__stepper',
		waitForAsync(() => {
			fixture = TestBed.createComponent(RetailerApptModalComponent);
			component = fixture.componentInstance;
			fixture.detectChanges();
			const compiled = fixture.debugElement.nativeElement;
			expect(compiled.querySelector('.form__stepper')).toBeTruthy();
		})
	);
	it(
		'should render the time-picker ',
		waitForAsync(() => {
			fixture = TestBed.createComponent(RetailerApptModalComponent);
			component = fixture.componentInstance;
			fixture.detectChanges();
			const compiled = fixture.debugElement.nativeElement;
			expect(compiled.querySelector('.time-picker')).toBeTruthy();
		})
	);
	it(
		'should render the time-picker__container ',
		waitForAsync(() => {
			fixture = TestBed.createComponent(RetailerApptModalComponent);
			component = fixture.componentInstance;
			fixture.detectChanges();
			const compiled = fixture.debugElement.nativeElement;
			expect(compiled.querySelector('.time-picker__container')).toBeTruthy();
		})
	);
	it(
		'should render the time-picker__time ',
		waitForAsync(() => {
			fixture = TestBed.createComponent(RetailerApptModalComponent);
			component = fixture.componentInstance;
			fixture.detectChanges();
			const compiled = fixture.debugElement.nativeElement;
			expect(compiled.querySelector('.time-picker__time')).toBeTruthy();
		})
	);
});

