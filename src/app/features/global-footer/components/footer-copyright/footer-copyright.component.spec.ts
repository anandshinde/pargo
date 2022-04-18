import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FooterCopyrightComponent } from './footer-copyright.component';

describe('FooterCopyrightComponent', () => {
	let component: FooterCopyrightComponent;
	let fixture: ComponentFixture<FooterCopyrightComponent>;
	const SocialContent = {
		socialMedia: [
			{
				name: 'facebook',
				imgUrl: '',
				url: 'https://www.facebook.com/mohawkflooring',
				order: 1,
			},
			{
				name: 'twitter',
				imgUrl: '',
				url: 'https://twitter.com/mohawkflooring',
				order: 2,
			},
			{
				name: 'instagram',
				imgUrl: '',
				url: 'https://www.instagram.com/pergofloors',
				order: 3,
			},
			{
				name: 'youtube',
				imgUrl: '',
				url: 'https://www.youtube.com/user/PergoFloors?sub_confirmation=1',
				order: 4,
			},
		],
		copyright: 'Mohawk Industries © Copyright 2021. All Rights Reserved',
		privacyPolicy: {
			url: '',
			label: 'Privacy Policy',
		},
	};
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [FooterCopyrightComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(FooterCopyrightComponent);
		component = fixture.componentInstance;
		component.content = SocialContent;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
	it('Should render Social icons', () => {
		const socialIcons = fixture.debugElement.queryAll(
			By.css('.main-header-search--icon')
		);
		fixture.detectChanges();
		expect(socialIcons.length).toBe(4);
		socialIcons.forEach((item) => {
			expect(item.nativeNode.localName).toEqual('mflooring-icon-button');
		});
	});
	it('should render copyright', () => {
		const copyright: any = fixture.debugElement.query(By.css('#copyright'));
		fixture.detectChanges();
		expect(copyright.nativeNode.innerText).toContain('Mohawk Industries');
	});
	it('should render All Retails Flooring Stores', () => {
		const flooring: any = fixture.debugElement.query(By.css('#flooring'));
		fixture.detectChanges();
		expect(flooring.nativeNode.innerText).toContain(
			'All Retails Flooring Stores'
		);
	});
	it('should render Terms of Use', () => {
		const terms: any = fixture.debugElement.query(By.css('#terms'));
		fixture.detectChanges();
		expect(terms.nativeNode.innerText).toContain('Terms of Use');
	});
});
