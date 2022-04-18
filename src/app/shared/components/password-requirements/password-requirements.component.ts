import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SimpleComponent } from '@shared/base-classes';
import { PasswordRequirementsProps } from '@shared/interfaces/simple-component-props.interface';

@Component({
	selector: 'mflooring-password-requirements',
	templateUrl: './password-requirements.component.html',
	styleUrls: ['./password-requirements.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordRequirementsComponent extends SimpleComponent<
	PasswordRequirementsProps,
	any
> {
	public requirements = [
		{
			label: `8-16 Characters`,
			requirement: 'length',
		},
		{
			label: `Upper and lowercase letters`,
			requirement: 'case',
		},
		{
			label: `At least one number`,
			requirement: 'numeric',
		},
		{
			label: `At least one of the special character:`,
			requirement: 'special',
		},
	];

	constructor() {
		super();
	}
}
