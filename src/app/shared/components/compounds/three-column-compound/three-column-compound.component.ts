import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

// APP IMPORTS
import { SimpleComponent } from '@app/shared/base-classes/simple-component.base';
import { BasicSizes, ThemeTypes } from '@app/shared/constants';
import { ThreeColumnCompoundPresentationProps } from '@app/shared/interfaces';

@Component({
	selector: 'mflooring-three-column-compound',
	templateUrl: './three-column-compound.component.html',
	styleUrls: ['./three-column-compound.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThreeColumnCompoundComponent
	extends SimpleComponent<any, ThreeColumnCompoundPresentationProps>
	implements OnInit {
	private theme: string;

	public themeClass: string;

	public vertMarginClass: string;

	public title: any;

	public description: any;

	constructor() {
		super();
	}

	ngOnInit(): void {
		this.title = this.content?.title?.content || null;
		this.description = this.content?.description?.content || null;

		this.theme = this.presentation?.theme || ThemeTypes.light;
		this.themeClass = `theme-${this.theme}`;
		this.vertMarginClass = `margin-${
			this.presentation?.vertMargin || BasicSizes.large
		}`;
	}
}
