import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CardComponent } from './card.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
describe('CardComponent', () => {
	let component: CardComponent;
	let fixture: ComponentFixture<CardComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [CardComponent],
			schemas: [NO_ERRORS_SCHEMA],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(CardComponent);
		component = fixture.componentInstance;

		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
	it(
		'should render the Main Card ',
		waitForAsync(() => {
			fixture = TestBed.createComponent(CardComponent);
			component = fixture.componentInstance;
			fixture.detectChanges();
			const compiled = fixture.debugElement.nativeElement;
			expect(compiled.querySelector('.card')).toBeTruthy();
		})
	);
	it(
		'should render the Card Image ',
		waitForAsync(() => {
			fixture = TestBed.createComponent(CardComponent);
			component = fixture.componentInstance;
			fixture.detectChanges();
			const compiled = fixture.debugElement.nativeElement;
			expect(compiled.querySelector('.card-img')).toBeTruthy();
		})
	);
	it(
		'should render the Card Heading ',
		waitForAsync(() => {
			fixture = TestBed.createComponent(CardComponent);
			component = fixture.componentInstance;
			fixture.detectChanges();
			const compiled = fixture.debugElement.nativeElement;
			expect(compiled.querySelector('.card-heading')).toBeTruthy();
		})
	);
	it(
		'should render the Card Details ',
		waitForAsync(() => {
			fixture = TestBed.createComponent(CardComponent);
			component = fixture.componentInstance;
			fixture.detectChanges();
			const compiled = fixture.debugElement.nativeElement;
			expect(compiled.querySelector('.card-details')).toBeTruthy();
		})
	);
	it(
		'should render the Read More Button ',
		waitForAsync(() => {
			fixture = TestBed.createComponent(CardComponent);
			component = fixture.componentInstance;
			fixture.detectChanges();
			const compiled = fixture.debugElement.nativeElement;
			expect(compiled.querySelector('.read-more')).toBeTruthy();
		})
	);
});
