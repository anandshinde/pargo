import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { CarouselBannerComponent } from './carousel-banner.component';

describe('CarouselBannerComponent', () => {
	let component: CarouselBannerComponent;
	let fixture: ComponentFixture<CarouselBannerComponent>;
	let contentMock: any = [
		{
			content: {
				bannerContent:
					'<p>Check out all our new tools to help you choose your perfect flooring.</p>',
				bannerHeadline: '<h2>Welcome To Mohawk Flooring</h2>',
				bannerLinks: [
					{
						presentation: {
							buttonType: 'primary',
							textAlign: null,
							iconStroke: null,
							iconPosition: 'left',
						},
						content: { link: null, target: null, text: 'Discover', url: '' },
					},
				],
				id: '9c003e80-f84b-4cfe-8b27-3b244ee23de5',
				alignment: 'center',
				imageBg: {
					contentType: 'brxm:ImageCompound',
					altText: '',
					link: '',
					title: '',
					imageBRE: null,
					imageDAMUrl:
						'https://s7d4.scene7.com/is/image/MohawkResidential/Home-Banner-Assets%20(1)?scl=8&wid=930&op_sharpen=1&align=0,.1',
				},
				imageBgMobile: {
					contentType: 'brxm:ImageCompound',
					altText: '',
					link: '',
					title: '',
					imageBRE: null,
					imageDAMUrl: '',
				},
				logo: {
					contentType: 'brxm:ImageCompound',
					altText: '',
					link: '',
					title: 'Logo',
					imageBRE: null,
					imageDAMUrl: '',
				},
			},
			presentation: {
				color: 'Color Shown',
				includeColor: true,
				size: 'medium',
			},
		},
		{
			content: {
				bannerContent:
					'<p>Check out all our new tools to help you choose your perfect flooring.</p>',
				bannerHeadline: '<h2>Banner 2</h2>',
				bannerLinks: [
					{
						presentation: {
							buttonType: 'primary',
							textAlign: null,
							iconStroke: null,
							iconPosition: 'left',
						},
						content: { link: null, target: null, text: 'Discover', url: '' },
					},
				],
				id: '384fc860-e79c-46d7-b12f-2a11a4abbda2',
				alignment: 'center',
				imageBg: {
					contentType: 'brxm:ImageCompound',
					altText: '',
					link: '',
					title: '',
					imageBRE: null,
					imageDAMUrl:
						'https://s7d4.scene7.com/is/image/MohawkResidential/Home-Assets%20(25)?scl=2',
				},
				imageBgMobile: {
					contentType: 'brxm:ImageCompound',
					altText: '',
					link: '',
					title: '',
					imageBRE: null,
					imageDAMUrl: '',
				},
				logo: {
					contentType: 'brxm:ImageCompound',
					altText: '',
					link: '',
					title: 'Logo',
					imageBRE: null,
					imageDAMUrl: '',
				},
			},
			presentation: {
				color: 'Color Shown',
				includeColor: true,
				size: 'medium',
			},
		},
		{
			content: {
				bannerContent:
					'<p>Check out all our new tools to help you choose your perfect flooring.</p>',
				bannerHeadline: '<h2>Banner 3</h2>',
				bannerLinks: [
					{
						presentation: {
							buttonType: 'primary',
							textAlign: null,
							iconStroke: null,
							iconPosition: 'left',
						},
						content: { link: null, target: null, text: 'Discover', url: '' },
					},
				],
				id: 'fe046001-fda4-48a3-8acc-ac5c60719a1c',
				alignment: 'center',
				imageBg: {
					contentType: 'brxm:ImageCompound',
					altText: '',
					link: '',
					title: '',
					imageBRE: null,
					imageDAMUrl:
						'https://s7d4.scene7.com/is/image/MohawkResidential/Home-Assets%20(24)?scl=2',
				},
				imageBgMobile: {
					contentType: 'brxm:ImageCompound',
					altText: '',
					link: '',
					title: '',
					imageBRE: null,
					imageDAMUrl: '',
				},
				logo: {
					contentType: 'brxm:ImageCompound',
					altText: '',
					link: '',
					title: 'Logo',
					imageBRE: null,
					imageDAMUrl: '',
				},
			},
			presentation: {
				color: 'Color Shown',
				includeColor: true,
				size: 'medium',
			},
		},
		{
			content: {
				bannerContent:
					'<p>Check out all our new tools to help you choose your perfect flooring.</p>',
				bannerHeadline: '<h2>Banner 4</h2>',
				bannerLinks: [
					{
						presentation: {
							buttonType: 'primary',
							textAlign: null,
							iconStroke: null,
							iconPosition: 'left',
						},
						content: { link: null, target: null, text: 'Discover', url: '' },
					},
				],
				id: '6cf59c98-53eb-429a-8139-3b2d12365af7',
				alignment: 'center',
				imageBg: {
					contentType: 'brxm:ImageCompound',
					altText: '',
					link: '',
					title: '',
					imageBRE: null,
					imageDAMUrl:
						'https://s7d4.scene7.com/is/image/MohawkResidential/Home-Assets%20(23)?scl=2.1&wid=700&hei=510&op_sharpen=1&align=0,.99',
				},
				imageBgMobile: {
					contentType: 'brxm:ImageCompound',
					altText: '',
					link: '',
					title: '',
					imageBRE: null,
					imageDAMUrl: '',
				},
				logo: {
					contentType: 'brxm:ImageCompound',
					altText: '',
					link: '',
					title: 'Logo',
					imageBRE: null,
					imageDAMUrl: '',
				},
			},
			presentation: {
				color: 'Color Shown',
				includeColor: true,
				size: 'medium',
			},
		},
	];

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [CarouselBannerComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(CarouselBannerComponent);
		component = fixture.componentInstance;
		component.content = contentMock;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
	it('should load 4 sliders', () => {
		expect(component.content['length']).toBeTruthy();
	});
	it('Should load swiper module', () => {
		fixture.detectChanges();
		const swiper = fixture.debugElement.query(By.css('#swiper'));
		fixture.detectChanges();
		expect(swiper.nativeNode.localName).toEqual('swiper');
	});
});
