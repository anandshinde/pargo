import {
	ChangeDetectionStrategy,
	Component,
	Input,
	OnInit,
} from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { SimpleComponent } from '@app/shared/base-classes';

@Component({
	selector: 'mflooring-checkbox',
	templateUrl: './checkbox.component.html',
	styleUrls: ['./checkbox.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxComponent extends SimpleComponent<any, any> {
	@Input() control: AbstractControl;
}
