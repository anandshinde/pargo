import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BasicSizes, ThemeTypes } from '@shared/constants';
import { SimpleComponent } from '@shared/base-classes';

@Component({
	selector: 'mflooring-four-column-compound',
	templateUrl: './four-column-compound.component.html',
	styleUrls: ['./four-column-compound.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FourColumnCompoundComponent
	extends SimpleComponent<any, any>
	implements OnInit
{
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
