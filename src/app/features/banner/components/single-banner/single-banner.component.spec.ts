import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { SingleBannerComponent } from './single-banner.component';

describe('SingleBannerComponent', () => {
	let component: SingleBannerComponent;
	let fixture: ComponentFixture<SingleBannerComponent>;
	var presentationMock: any = {
		color: null,
		includeColor: true,
		shape: 'rectangle',
		includeRedline: true,
		alignment: 'center',
		verticalAlignment: 'center',
	};
	var contentMock: any = {
		banner: {
			bannerContent: '<h1>Newsroom</h1>',
			bannerHeadline: 'Newsroom',
			bannerLinks: [
				{
					button: null,
					link: null,
					target: null,
					text: 'test',
					url: '',
					alignment: null,
				},
			],
			id: '27a80667-8976-4c00-aac4-51edfc932bc4',
			alignment: 'center',
			imageBg: {
				contentType: 'brxm:ImageCompound',
				altText: '',
				link: '',
				title: '',
				imageBRE: null,
				imageDAMUrl:
					'https://mohawk.scene7.com/is/image/MohawkResidential/b329aee5-f7b7-4fb0-bbbb-57052801c336?scl=1&wid=1200&hei=400&op_sharpen=1&align=0,.4',
			},
			imageBgMobile: {
				contentType: 'brxm:ImageCompound',
				altText: '',
				link: '',
				title: '',
				imageBRE: null,
				imageDAMUrl:
					'https://mohawk.scene7.com/is/image/MohawkResidential/b329aee5-f7b7-4fb0-bbbb-57052801c336?scl=1&wid=1200&hei=400&op_sharpen=1&align=0,.4',
			},
			logo: {
				contentType: 'brxm:ImageCompound',
				altText: '',
				link: '',
				title: '',
				imageBRE: null,
				imageDAMUrl: '',
			},
		},
		resourceBundle: {
			'hero.text': 'Believe in better',
			'tabs.title': 'Explore our design and inspiration',
		},
	};

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [SingleBannerComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(SingleBannerComponent);
		component = fixture.componentInstance;
		component.content = contentMock;
		component.presentation = presentationMock;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
	it('Should render layout wrapper', () => {
		const layoutWrapper: any = fixture.debugElement.query(
			By.css('#layoutWrapper')
		);
		fixture.detectChanges();
		expect(layoutWrapper.nativeNode.localName).toEqual(
			'mflooring-layout-wrapper'
		);
	});
	it('Should render banner headline', () => {
		const layoutWrapper: any = fixture.debugElement.query(
			By.css('#bannerHeadline')
		);
		fixture.detectChanges();
		expect(layoutWrapper.nativeNode.innerHTML).toEqual('');
	});
	it('should display rich text component', () => {
		const rectRichText = fixture.debugElement.query(By.css('#richText'));
		fixture.detectChanges();
		expect(rectRichText.nativeNode.localName).toBe(
			'mflooring-rich-text-compound'
		);
	});
	it('Should render link compound', () => {
		const layoutWrapper: any = fixture.debugElement.query(
			By.css('#linkCompound')
		);
		fixture.detectChanges();
		expect(layoutWrapper.nativeNode.localName).toEqual(
			'mflooring-link-compound'
		);
	});
});
