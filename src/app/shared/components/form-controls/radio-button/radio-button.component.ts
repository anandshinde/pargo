import {
	ChangeDetectionStrategy,
	Component,
	Input,
	OnInit,
} from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { SimpleComponent } from '@app/shared/base-classes';
import {
	RadioButtonContentProps,
	RadioButtonPresentationProps,
} from '@app/shared/interfaces';

@Component({
	selector: 'mflooring-radio-button',
	templateUrl: './radio-button.component.html',
	styleUrls: ['./radio-button.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioButtonComponent extends SimpleComponent<
	RadioButtonContentProps[],
	RadioButtonPresentationProps
> {
	@Input() control: AbstractControl;

	trackBy(index: number, el: any): number {
		return el.value;
	}

	get orientationClass(): string {
		return this.presentation?.orientation || 'radio-group--column';
	}
}
