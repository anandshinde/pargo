import {
	Component,
	OnInit,
	EventEmitter,
	Input,
	Output,
	ChangeDetectionStrategy,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SimpleComponent } from '@app/shared/base-classes';
import { GalleryFormSelectProps } from '@app/shared/interfaces';
@Component({
	selector: 'mflooring-gallery-filters-mobile',
	templateUrl: './gallery-filters-mobile.component.html',
	styleUrls: ['./gallery-filters-mobile.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalleryFiltersMobileComponent extends SimpleComponent<
	GalleryFormSelectProps[],
	any
> {
	@Input() form: FormGroup;
	@Output() hideSections = new EventEmitter<string>();
	@Output() resetForm = new EventEmitter<void>();

	public isFiltersOpened = false;

	onResetForm(): void {
		this.resetForm.emit();
	}

	onOpenFilters(): void {
		//this.isFiltersOpened = true;
		this.isFiltersOpened = ! this.isFiltersOpened;
		this.hideSections.emit('FILTER_OPENED_MOBILE');
	}

	onCloseFilters(): void {
		this.isFiltersOpened = false;

		this.hideSections.emit('');
	}
}
