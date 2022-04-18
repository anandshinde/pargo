import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '@app/shared/shared.module';
import { MockModule } from 'ng-mocks';
import { UtilityDesktopComponent } from './utility-desktop.component';

describe('UtilityDesktopComponent', () => {
	let component: UtilityDesktopComponent;
	let fixture: ComponentFixture<UtilityDesktopComponent>;
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
			declarations: [UtilityDesktopComponent],
			imports: [MockModule(SharedModule), RouterTestingModule],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(UtilityDesktopComponent);
		component = fixture.componentInstance;
		component.menu = menuMock;
		component.page = jasmine.createSpyObj('pageSpy', ['getUrl']);
		spyOn(component.closeMenu, 'emit');
		spyOn(component.openMenu, 'emit');

		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('Should emit "closeMenu" after #onCloseMenu', () => {
		component.onCloseMenu();
		expect(component.closeMenu.emit).toHaveBeenCalledWith(null);
	});

	it('Should emit "openMenu" after #onOpenMenu', () => {
		const indexMock = 1;
		component.onOpenMenu(indexMock);

		expect(component.openMenu.emit).toHaveBeenCalledWith(indexMock);
	});
	it('Should render provided menu items', () => {
		const menuItems = fixture.debugElement.queryAll(
			By.css('.menu-utility__item')
		);
		fixture.detectChanges();
		expect(menuItems.length).toBe(2);
	});
});
