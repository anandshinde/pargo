import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
	MainDesktopComponent,
	MainMobileComponent,
} from '@features/global-header/global-main-header/components';
import { LayoutWrapperComponent } from '@shared/components';
import { MockComponents, MockModule } from 'ng-mocks';
import { GlobalMainHeaderComponent } from './global-main-header.component';
import { SharedModule } from '@shared/shared.module';
import { BrManageMenuButtonDirective } from '@bloomreach/ng-sdk';

describe('GlobalMainHeaderComponent', () => {
	let component: GlobalMainHeaderComponent;
	let fixture: ComponentFixture<GlobalMainHeaderComponent>;
	const menuMock = {
		name: 'header-main-menu',
		siteMenuItems: [
			{
				depth: 0,
				repositoryBased: false,
				properties: {
					'hst:repobased': false,
				},
				name: 'DISCOVER',
				childMenuItems: [
					{
						depth: 0,
						repositoryBased: false,
						properties: {
							'hst:externallink': 'https://google.com',
							'hst:repobased': false,
						},
						name: 'Trends',
						childMenuItems: [],
						parameters: {},
						_links: {
							site: {
								href: 'https://google.com',
								type: 'external',
							},
						},
					},
					{
						depth: 0,
						repositoryBased: false,
						properties: {
							'hst:repobased': false,
						},
						name: 'Visualizer',
						childMenuItems: [],
						parameters: {},
						_links: {},
					},
					{
						depth: 0,
						repositoryBased: false,
						properties: {
							'hst:repobased': false,
						},
						name: 'Image Gallery',
						childMenuItems: [],
						parameters: {},
						_links: {},
					},
					{
						depth: 0,
						repositoryBased: false,
						properties: {
							'hst:externallink': 'https://www.amazon.com/',
							'hst:repobased': false,
						},
						name: 'Blog',
						childMenuItems: [],
						parameters: {},
						_links: {
							site: {
								href: 'https://www.amazon.com/',
								type: 'external',
							},
						},
					},
				],
				parameters: {},
				_links: {},
			},
			{
				depth: 0,
				repositoryBased: false,
				properties: {
					'hst:repobased': false,
				},
				name: 'SHOP',
				childMenuItems: [
					{
						depth: 0,
						repositoryBased: false,
						properties: {
							'hst:externallink': 'https://google.com',
							'hst:repobased': false,
						},
						name: 'Floor Finder Quiz',
						childMenuItems: [],
						parameters: {},
						_links: {
							site: {
								href: 'https://google.com',
								type: 'external',
							},
						},
					},
					{
						depth: 0,
						repositoryBased: false,
						properties: {
							'hst:repobased': false,
						},
						name: 'Shop by Flooring Type',
						childMenuItems: [
							{
								depth: 0,
								repositoryBased: false,
								properties: {
									'hst:externallink': 'https://google.com',
									'hst:repobased': false,
								},
								name: 'Laminate',
								childMenuItems: [],
								parameters: {},
								_links: {
									site: {
										href: 'https://google.com',
										type: 'external',
									},
								},
							},
							{
								depth: 0,
								repositoryBased: false,
								properties: {
									'hst:externallink': 'https://yahoo.es',
									'hst:repobased': false,
								},
								name: 'Hardwood',
								childMenuItems: [],
								parameters: {},
								_links: {
									site: {
										href: 'https://yahoo.es',
										type: 'external',
									},
								},
							},
							{
								depth: 0,
								repositoryBased: false,
								properties: {
									'hst:externallink': 'https://www.amazon.com/',
									'hst:repobased': false,
								},
								name: 'Rigid Vinyl',
								childMenuItems: [],
								parameters: {},
								_links: {
									site: {
										href: 'https://www.amazon.com/',
										type: 'external',
									},
								},
							},
						],
						parameters: {},
						_links: {},
					},
					{
						depth: 0,
						repositoryBased: false,
						properties: {
							'hst:repobased': false,
						},
						name: 'Shop by Feature',
						childMenuItems: [
							{
								depth: 0,
								repositoryBased: false,
								properties: {
									'hst:externallink': 'https://google.com',
									'hst:repobased': false,
								},
								name: 'Waterproof',
								childMenuItems: [],
								parameters: {},
								_links: {
									site: {
										href: 'https://google.com',
										type: 'external',
									},
								},
							},
							{
								depth: 0,
								repositoryBased: false,
								properties: {
									'hst:externallink': 'https://google.com',
									'hst:repobased': false,
								},
								name: 'Easy DIY',
								childMenuItems: [],
								parameters: {},
								_links: {
									site: {
										href: 'https://google.com',
										type: 'external',
									},
								},
							},
						],
						parameters: {},
						_links: {},
					},
				],
				parameters: {},
				_links: {},
			},
			{
				depth: 0,
				repositoryBased: false,
				properties: {
					'hst:referencesitemapitem': 'root',
					'hst:repobased': false,
				},
				name: 'HOME',
				childMenuItems: [],
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
					'hst:repobased': false,
				},
				name: 'INSTALL & DIY',
				childMenuItems: [],
				parameters: {},
				_links: {},
			},
			{
				depth: 0,
				repositoryBased: false,
				properties: {
					'hst:repobased': false,
				},
				name: 'CLEANING & CARE',
				childMenuItems: [],
				parameters: {},
				_links: {},
			},
		],
		_meta: {},
	};
	const resourceBundleDataMock = {
		search: 'https://google.com?q=mflooring',
		'mflooring.search-icon': 'search',
		'mflooring.logo.alt': 'mflooring Logo',
	};

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [
				GlobalMainHeaderComponent,
				MockComponents(
					MainDesktopComponent,
					MainMobileComponent,
					BrManageMenuButtonDirective
				),
			],
			imports: [MockModule(SharedModule)],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(GlobalMainHeaderComponent);
		component = fixture.componentInstance;
		spyOnProperty(component, 'menu').and.returnValue(menuMock);
		// spyOnProperty(component, 'resourceBundleData').and.returnValue(
		// 	resourceBundleDataMock
		// );

		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('Should #onWindowScroll be triggered after scrolling', () => {
		window.dispatchEvent(new Event('scroll'));

		expect(component.isNavFixed).toBeFalsy();
	});
});
