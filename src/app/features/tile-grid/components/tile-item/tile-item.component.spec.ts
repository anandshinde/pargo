import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TileItemComponent } from './tile-item.component';
import { MockModule } from 'ng-mocks';
import { SharedModule } from '@shared/shared.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
let contentData: any = {
	index: 0,
	image: {
		contentType: 'brxm:ImageCompound',
		altText: '',
		link: '',
		title: '',
		imageBRE: null,
		imageDAMUrl:
			'https://s7d4.scene7.com/is/image/MohawkResidential/LF000961_room_01?scl=3&wid=1400&hei=800&align=1,.2',
	},
	tileHeading: null,
	content: '<h2>Trend Name #1</h2>',
	link: {
		content: {
			link: null,
			target: '""',
			text: 'Explore',
			url: '/discover/trends/trend-collection',
		},
		presentation: {
			buttonType: 'secondary',
			textAlign: null,
			iconStroke: null,
			iconPosition: null,
		},
	},
	superheading: null,
};
var presentationData: any = {
	color: null,
	includeColor: null,
	shape: 'rectangle',
	includeRedline: true,
	alignment: 'center',
	verticalAlignment: 'center',
};
describe('TileItemComponent', () => {
	let component: TileItemComponent;
	let fixture: ComponentFixture<TileItemComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [TileItemComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(TileItemComponent);
		component = fixture.componentInstance;
		component.content$ = contentData;
		component.presentation$ = presentationData;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should display grid with find retailer', () => {
		component.templateType = 'gridwfindretailer';
		fixture.detectChanges();
		const retailerComponent = fixture.debugElement.query(
			By.css('#zipCodeRetailer')
		);
		fixture.detectChanges();
		expect(retailerComponent.nativeNode.localName).toEqual(
			'mflooring-footer-input-text'
		);
	});
  it('should render box with rich content ', waitForAsync(() => {
            fixture.detectChanges();
            const compiled = fixture.debugElement.nativeElement;
            expect(compiled.querySelector('.box')).toBeTruthy();
          }));
          it('should render richText content ', waitForAsync(() => {
            fixture.detectChanges();
            const compiled = fixture.debugElement.nativeElement;
            expect(compiled.querySelector('.rich-text')).toBeTruthy();
          }));
          it('should render  the Explore button ', waitForAsync(() => {
            fixture.detectChanges();
            const compiled = fixture.debugElement.nativeElement;
            expect(compiled.querySelector('.explore-button')).toBeTruthy();
          }));
});
