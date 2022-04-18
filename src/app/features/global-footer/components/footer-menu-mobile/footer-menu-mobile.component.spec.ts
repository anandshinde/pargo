import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterMenuMobileComponent } from './footer-menu-mobile.component';
import { MockComponents } from 'ng-mocks';
import { FooterInputTextComponent } from '@features/global-footer/components/footer-input-text/footer-input-text.component';
import { LogoComponent } from '@shared/components';
import { ExpansionMenuMobileComponent } from '@shared/components/expansion-menu-mobile/expansion-menu-mobile.component';
import { By } from '@angular/platform-browser';

describe('FooterMenuMobileComponent', () => {
	let component: FooterMenuMobileComponent;
	let fixture: ComponentFixture<FooterMenuMobileComponent>;
	const footerDataMock = {
		logo: {
			altText: 'Mflooring Logo',
		},
		copyright: 'Copyright 2020',
		privacyPolicy: {
			label: 'Privacy Policy',
			url: '/privacy',
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

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [
				FooterMenuMobileComponent,
				MockComponents(
					FooterInputTextComponent,
					LogoComponent,
					ExpansionMenuMobileComponent
				),
			],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(FooterMenuMobileComponent);
		component = fixture.componentInstance;
		component.footerData = footerDataMock;

		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
	it('Should render Logo', () => {
		const logo: any = fixture.debugElement.query(
			By.css('.footer-mobile__logo')
		);
		fixture.detectChanges();
		expect(logo.nativeNode.localName).toEqual('mflooring-logo');
	});
	it('Should render FOLLOW US', () => {
		const followUsLabel: any = fixture.debugElement.query(
			By.css('.footer-mobile__social__title')
		);
		fixture.detectChanges();
		expect(followUsLabel.nativeNode.innerText).toEqual('FOLLOW US');
	});

	it('Should render Social icons', () => {
		const socialIcons = fixture.debugElement.queryAll(
			By.css('.main-header-search--icon')
		);
		fixture.detectChanges();
		expect(socialIcons.length).toBe(5);
		socialIcons.forEach((item) => {
			expect(item.nativeNode.localName).toEqual('mflooring-icon-button');
		});
	});
});
