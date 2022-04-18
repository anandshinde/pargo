import { FormControl, FormGroup, Validators } from '@angular/forms';

export const MyAccountForm = (user) => {
	return new FormGroup({
		uid: new FormControl({ value: user.uid || '', disabled: false }),
		country: new FormControl({ value: user.uid || '', disabled: false }),
		firstName: new FormControl(user.firstName || '', [
			Validators.required,
			Validators.minLength(2),
			Validators.maxLength(55),
		]),
		lastName: new FormControl(user.lastName || '', [
			Validators.required,
			Validators.minLength(2),
			Validators.maxLength(55),
		]),
		address: new FormControl(user.defaultAddress || '', [Validators.required]),
		address2: new FormControl(user.defaultAddress || ''),
		city: new FormControl(user.defaultAddress || '', [Validators.required]),
		zip: new FormControl(user.defaultAddress || '', [
			Validators.required,
			Validators.pattern('^[0-9]{5}(?:-[0-9]{4})?$'),
			Validators.maxLength(5),
		]),
		state: new FormControl(user.defaultAddress || '', [Validators.required]),
	});
};
