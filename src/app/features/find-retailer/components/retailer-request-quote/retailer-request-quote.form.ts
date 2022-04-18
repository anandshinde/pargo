import {
	AbstractControl,
	FormControl,
	FormArray,
	FormGroup,
	ValidatorFn,
	Validators,
} from '@angular/forms';
import { RegularExpressions } from '@shared/constants/config.constants';
export const RetailerRequestQuoteForm = () => {
	return new FormGroup({
		interestedIn: new FormArray([]),
		preferred: new FormControl('Email', [Validators.required]),
		purchaseMonth: new FormControl('', [Validators.required]),
		firstName: new FormControl('', [
			Validators.minLength(1),
			Validators.maxLength(55),
			Validators.required,
		]),
		lastName: new FormControl('', [
			Validators.minLength(1),
			Validators.maxLength(55),
			Validators.required,
		]),
		mailingList: new FormControl(false),
		email: new FormControl('', [
			Validators.required,
			Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,3}$'),
		]),
		phoneNumber: new FormControl('', [
			Validators.minLength(10),
			Validators.maxLength(14),
			Validators.pattern(RegularExpressions.phoneNumberValidation),
		]),
	});
};
