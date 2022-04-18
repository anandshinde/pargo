import {
	Component,
	OnInit,
	Input,
	OnChanges,
	ChangeDetectionStrategy,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SimpleComponent } from '@app/shared/base-classes';
import { GalleryFormSelectProps } from '@app/shared/interfaces';
@Component({
	selector: 'mflooring-gallery-form-select',
	templateUrl: './gallery-form-select.component.html',
	styleUrls: ['./gallery-form-select.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalleryFormSelectComponent extends SimpleComponent<
	GalleryFormSelectProps[],
	any
> {
	// constructor() { }
	@Input() form: FormGroup;
	trackBy(index: number, item: any): string {
		return item.formControlName;
	}
}
