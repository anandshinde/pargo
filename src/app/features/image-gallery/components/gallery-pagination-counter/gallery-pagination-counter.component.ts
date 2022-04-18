import { Component, OnInit, ChangeDetectionStrategy,OnChanges } from '@angular/core';
import { SimpleComponent } from '@app/shared/base-classes';
@Component({
	selector: 'mflooring-gallery-pagination-counter',
	templateUrl: './gallery-pagination-counter.component.html',
	styleUrls: ['./gallery-pagination-counter.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalleryPaginationCounterComponent extends SimpleComponent<
	any,
	any
> {
	constructor() {
		super();
	}
}
