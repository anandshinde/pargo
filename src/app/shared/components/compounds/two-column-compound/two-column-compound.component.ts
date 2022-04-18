import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

// APP IMPORTS
import { BasicSizes, ThemeTypes, TwoColumnRatios } from '@app/shared/constants';
import { SimpleComponent } from '@app/shared/base-classes';
import { TwoColumnCompoundPresentationProps } from '@app/shared/interfaces';

@Component({
	selector: 'mflooring-two-column-compound',
	templateUrl: './two-column-compound.component.html',
	styleUrls: ['./two-column-compound.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TwoColumnCompoundComponent
	extends SimpleComponent<null, TwoColumnCompoundPresentationProps>
	implements OnInit
{
	private theme: string;
	public themeClass: string;
	public columnRatioClass: string;
	public vertMarginClass: string;
	public hasBorder: boolean;

	ngOnInit(): void {
		const { theme, ratio, vertMargin } = this.presentation;
		this.theme = theme || ThemeTypes.light;
		this.themeClass = `theme-${this.theme}`;
		this.columnRatioClass = TwoColumnRatios[ratio] || TwoColumnRatios[5050];
		this.vertMarginClass = `margin-${vertMargin || BasicSizes.large}`;
		this.hasBorder = this.presentation?.border || false;
	}
}
