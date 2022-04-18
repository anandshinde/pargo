import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {
	AbstractControl,
	AsyncValidatorFn,
	ValidationErrors,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';
import { map, take, takeUntil } from 'rxjs/operators';

import { BloomreachComponent } from '@app/shared/base-classes';
import { InputTextTypes } from '@app/shared/constants';
import {
	InputTextContentProps,
	InputTextPresentationProps,
} from '@app/shared/interfaces';
import { CreateAccountFacade } from '../../create-account.facade';
import { CreateAccountForm, EmailVerifyForm } from './create-account.form';
import { MessagesService, StorageService, Eventservice } from '@core/services';

@Component({
	selector: 'mflooring-create-account',
	templateUrl: './create-account.component.html',
	styleUrls: ['./create-account.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateAccountComponent
	extends BloomreachComponent
	implements OnInit
{
	public form = CreateAccountForm();
	public formEmailVerify = EmailVerifyForm();
	public authToken: any;

	submitted = false;
	submittedVerify = false;
	emailTrigger = false;
	emailVerifyButton = true;
	emailPattern = false;
	payload: any;
	public formStartFlag: Boolean;
	public alreadyUser;
	constructor(
		public eventservice: Eventservice,
		public storage: StorageService,
		private createAccountFacade: CreateAccountFacade,
		private router: Router,
		private route: ActivatedRoute,
		private messages: MessagesService
	) {
		super(eventservice, storage);

		this.route.queryParams
			.pipe(takeUntil(this.unsubscribe))
			.subscribe((params) => {
				this.authToken = params;
			});
	}

	private checkForDuplicate(): AsyncValidatorFn {
		return (control: AbstractControl): Observable<ValidationErrors | null> => {
			return this.userExists(control.value).pipe(
				map((response) => {
					return response ? { userExists: true } : null;
				})
			);
		};
	}

	ngOnInit(): void {
		this.formStartFlag = true;
		// this.email.setAsyncValidators(this.checkForDuplicate());
		if (Object.keys(this.authToken).length === 0) {
			this.form.disable();
		} else {
			this.formEmailVerify.disable();
			this.emailVerifyButton = false;
			this.formEmailVerify.setValue({ uid: this.authToken.email });
			this.alreadyUser = this.userExists(this.authToken.email);
			this.verifyUser();
		}
		this.eventservice.formTracking({
			event: 'Form Viewed',
			formID: 'create account form',
			formName: this.component['model'].name,
			formType: this.component['model'].ctype,
		});
		this.form.valueChanges.subscribe((res) => {
			if (this.formStartFlag) {
				this.eventservice.formTracking({
					event: 'Form Started',
					formID: 'create account form',
					formName: this.component['model'].name,
					formType: this.component['model'].ctype,
				});
				this.formStartFlag = false;
			}
		});
	}

	get inputTextContent(): InputTextContentProps {
		return {
			placeholder: 'Type here',
		};
	}

	get inputTextPresentation(): InputTextPresentationProps {
		return {
			type: InputTextTypes.form,
		};
	}

	get email() {
		return this.formEmailVerify.get('uid');
	}

	get firstName() {
		return this.form.get('firstName');
	}

	get lastName() {
		return this.form.get('lastName');
	}

	// get zipCode() {
	// 	return this.form.get('zipCode');
	// }

	get mailingList() {
		return this.form.get('mailingList');
	}

	get password() {
		return this.form.get('password');
	}

	get confirmPassword() {
		return this.form.get('confirmPassword');
	}

	userExists(email: string): Observable<boolean> {
		return this.createAccountFacade.fetchUser$(email).pipe(
			take(1),
			map((response) => !(response instanceof HttpErrorResponse))
		);
	}

	onSubmitVerify(formEmailValues: any) {
		this.submittedVerify = true;
		if (this.formEmailVerify.invalid) {
			this.submittedVerify = false;
			return;
		}
		const token = this.generateToken(formEmailValues);
		this.createAccountFacade
			.emailVerify$(formEmailValues?.uid, token)
			.pipe(take(1))
			.subscribe((response) => {
				this.messages.setResponseMessage({
					message: this.resourceBundleData['global.success.emailverify'],
					isError: false,
					duration: 12000,
					autoClose: true,
				});
				this.emailTrigger = true;
			});
	}

	onSubmit(formValues: any) {
		this.submitted = true;
		if (this.form.invalid) {
			this.submitted = false;
			return;
		}
		formValues['titleCode'] = 'mr';
		formValues['uid'] = this.authToken.email;
		formValues['zipCode'] = '30068';
		delete formValues['mailingList'];
		this.tokenExpired(this.authToken?.tokenkey, false);
		this.createAccountFacade
			.register$(formValues)
			.pipe(take(1))
			.subscribe((response) => {
				if (response instanceof HttpErrorResponse) {
					this.messages.setResponseMessage({
						message: this.resourceBundleData['global.label.message.error']`${
							response.error?.error_description || response.status
						}`,
						isError: true,
						duration: 12000,
						autoClose: true,
					});
					this.eventservice.formSubmissionFailed({
						formError: response.error,
						formID: 'create account form',
						formName: this.component['model'].name,
						formType: this.component['model'].ctype,
					});
				} else {
					this.eventservice.logUser({
						event: 'User Registered',
						custKey: this.customerKey,
						loginStatus: 'logged out',
					});
					this.messages.setResponseMessage({
						message: this.resourceBundleData['global.success.accountcreated'],
						isError: false,
						duration: 12000,
						autoClose: true,
					});
					this.eventservice.formSubmissionSucceeded(
						{
							transactionID: null,
						},
						{
							formID: 'create account form',
							formName: this.component['model'].name,
							formType: this.component['model'].ctype,
						}
					);
					void this.router.navigate(['/login'], { relativeTo: this.route });
				}
			});
	}

	generateToken(formValues) {
		const tokenPayload = {
			exp: Math.round(new Date(Date.now() + 60 * 60 * 1000).getTime() / 1000),
			uid: formValues?.uid,
		};
		return `${btoa(JSON.stringify(tokenPayload))}`;
	}
	verifyUser() {
		let alreadyUser;
		this.alreadyUser.pipe(take(1)).subscribe((value) => {
			alreadyUser = value;
			this.userAlreadyExists(alreadyUser);
		});
	}

	tokenExpired(token, onload) {
		let expiry: any = JSON.parse(atob(token));
		let currentDate = Math.round(new Date().getTime() / 1000);
		if (currentDate >= expiry?.exp) {
			this.messages.setResponseMessage({
				message: this.resourceBundleData['global.error.tokenexpired'],
				isError: true,
				duration: 12000,
				autoClose: true,
			});
			void this.router.navigate(['/register'], { relativeTo: this.route });
		} else if (currentDate < expiry?.exp && onload == true) {
			this.messages.setResponseMessage({
				message: this.resourceBundleData['global.message.verifyemailid'],
				isError: false,
				duration: 12000,
				autoClose: true,
			});
		}
	}
	userAlreadyExists(alreadyUser) {
		if (alreadyUser) {
			this.messages.setResponseMessage({
				message: 'Email ' + this.authToken.email + ' is already taken',
				isError: true,
				duration: 12000,
				autoClose: true,
			});
			void this.router.navigate(['/register'], { relativeTo: this.route });
		} else {
			this.tokenExpired(this.authToken?.tokenkey, true);
		}
	}
}
