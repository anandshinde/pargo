import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SimpleComponent } from '@shared/base-classes';

export interface LoaderPresentationProps {
	size: 'large' | 'medium' | 'small';
}

@Component({
	selector: 'mflooring-loading',
	templateUrl: './loading.component.html',
	styleUrls: ['./loading.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingComponent extends SimpleComponent<
	any,
	LoaderPresentationProps
> {
	constructor() {
		super();
	}

	get size() {
		switch (this.presentation?.size || 'large') {
			case 'large':
				return 100;
			case 'medium':
				return 60;
			case 'small':
				return 20;
		}
	}
}
