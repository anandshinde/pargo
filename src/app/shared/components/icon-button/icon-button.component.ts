import {
	ChangeDetectionStrategy,
	Component,
	OnChanges,
	SimpleChanges,
} from '@angular/core';

import { map } from 'rxjs/operators';
import { combineLatest, Observable } from 'rxjs';

import { IconButtonConfig } from '@shared/interfaces';
import { SimpleComponent } from '@shared/base-classes';

@Component({
	selector: 'mflooring-icon-button',
	templateUrl: './icon-button.component.html',
	styleUrls: ['./icon-button.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconButtonComponent
	extends SimpleComponent<null, IconButtonConfig>
	implements OnChanges
{
	public config$: Observable<any> = this.presentation$.pipe(
		map((config: any) => {
			return {
				typeClass: `type-${config?.type}`,
				sizeClass: `size-${config?.size || 'small'}`,
				backgroundClass : config?.isButton === true ? '' : 'no-background',
				dirClass: `direction-${config?.dir || 'right'}`,
				iconName:`${config?.iconName}`,
				iconUrl: `${config?.iconUrl}`
			};
		})
	);
	// public config$ = combineLatest([
	// 	this.content$,
	// 	this.presentation$,
	// ]).pipe(
	// 	map(([data, config]: [any | any, any]) => {
	// 		return {
	// 			typeClass: `type-${config?.type}`,
	// 			sizeClass: `size-${config?.size || 'small'}`,
	// 			dirClass: `direction-${config?.dir || 'right'}`,
	// 			iconName:`${data?.iconName}`
	// 		};
	// 	})
	// );

	constructor() {
		super();
	}

	ngOnChanges(changes: SimpleChanges) {
		super.ngOnChanges(changes);
	}
}
