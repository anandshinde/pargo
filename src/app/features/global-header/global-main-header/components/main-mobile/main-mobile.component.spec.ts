import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { RouterTestingModule } from '@angular/router/testing';
import { MenuItemComponent } from '@app/shared/components';
import { SharedModule } from '@app/shared/shared.module';
import { MockComponents, MockModule } from 'ng-mocks';
import { MainMobileComponent } from './main-mobile.component';

describe('MainMobileComponent', () => {
	let component: MainMobileComponent;
	let fixture: ComponentFixture<MainMobileComponent>;
	const menuItemsMock = [
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
	];

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [MainMobileComponent, MockComponents(MenuItemComponent)],
			imports: [
				MockModule(SharedModule),
				MockModule(MatMenuModule),
				RouterTestingModule,
				MatDialogModule,
			],
			schemas: [CUSTOM_ELEMENTS_SCHEMA],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(MainMobileComponent);
		component = fixture.componentInstance;
		component.menuItems = menuItemsMock;

		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('Should return "name" attribute after #trackBy', () => {
		const mockObject = { name: 'mockName' };

		expect(component.trackBy(0, mockObject)).toBe('mockName');
	});

	it('Should "isMenuOpened" change when #menuOpened', () => {
		component.isMenuOpened = false;
		component.menuOpened(true);

		expect(component.isMenuOpened).toBeTruthy();
	});
});
