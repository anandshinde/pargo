import { FormControl, FormGroup, Validators } from '@angular/forms';

export const LoginForm = () => {
	return new FormGroup({
		uid: new FormControl('', [
			Validators.required,
			Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,3}$'),
		]),
		password: new FormControl('', [
			Validators.required,
			Validators.pattern(
				'^(?=.*\\d)(?=.*[a-z])?(?=.*[A-Z])?(?=.*[\\W]).{8,16}$'
			),
		]),
		remPassword: new FormControl(''),
	});
};
