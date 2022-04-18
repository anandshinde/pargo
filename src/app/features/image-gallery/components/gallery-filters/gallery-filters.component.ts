import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SimpleComponent } from '@app/shared/base-classes';
import { GalleryFiltersProps } from '@app/shared/interfaces';
@Component({
	selector: 'mflooring-gallery-filters',
	templateUrl: './gallery-filters.component.html',
	styleUrls: ['./gallery-filters.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalleryFiltersComponent extends SimpleComponent<
	GalleryFiltersProps,
	any
> {
	constructor() {
		super();
	}

	get filterLabel() {
		return this.content || '';
	}
}
