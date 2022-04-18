import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MockModule } from 'ng-mocks';
import { SharedModule } from '@shared/shared.module';
import { RichContentComponent } from './rich-content.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BloomreachBaseClass } from '@core/bloomreach';
import { RouterTestingModule } from '@angular/router/testing';

describe('RichContentComponent', () => {
	let component: RichContentComponent;
	let fixture: ComponentFixture<RichContentComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [RichContentComponent],
			schemas: [NO_ERRORS_SCHEMA],
			providers: [BloomreachBaseClass],
			imports: [MockModule(SharedModule), RouterTestingModule],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(RichContentComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
	it('rich content gray background', () => {
		let type = typeof component.richContentData$;
		expect(type).toBe('on');
	});

	it(
		'should render the rich content',
		waitForAsync(() => {
			const compiled = fixture.debugElement.nativeElement;
			expect(compiled.querySelector('.rich-content__content')).toBeTruthy();
		})
	);
	it(
		'should render the rich content item',
		waitForAsync(() => {
			const compiled = fixture.debugElement.nativeElement;
			expect(compiled.querySelector('.rich-content__contentItem')).toBeTruthy();
		})
	);
	it(
		'should render the rich content two columns',
		waitForAsync(() => {
			const compiled = fixture.debugElement.nativeElement;
			expect(compiled.querySelector('.content-column')).toBeTruthy();
		})
	);
	it(
		'should render the rich content having two column content',
		waitForAsync(() => {
			const compiled = fixture.debugElement.nativeElement;
			expect(compiled.querySelector('.content-column-next')).toBeTruthy();
		})
	);
	it('should mock image width', () => {
		spyOnProperty(window, 'innerWidth').and.returnValue(52);
		window.dispatchEvent(new Event('resize'));
	});
});
