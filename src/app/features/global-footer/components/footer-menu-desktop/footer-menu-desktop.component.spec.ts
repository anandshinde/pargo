import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterMenuDesktopComponent } from './footer-menu-desktop.component';
import { MockComponents } from 'ng-mocks';
import { LogoComponent, MenuItemComponent } from '@shared/components';
import { By } from '@angular/platform-browser';

describe('FooterMenuDesktopComponent', () => {
	let component: FooterMenuDesktopComponent;
	let fixture: ComponentFixture<FooterMenuDesktopComponent>;
	const footerDataMock = {
		logo: {
			altText: 'Mflooring Logo',
		},
		copyright: 'Copyright 2020',
		privacyPolicy: {
			label: 'Privacy Policy',
			url: 'https://na.mflooring.com/privacy',
		},
		search: {
			logo: 'search',
		},
		socialMedia: {
			twitter: {
				classname: 'twitter',
				url: 'https://twitter.com/mflooring',
			},
			facebook: {
				classname: 'facebook',
				url: 'https://www.facebook.com/mflooring',
			},
			youtube: {
				classname: 'youtube',
				url: 'https://www.youtube.com/user/mflooringFloors?sub_confirmation=1',
			},
			pinterest: {
				classname: 'pinterest',
				url: 'https://www.pinterest.com/genuinemflooring/',
			},
			houzz: {
				classname: 'houzz',
				url: 'https://www.houzz.com/hznb/professionals/carpet-dealers/mflooring-pfvwgb-pf~1796233034?',
			},
		},
	};
	const menuMock = {
		name: 'header-utility-menu',
		siteMenuItems: [
			{
				depth: 0,
				repositoryBased: false,
				properties: {
					'hst:referencesitemapitem': 'root',
				},
				name: 'MOHAWK',
				childMenuItems: [
					{
						depth: 0,
						repositoryBased: false,
						properties: {
							'hst:referencesitemapitem': 'demo-1',
							'hst:repobased': false,
						},
						name: 'Perdo',
						childMenuItems: [],
						parameters: {},
						_links: {
							site: {
								href: '/site/pe/demo-1',
								type: 'internal',
							},
						},
					},
				],
				parameters: {},
				_links: {
					site: {
						href: '/site/pe',
						type: 'internal',
					},
				},
			},
			{
				depth: 0,
				repositoryBased: false,
				properties: {
					'hst:referencesitemapitem': 'news',
				},
				name: 'KARASTAN',
				childMenuItems: [],
				parameters: {},
				_links: {
					site: {
						href: '/site/pe/news',
						type: 'internal',
					},
				},
			},
		],
		_meta: {},
	};

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [
				FooterMenuDesktopComponent,
				MockComponents(LogoComponent, MenuItemComponent),
			],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(FooterMenuDesktopComponent);
		component = fixture.componentInstance;
		component.footerData = footerDataMock;
		component.menu = menuMock;

		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
	it('Should render Menu Items', () => {
		const menuItems = fixture.debugElement.queryAll(
			By.css('.footer__menu__title')
		);
		fixture.detectChanges();
		expect(menuItems.length).toBe(2);
		expect(menuItems[0].nativeNode.innerText).toEqual('MOHAWK');
	});
	it('Should render sub Menu Item', () => {
		const subMenuName: any = fixture.debugElement.query(
			By.css('#subMenuItem-0-0')
		);
		fixture.detectChanges();
		expect(subMenuName.nativeNode.innerText).toEqual('Perdo');
	});
});
