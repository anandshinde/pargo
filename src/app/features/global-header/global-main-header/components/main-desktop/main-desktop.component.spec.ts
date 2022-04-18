import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { LogoComponent, MenuItemComponent } from '@app/shared/components';
import { SharedModule } from '@app/shared/shared.module';
import { MockComponents, MockModule } from 'ng-mocks';
import { MainDesktopComponent } from './main-desktop.component';

describe('MainDesktopComponent', () => {
	let component: MainDesktopComponent;
	let fixture: ComponentFixture<MainDesktopComponent>;
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
	const mainHeaderDataMock = {
		logo: {
			alt: 'Mflooring Logo',
		},
		search: {
			icon: 'search',
		},
		hamburger: {
			icon: 'hamburger',
		},
		close: {
			icon: 'close',
		},
	};

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [
				MainDesktopComponent,
				MockComponents(MenuItemComponent, LogoComponent),
			],
			imports: [
				MockModule(SharedModule),
				CommonModule,
				RouterTestingModule,
				MatDialogModule,
			],
			schemas: [CUSTOM_ELEMENTS_SCHEMA],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(MainDesktopComponent);
		component = fixture.componentInstance;
		component.mainHeaderData = mainHeaderDataMock;
		component.menuItems = menuItemsMock;

		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('Should "openedMenu" change its value after #openMenu', () => {
		const indexMock = 1;
		component.openMenu(indexMock);

		expect(component.openedMenu).toBe(indexMock);
	});

	it('Should "openedMenu" change its value to "null" after #openMenu if it was opened previously', () => {
		const indexMock = 1;
		component.openedMenu = indexMock;
		component.openMenu(indexMock);

		expect(component.openedMenu).toBe(null);
	});

	it('Should "openedMenu" change its value after #closeMenu', () => {
		component.closeMenu();

		expect(component.openedMenu).toBe(null);
	});
});
