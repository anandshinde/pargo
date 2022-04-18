import {
	AbstractControl,
	FormControl,
	FormGroup,
	ValidatorFn,
	Validators,
} from '@angular/forms';
import { CustomValidators } from './custom-validators';
// import { CustomValidators } from '@app/features/my-account/components/my-account-pwd/custom-validators';

export const CreateAccountForm = () => {
	const CheckPasswords =
		(elements: string[]): ValidatorFn =>
		(control: AbstractControl): null => {
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
			firstName: new FormControl('', [
				Validators.minLength(2),
				Validators.maxLength(55),
				Validators.required,
			]),
			lastName: new FormControl('', [
				Validators.minLength(2),
				Validators.maxLength(55),
				Validators.required,
			]),
			mailingList: new FormControl(false),
			/*password: new FormControl('', [
				Validators.required,
				Validators.pattern(
					/^(?=.{8,16}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%=^}&*'{_()\\[\];,./<>?:"|\`~+-]).*$/
				),
			]),*/

			password: new FormControl('', [
				Validators.required,
				Validators.pattern(
					/^(?=.{8,16}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[ !@$%^&*#()_+\-=\[\]{};':"\\|,.<>\/?~`]).*$/
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
					/[ !@$%^&*#()_+\-=\[\]{};':"\\|,.<>\/?~`]/,
					{
						hasSpecialCharacters: true,
					}
				),
				Validators.minLength(8),
				Validators.maxLength(16),
			]),
			confirmPassword: new FormControl('', [
				Validators.required,
				Validators.pattern(
					/^(?=.{8,16}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@$%=^}&*'{_#()\\[\];,./<>?:"|\`~+-]).*$/
				),
			]),
		},
		{ validators: CheckPasswords(['password', 'confirmPassword']) }
	);
};

export const EmailVerifyForm = () => {
	return new FormGroup({
		uid: new FormControl('', [
			Validators.required,
			Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,3}$'),
		]),
	});
};
