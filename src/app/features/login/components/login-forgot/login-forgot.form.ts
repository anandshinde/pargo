import { FormControl, FormGroup, Validators } from '@angular/forms';

export const LoginForgotForm = () => {
	return new FormGroup({
		uid: new FormControl('', [
			Validators.required,
			Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,3}$'),
		]),
	});
};
