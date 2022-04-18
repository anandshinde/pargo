import {
	AbstractControl,
	FormControl,
	FormGroup,
	ValidatorFn,
	Validators,
} from '@angular/forms';
import { RegularExpressions } from '@shared/constants/config.constants';
export const UserDetailsForm = () => {
	return new FormGroup({
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
		phoneNumber: new FormControl('', [
			Validators.minLength(10),
			Validators.maxLength(14),
			Validators.pattern(RegularExpressions.phoneNumberValidation),
		]),
		leaveMessage: new FormControl('', []),
		email: new FormControl('', [
			Validators.required,
			Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,3}$'),
		]),
	});
};
