import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Component as Page } from '@bloomreach/spa-sdk';
import { ThemeTypes } from '@shared/constants';

@Component({
	selector: 'mflooring-footer-menu-mobile',
	templateUrl: './footer-menu-mobile.component.html',
	styleUrls: ['./footer-menu-mobile.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterMenuMobileComponent {
	@Input() menu: any;
	@Input() page: Page;
	@Input() footerData: any;

	get theme() {
		return ThemeTypes.dark;
	}

	get socialIcons(): any[] {
		return (
			!!this.footerData?.socialMedia &&
			Object.entries(this.footerData.socialMedia)
				.map((entry: any) => {
					return {
						name: entry[1].classname,
						imgUrl: entry[1].imgUrl,
						url: entry[1].url,
						order: entry[1].order,
					};
				})
				.sort((a: any, b: any) => {
					return a.order - b.order;
				})
		);
	}

	get logoPresentation() {
		return {
			theme: this.theme,
		};
	}

	get logoContent() {
		return this.footerData.logo;
	}

	public trackBy(index: number, el: any) {
		return el.name;
	}
}
