import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ShopByCategoryComponent } from './shop-by-category.component';

describe('ShopByCategoryComponent', () => {
	let component: ShopByCategoryComponent;
	let fixture: ComponentFixture<ShopByCategoryComponent>;
	var contentMock = {
		id: 'f07372e3-a754-4d12-88e0-c37483594c51',
		_meta: {},
		_links: { site: { href: '/site/mf', type: 'internal' } },
		name: 'shop-by-category',
		displayName: 'Shop by category',
		categorySlideCompound: [
			{
				name: 'brxm:CategorySlideCompound',
				displayName: 'brxm:CategorySlideCompound',
				description: 'Shop For A Specific Room Type',
				tabTitle: 'Shop by Room',
				categorySlideItemCompound: [
					{
						name: 'brxm:CategorySlideItemCompound',
						displayName: 'brxm:CategorySlideItemCompound',
						title: 'Kitchen',
						description: 'Shop our selected flooring options for Kitchens',
						heroImage: {
							name: 'brxm:heroImage',
							displayName: 'brxm:heroImage',
							title: '',
							link: '',
							imageBRE: null,
							imageDAM:
								'https://mohawk.scene7.com/is/image/MohawkResidential/Home-Assets%20(6)?scl=1',
							altText: '',
							contentType: 'brxm:ImageCompound',
						},
						iconImage: {
							name: 'brxm:iconImage',
							displayName: 'brxm:iconImage',
							title: '',
							link: '',
							imageBRE: null,
							imageDAM:
								'https://mohawk.scene7.com/is/image/MohawkResidential/Home-Assets%20Swatch%20(3)?scl=1',
							altText: '',
							contentType: 'brxm:ImageCompound',
						},
						linkCompound: {
							name: 'brxm:LinkCompound',
							displayName: 'brxm:LinkCompound',
							link: null,
							alignment: null,
							url: '',
							text: 'Shop Products',
							button: 'primary',
							iconStroke: null,
							iconStyle: null,
							icon: null,
							target: null,
							contentType: 'brxm:LinkCompound',
						},
						contentType: 'brxm:CategorySlideItemCompound',
					},
					{
						name: 'brxm:CategorySlideItemCompound',
						displayName: 'brxm:CategorySlideItemCompound',
						title: 'Bedroom',
						description: 'Shop our selected flooring options for Bedrooms',
						heroImage: {
							name: 'brxm:heroImage',
							displayName: 'brxm:heroImage',
							title: 'second items background',
							link: '',
							imageBRE: null,
							imageDAM:
								'https://mohawk.scene7.com/is/image/MohawkResidential/Home-Assets%20(5)?scl=2&wid=810',
							altText: '',
							contentType: 'brxm:ImageCompound',
						},
						iconImage: {
							name: 'brxm:iconImage',
							displayName: 'brxm:iconImage',
							title: '',
							link: '',
							imageBRE: null,
							imageDAM:
								'https://mohawk.scene7.com/is/image/MohawkResidential/Home-Assets%20Swatch%20(2)?scl=1',
							altText: '',
							contentType: 'brxm:ImageCompound',
						},
						linkCompound: {
							name: 'brxm:LinkCompound',
							displayName: 'brxm:LinkCompound',
							link: null,
							alignment: null,
							url: '',
							text: 'Shop Products',
							button: 'primary',
							iconStroke: null,
							iconStyle: null,
							icon: null,
							target: null,
							contentType: 'brxm:LinkCompound',
						},
						contentType: 'brxm:CategorySlideItemCompound',
					},
					{
						name: 'brxm:CategorySlideItemCompound',
						displayName: 'brxm:CategorySlideItemCompound',
						title: 'Bathroom',
						description: 'Shop our selected flooring options for Bathrooms',
						heroImage: {
							name: 'brxm:heroImage',
							displayName: 'brxm:heroImage',
							title: 'third background',
							link: '',
							imageBRE: null,
							imageDAM:
								'https://mohawk.scene7.com/is/image/MohawkResidential/Home-Assets%20(6)?scl=3',
							altText: '',
							contentType: 'brxm:ImageCompound',
						},
						iconImage: {
							name: 'brxm:iconImage',
							displayName: 'brxm:iconImage',
							title: '',
							link: '',
							imageBRE: null,
							imageDAM:
								'https://mohawk.scene7.com/is/image/MohawkResidential/Home-Assets%20Swatch%20(3)?scl=1',
							altText: '',
							contentType: 'brxm:ImageCompound',
						},
						linkCompound: {
							name: 'brxm:LinkCompound',
							displayName: 'brxm:LinkCompound',
							link: null,
							alignment: null,
							url: '',
							text: 'Shop Products',
							button: 'primary',
							iconStroke: null,
							iconStyle: null,
							icon: null,
							target: null,
							contentType: 'brxm:LinkCompound',
						},
						contentType: 'brxm:CategorySlideItemCompound',
					},
					{
						name: 'brxm:CategorySlideItemCompound',
						displayName: 'brxm:CategorySlideItemCompound',
						title: 'Living Room',
						description: 'Shop our selected flooring options for Living Rooms',
						heroImage: {
							name: 'brxm:heroImage',
							displayName: 'brxm:heroImage',
							title: 'fourth',
							link: '',
							imageBRE: null,
							imageDAM:
								'https://mohawk.scene7.com/is/image/MohawkResidential/Home-Assets%20(6)?scl=3',
							altText: '',
							contentType: 'brxm:ImageCompound',
						},
						iconImage: {
							name: 'brxm:iconImage',
							displayName: 'brxm:iconImage',
							title: '',
							link: '',
							imageBRE: null,
							imageDAM:
								'https://mohawk.scene7.com/is/image/MohawkResidential/Home-Assets%20Swatch%20(2)?scl=1',
							altText: '',
							contentType: 'brxm:ImageCompound',
						},
						linkCompound: {
							name: 'brxm:LinkCompound',
							displayName: 'brxm:LinkCompound',
							link: null,
							alignment: null,
							url: '',
							text: 'Shop Products',
							button: 'primary',
							iconStroke: null,
							iconStyle: null,
							icon: null,
							target: null,
							contentType: 'brxm:LinkCompound',
						},
						contentType: 'brxm:CategorySlideItemCompound',
					},
				],
				tabImage: {
					name: 'brxm:tabImage',
					displayName: 'brxm:tabImage',
					title: '',
					link: '',
					imageBRE: null,
					imageDAM:
						'https://mohawk.scene7.com/is/image/MohawkResidential/Home-Assets%20(6)?scl=1&sharp=1',
					altText: '',
					contentType: 'brxm:ImageCompound',
				},
				contentType: 'brxm:CategorySlideCompound',
			},
			{
				name: 'brxm:CategorySlideCompound',
				displayName: 'brxm:CategorySlideCompound',
				description: 'Shop Features Important To You',
				tabTitle: 'Shop by Feature',
				categorySlideItemCompound: [
					{
						name: 'brxm:CategorySlideItemCompound',
						displayName: 'brxm:CategorySlideItemCompound',
						title: 'Shop Waterproof',
						description: 'Waterproof to protect against all accidents.',
						heroImage: {
							name: 'brxm:heroImage',
							displayName: 'brxm:heroImage',
							title: '',
							link: '',
							imageBRE: null,
							imageDAM:
								'https://mohawk.scene7.com/is/image/MohawkResidential/Home-Assets%20(6)?scl=3',
							altText: '',
							contentType: 'brxm:ImageCompound',
						},
						iconImage: {
							name: 'brxm:iconImage',
							displayName: 'brxm:iconImage',
							title: 'first',
							link: '',
							imageBRE: null,
							imageDAM:
								'https://mohawk.scene7.com/is/image/MohawkResidential/Home-Assets%20Swatch%20(3)?scl=1',
							altText: '',
							contentType: 'brxm:ImageCompound',
						},
						linkCompound: {
							name: 'brxm:LinkCompound',
							displayName: 'brxm:LinkCompound',
							link: null,
							alignment: null,
							url: '',
							text: 'Shop Products',
							button: 'primary',
							iconStroke: null,
							iconStyle: null,
							icon: null,
							target: null,
							contentType: 'brxm:LinkCompound',
						},
						contentType: 'brxm:CategorySlideItemCompound',
					},
					{
						name: 'brxm:CategorySlideItemCompound',
						displayName: 'brxm:CategorySlideItemCompound',
						title: 'Shop Scratchproof',
						description: 'Waterproof to protect against all accidents.',
						heroImage: {
							name: 'brxm:heroImage',
							displayName: 'brxm:heroImage',
							title: '',
							link: '',
							imageBRE: null,
							imageDAM:
								'https://mohawk.scene7.com/is/image/MohawkResidential/Home-Assets%20(8)?scl=1&sharp=1',
							altText: '',
							contentType: 'brxm:ImageCompound',
						},
						iconImage: {
							name: 'brxm:iconImage',
							displayName: 'brxm:iconImage',
							title: '',
							link: '',
							imageBRE: null,
							imageDAM:
								'https://mohawk.scene7.com/is/image/MohawkResidential/Home-Assets%20Swatch%20(3)?scl=1',
							altText: '',
							contentType: 'brxm:ImageCompound',
						},
						linkCompound: {
							name: 'brxm:LinkCompound',
							displayName: 'brxm:LinkCompound',
							link: null,
							alignment: null,
							url: '',
							text: 'Shop Products',
							button: 'primary',
							iconStroke: null,
							iconStyle: null,
							icon: null,
							target: null,
							contentType: 'brxm:LinkCompound',
						},
						contentType: 'brxm:CategorySlideItemCompound',
					},
					{
						name: 'brxm:CategorySlideItemCompound',
						displayName: 'brxm:CategorySlideItemCompound',
						title: 'Shop Stainproof',
						description: 'Waterproof to protect against all accidents.',
						heroImage: {
							name: 'brxm:heroImage',
							displayName: 'brxm:heroImage',
							title: '',
							link: '',
							imageBRE: null,
							imageDAM: '',
							altText: '',
							contentType: 'brxm:ImageCompound',
						},
						iconImage: {
							name: 'brxm:iconImage',
							displayName: 'brxm:iconImage',
							title: '',
							link: '',
							imageBRE: null,
							imageDAM:
								'https://mohawk.scene7.com/is/image/MohawkResidential/Home-Assets%20Swatch%20(3)?scl=1',
							altText: '',
							contentType: 'brxm:ImageCompound',
						},
						linkCompound: {
							name: 'brxm:LinkCompound',
							displayName: 'brxm:LinkCompound',
							link: null,
							alignment: null,
							url: '',
							text: 'Shop Products',
							button: 'primary',
							iconStroke: null,
							iconStyle: null,
							icon: null,
							target: null,
							contentType: 'brxm:LinkCompound',
						},
						contentType: 'brxm:CategorySlideItemCompound',
					},
				],
				tabImage: {
					name: 'brxm:tabImage',
					displayName: 'brxm:tabImage',
					title: '',
					link: '',
					imageBRE: null,
					imageDAM:
						'https://s7d4.scene7.com/is/image/MohawkResidential/Home-Assets%20(12)?scl=5&wid=1100&hei=682&op_sharpen=1&align=0,.99',
					altText: '',
					contentType: 'brxm:ImageCompound',
				},
				contentType: 'brxm:CategorySlideCompound',
			},
			{
				name: 'brxm:CategorySlideCompound',
				displayName: 'brxm:CategorySlideCompound',
				description: 'Mohawk Offers Looks For Every Room',
				tabTitle: 'Shop by Product Line',
				categorySlideItemCompound: [
					{
						name: 'brxm:CategorySlideItemCompound',
						displayName: 'brxm:CategorySlideItemCompound',
						title: 'Shop Carpet Looks',
						description: 'The softest and most family friendly.',
						heroImage: {
							name: 'brxm:heroImage',
							displayName: 'brxm:heroImage',
							title: '',
							link: '',
							imageBRE: null,
							imageDAM:
								'https://mohawk.scene7.com/is/image/MohawkResidential/Home-Assets%20Swatch%20(2)?scl=1',
							altText: '',
							contentType: 'brxm:ImageCompound',
						},
						iconImage: {
							name: 'brxm:iconImage',
							displayName: 'brxm:iconImage',
							title: '',
							link: '',
							imageBRE: null,
							imageDAM:
								'https://mohawk.scene7.com/is/image/MohawkResidential/Home-Assets%20Swatch%20(2)?scl=1',
							altText: '',
							contentType: 'brxm:ImageCompound',
						},
						linkCompound: {
							name: 'brxm:LinkCompound',
							displayName: 'brxm:LinkCompound',
							link: null,
							alignment: null,
							url: '',
							text: 'Shop Products',
							button: 'primary',
							iconStroke: null,
							iconStyle: null,
							icon: null,
							target: null,
							contentType: 'brxm:LinkCompound',
						},
						contentType: 'brxm:CategorySlideItemCompound',
					},
				],
				tabImage: {
					name: 'brxm:tabImage',
					displayName: 'brxm:tabImage',
					title: '',
					link: '',
					imageBRE: null,
					imageDAM:
						'https://s7d4.scene7.com/is/image/MohawkResidential/Home-Assets%20(19)?scl=5&wid=1000&hei=682&op_sharpen=1&align=0,.5',
					altText: '',
					contentType: 'brxm:ImageCompound',
				},
				contentType: 'brxm:CategorySlideCompound',
			},
		],
		localeString: 'en',
		contentType: 'brxm:CategoryListingDocument',
	};
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ShopByCategoryComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ShopByCategoryComponent);
		component = fixture.componentInstance;
		component.content = contentMock;
		component.content$.next(contentMock);
		fixture.detectChanges();
	});

	it('should create Shop By Category Component', () => {
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
	it('Should display header name is Shop by category', () => {
		const layoutWrapper: any = fixture.debugElement.query(By.css('.heading'));
		fixture.detectChanges();
		expect(layoutWrapper.nativeNode.innerText).toEqual('Shop by category');
	});
	it('Should render default tab image when it is loaded', () => {
		const layoutWrapper: any = fixture.debugElement.query(By.css('#image'));
		fixture.detectChanges();
		expect(layoutWrapper.nativeNode.src).toEqual(
			'https://mohawk.scene7.com/is/image/MohawkResidential/Home-Assets%20(6)?scl=1&sharp=1'
		);
		expect(layoutWrapper.nativeNode.localName).toEqual('img');
	});

	it('Should render all Categories', () => {
		const categories = fixture.debugElement.queryAll(By.css('.item'));
		fixture.detectChanges();
		// expect(categories.length).toBe(3);
		expect(categories[0].nativeNode.children[0].innerText).toEqual(
			'Shop by Room'
		);
		expect(categories[1].nativeNode.children[0].innerText).toEqual(
			'Shop by Feature'
		);
		expect(categories[2].nativeNode.children[0].innerText).toEqual(
			'Shop by Product Line'
		);
	});

	it('Should active shop by room tab', () => {
		const categories = fixture.debugElement.queryAll(By.css('.item'));
		fixture.detectChanges();
		expect(categories[0].nativeNode.children[0].className).toEqual('active');
	});

	it('Should display selected tab description', () => {
		const categories = fixture.debugElement.queryAll(
			By.css('.category-container')
		);
		fixture.detectChanges();
		expect(categories[0].nativeNode.className).toContain('active-category');
		expect(categories[0].nativeNode.children[0].innerText).toEqual(
			'Shop For A Specific Room Type'
		);
	});
	it('Should load sub tabs of selected tab', () => {
		component.isMobile = false;
		component.activeCategory = 0;
		fixture.detectChanges();
		const subTabs = fixture.debugElement.queryAll(By.css('.tab-content'));
		fixture.detectChanges();
		expect(subTabs.length).toEqual(8);
	});
	it('Should load swiper when it is mobile view', () => {
		component.isMobile = true;
		component.activeCategory = 0;
		fixture.detectChanges();
		const swiper = fixture.debugElement.query(By.css('#swiper'));
		fixture.detectChanges();
		expect(swiper.nativeNode.localName).toEqual('swiper');
	});
});
