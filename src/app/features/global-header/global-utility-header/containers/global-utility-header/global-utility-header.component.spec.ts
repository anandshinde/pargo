import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from '@app/shared/shared.module';
import { Component } from '@bloomreach/spa-sdk';
import { MockComponents, MockModule } from 'ng-mocks';
import {
	UtilityActionsComponent,
	UtilityDesktopComponent,
	UtilityMobileComponent,
} from '../../components';
import { GlobalUtilityHeaderComponent } from './global-utility-header.component';
import { BrManageMenuButtonDirective } from '@bloomreach/ng-sdk';

describe('GlobalUtilityHeaderComponent', () => {
	let component: GlobalUtilityHeaderComponent;
	let fixture: ComponentFixture<GlobalUtilityHeaderComponent>;
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
	const componentMock = {
		getModels: () => ({
			menu: menuMock,
		}),
	} as Component;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [
				GlobalUtilityHeaderComponent,
				MockComponents(
					UtilityDesktopComponent,
					UtilityMobileComponent,
					UtilityActionsComponent,
					BrManageMenuButtonDirective
				),
			],
			imports: [MockModule(SharedModule)],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(GlobalUtilityHeaderComponent);
		component = fixture.componentInstance;
		component.component = componentMock;

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
