import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ThemeTypes } from '@app/shared/constants';

import { SimpleComponent } from '@shared/base-classes';
import {
	FooterCopyrightContentProps,
	FooterCopyrightPresentationProps,
} from '@shared/interfaces';

@Component({
	selector: 'mflooring-footer-copyright',
	templateUrl: './footer-copyright.component.html',
	styleUrls: ['./footer-copyright.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterCopyrightComponent extends SimpleComponent<
	FooterCopyrightContentProps,
	FooterCopyrightPresentationProps
> {
	get themeClass() {
		return `theme-${ThemeTypes.dark}`;
	}
	get copyright() {
		return this.content?.copyright || null;
	}

	get privacyPolicy() {
		return this.content?.privacyPolicy;
	}

	// get themeClass() {
	// 	return `theme-${this.presentation.theme}`;
	// }
	get socialIcons(): any[] {
		return (
			!!this.content?.socialMedia &&
			Object.entries(this.content?.socialMedia)
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
}
