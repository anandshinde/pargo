import {
	ChangeDetectionStrategy,
	Component,
	Inject,
	Input,
	OnInit,
} from '@angular/core';
import { Component as Page } from '@bloomreach/spa-sdk';
import { ThemeTypes } from '@shared/constants';
import { Eventservice } from '@app/core/services/events.service';
import { WINDOW } from '@shared/utilities/window';
@Component({
	selector: 'mflooring-footer-menu-desktop',
	templateUrl: './footer-menu-desktop.component.html',
	styleUrls: ['./footer-menu-desktop.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterMenuDesktopComponent {
	@Input() menu: any;
	@Input() page: Page;
	@Input() footerData: any;
	constructor(
		public eventservice: Eventservice,
		@Inject(WINDOW) readonly windowRef: Window
	) {}
	get themeClass() {
		return `theme-${ThemeTypes.dark}`;
	}

	get socialIcons(): any[] {
		return (
			!!this.footerData?.socialMedia &&
			Object.entries(this.footerData?.socialMedia)
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

	get logoContent() {
		return this.footerData?.logo;
	}

	get logoPresentation() {
		return {
			theme: ThemeTypes.dark,
		};
	}

	public trackBy(index: number, el: any) {
		return el.name;
	}
}
