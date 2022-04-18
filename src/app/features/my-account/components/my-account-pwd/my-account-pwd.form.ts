import {
	AbstractControl,
	FormControl,
	FormGroup,
	ValidatorFn,
	Validators,
} from '@angular/forms';
import { CustomValidators } from './custom-validators';

export const MyAccountPwdForm = () => {
	const CheckPasswords = (elements: string[]): ValidatorFn => (
		control: AbstractControl
	): null => {
		elements.reduce((prev: string, curr: string) => {
			if (control.get(prev).value !== control.get(curr).value) {
				control.get(curr).setErrors({ not_same_password: true });
			}
			return curr;
		});
		return null;
	};

	return new FormGroup(
		{
			oldPassword: new FormControl('', [Validators.required]),
			password: new FormControl('', [
				Validators.required,
				Validators.pattern(
					/^(?=.{8,16}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]).*$/
				),
				CustomValidators.patternValidator(/\d/, {
					hasNumber: true,
				}),
				// check whether the entered password has upper case letter
				CustomValidators.patternValidator(/[A-Z]/, {
					hasCapitalCase: true,
				}),
				// check whether the entered password has a lower case letter
				CustomValidators.patternValidator(/[a-z]/, {
					hasSmallCase: true,
				}),
				// check whether the entered password has a special character
				CustomValidators.patternValidator(
					/[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]/,
					{
						hasSpecialCharacters: true,
					}
				),
				Validators.minLength(8),
				Validators.maxLength(16),
			]),
			confirmPassword: new FormControl('', [Validators.required]),
		},
		{ validators: CheckPasswords(['password', 'confirmPassword']) }
	);
};
