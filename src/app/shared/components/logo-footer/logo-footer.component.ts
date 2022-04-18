import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SimpleComponent } from '@shared/base-classes';
import { LogoContentProps, LogoPresentationProps } from '@shared/interfaces';

@Component({
	selector: 'mflooring-logo-footer',
	templateUrl: './logo-footer.component.html',
	styleUrls: ['./logo-footer.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogoFooterComponent
	extends SimpleComponent<LogoContentProps, LogoPresentationProps>
	implements OnInit
{
	public themeClass;
	public altText;

	constructor() {
		super();
	}

	ngOnInit(): void {
		this.themeClass = `theme-${this.presentation?.theme}`;
		this.altText = this.content?.altText || '';
	}
}
