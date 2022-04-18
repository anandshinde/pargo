import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SimpleComponent } from '@shared/base-classes';

@Component({
	selector: 'mflooring-trend-collection-item',
	templateUrl: './trend-collection-item.component.html',
	styleUrls: ['./trend-collection-item.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrendCollectionItemComponent extends SimpleComponent<any, any> {
	constructor() {
		super();
	}
}
