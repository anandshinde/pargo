import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { BehaviorSubject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

import { BloomreachComponent } from '@app/shared/base-classes';
import { MessagesService, StorageService } from '@core/services';
import {
	ButtonAction,
	ButtonTypes,
	ButtonWidth,
	HorizAlignment,
	InputTextTypes,
	ThemeTypes,
} from '@app/shared/constants';
import {
	InputTextContentProps,
	InputTextPresentationProps,
} from '@app/shared/interfaces';
import { ForgotPwdFacade } from '../../forgot-pwd.facade';
import { ForgotPwdForm } from './forgot-pwd.form';
import { Eventservice } from '@app/core/services/events.service';

@Component({
	selector: 'mflooring-forgot-pwd',
	templateUrl: './forgot-pwd.component.html',
	styleUrls: ['./forgot-pwd.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForgotPwdComponent extends BloomreachComponent implements OnInit {
	public form = ForgotPwdForm();
	public authToken: any;
	passwordPattern = false;
	public msgSubmitted$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
		false
	);

	public submitButtonContentProps = {
		text: 'Save Changes',
	};
	public formStartFlag: Boolean;
	public submitButtonPresentationProps = {
		theme: ThemeTypes.light,
		buttonType: ButtonTypes.primary,
		buttonWidth: ButtonWidth.normal,
		buttonAction: ButtonAction.submit,
		alignment: HorizAlignment.center,
	};

	constructor(
		public storage: StorageService,
		public eventservice: Eventservice,
		private route: ActivatedRoute,
		private router: Router,
		private forgotPwdFacade: ForgotPwdFacade,
		private messages: MessagesService
	) {
		super(eventservice, storage);
		this.route.queryParams
			.pipe(takeUntil(this.unsubscribe))
			.subscribe((params) => {
				this.authToken = params;
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

	get password() {
		return this.form.get('password');
	}

	get confirm() {
		return this.form.get('confirmPassword');
	}

	onSubmit(formValues: any) {
		if (this.form.invalid) {
			this.msgSubmitted$.next(false);
			return;
		}

		this.forgotPwdFacade
			.resetPassword$(
				formValues,
				decodeURIComponent(this.authToken?.auth_token)
			)
			.pipe(take(1))
			.subscribe((resp) => {
				if (resp instanceof HttpErrorResponse) {
					this.messages.setResponseMessage({
						message: this.resourceBundleData['global.label.message.error'],
						isError: true,
						duration: 12000,
						autoClose: true,
					});
					this.eventservice.formSubmissionFailed({
						formError: resp.error,
						formID: 'forgot password form',
						formName: this.component['model'].name,
						formType: this.component['model'].ctype,
					});
				} else {
					void this.router.navigate(['/login'], {
						relativeTo: this.route,
					});
					this.messages.setResponseMessage({
						message: this.resourceBundleData['global.label.message.success'],
						isError: false,
						duration: 12000,
						autoClose: true,
					});
					this.eventservice.formSubmissionSucceeded(
						{
							transactionID: null,
						},
						{
							formID: 'forgot password form',
							formName: this.component['model'].name,
							formType: this.component['model'].ctype,
						}
					);
				}
				//this.msgSubmitted$.next(!(resp instanceof HttpErrorResponse));
			});
	}

	ngOnInit(): void {
		this.formStartFlag = true;
		this.eventservice.formTracking({
			event: 'Form Viewed',
			formID: 'forgot password form',
			formName: this.component['model'].name,
			formType: this.component['model'].ctype,
		});
		this.form.valueChanges.subscribe((res) => {
			if (this.formStartFlag) {
				this.eventservice.formTracking({
					event: 'Form Started',
					formID: 'forgot password form',
					formName: this.component['model'].name,
					formType: this.component['model'].ctype,
				});
				this.formStartFlag = false;
			}
		});
	}
	navigateToRegister() {
		void this.router.navigate(['/register'], { relativeTo: this.route });
	}
}
