import {
	Component,
	OnInit,
	ChangeDetectionStrategy,
	Input,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SimpleComponent } from '@app/shared/base-classes';
import {
	GalleryFormExpansionPresentation,
	GalleryFormExpansionProps,
} from '@app/shared/interfaces';
@Component({
	selector: 'mflooring-gallery-form-expansion',
	templateUrl: './gallery-form-expansion.component.html',
	styleUrls: ['./gallery-form-expansion.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalleryFormExpansionComponent extends SimpleComponent<
	GalleryFormExpansionProps[],
	GalleryFormExpansionPresentation
> {
	// constructor() { }
	@Input() form: FormGroup;
	get panelHeaderHeight(): string {
		return this.presentation?.panelHeaderHeight || '44px';
	}

	trackBy(index: number, item: any): string {
		return item.formControlName;
	}

	get orientationClass() {
		return this.presentation?.orientation || 'mat-accordion--column';
	}
}
