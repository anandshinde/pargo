import { Component, OnInit, EventEmitter, Input, Output,OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SimpleComponent } from '@app/shared/base-classes';
import { GalleryFormSelectProps } from '@app/shared/interfaces';
@Component({
	selector: 'mflooring-gallery-filters-desktop',
	templateUrl: './gallery-filters-desktop.component.html',
	styleUrls: ['./gallery-filters-desktop.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalleryFiltersDesktopComponent extends SimpleComponent<
	GalleryFormSelectProps[],
	any
> {
	// constructor() { }
	@Input() form: FormGroup;
	@Output() chipRemoved = new EventEmitter<any>();
	onChipRemoved(item: any): void {
		this.chipRemoved.emit(item);
	}
}