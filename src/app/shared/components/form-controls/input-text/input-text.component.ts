import {
	ChangeDetectionStrategy,
	Component,
	Input,
	OnInit,
	ViewEncapsulation,
	ElementRef,
	ViewChild,
	HostListener,
} from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { SimpleComponent } from '@app/shared/base-classes';
import { InputTextTypes } from '@app/shared/constants';
import {
	InputTextContentProps,
	InputTextPresentationProps,
} from '@app/shared/interfaces';

@Component({
	selector: 'mflooring-input-text',
	templateUrl: './input-text.component.html',
	styleUrls: ['./input-text.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
})
export class InputTextComponent extends SimpleComponent<
	InputTextContentProps,
	InputTextPresentationProps
> {
	@ViewChild('input') input: ElementRef;
	@Input() control: AbstractControl;
	@Input() serverError;

	@HostListener('keyup', ['$event'])
	keyup(event: any) {
		this.onPhoneInput(event.target.value);
	}

	@HostListener('keyup.backspace', ['$event'])
	keyupBackspace(event: any) {
		this.onPhoneBackspace();
	}

	public onPhoneBackspace() {
		if (this.input.nativeElement.type !== 'tel') {
			return;
		}

		if (this.control.value.length < 6) {
			const newVal = this.control.value.substring(
				0,
				this.control.value.length - 1
			);

			this.control.setValue(newVal);
		}
	}

	public onPhoneInput(e: any) {
		if (this.input.nativeElement.type !== 'tel') {
			return;
		}

		let newVal = e.replace(/\D/g, '');

		if (newVal.length === 0) {
			newVal = '';
		} else if (newVal.length <= 3) {
			newVal = newVal.replace(/^(\d{0,3})/, '($1)');
		} else if (newVal.length <= 6) {
			newVal = newVal.replace(/^(\d{0,3})(\d{0,3})/, '($1) $2');
		} else if (newVal.length <= 10) {
			newVal = newVal.replace(/^(\d{0,3})(\d{0,3})(\d{0,4})/, '($1) $2-$3');
		} else {
			newVal = newVal.substring(0, 10);
			newVal = newVal.replace(/^(\d{0,3})(\d{0,3})(\d{0,4})/, '($1) $2-$3');
		}

		this.control.setValue(newVal);
	}

	get icon(): string {
		return this.content?.icon;
	}

	get hasIcon(): boolean {
		return !!this.presentation?.hasIcon;
	}

	get placeholder(): string {
		return this.content?.placeholder || '';
	}

	get typeClass(): string {
		return `input-text--${this.presentation?.type || InputTextTypes.form}`;
	}

	get name(): string {
		return this.content?.name || '';
	}

	get label(): string {
		return this.content?.label || '';
	}

	get typeFormControl() {
		return this.content?.type || 'text';
	}

	get iconPositionClass() {
		return this.presentation?.iconFirst ? 'icon-first' : '';
	}

	get maxlength(): string {
		return this.content?.maxlength || '';
	}

	focusInput() {
		this.input.nativeElement.focus();
	}
}
