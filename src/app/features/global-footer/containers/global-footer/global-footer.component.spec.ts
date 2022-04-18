import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatExpansionModule } from '@angular/material/expansion';
import { GlobalFooterComponent } from './global-footer.component';
import { MockComponents } from 'ng-mocks';
import { LayoutWrapperComponent } from '@shared/components';
import {
	FooterCopyrightComponent,
	FooterMenuMobileComponent,
	FooterMenuDesktopComponent,
} from '@features/global-footer/components';
import { BrManageMenuButtonDirective } from '@bloomreach/ng-sdk';
import { By } from '@angular/platform-browser';

describe('GlobalFooterComponent', () => {
	let component: GlobalFooterComponent;
	let fixture: ComponentFixture<GlobalFooterComponent>;
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
				GlobalFooterComponent,
				MockComponents(
					LayoutWrapperComponent,
					FooterMenuDesktopComponent,
					FooterCopyrightComponent,
					FooterMenuMobileComponent,
					BrManageMenuButtonDirective
				),
			],
			imports: [MatExpansionModule],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(GlobalFooterComponent);
		component = fixture.componentInstance;
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
	it('Should render copyright component', () => {
		const copyrightComp: any = fixture.debugElement.query(
			By.css('#copyrightComp')
		);
		fixture.detectChanges();
		expect(copyrightComp.nativeNode.localName).toEqual(
			'mflooring-footer-copyright'
		);
	});
});
