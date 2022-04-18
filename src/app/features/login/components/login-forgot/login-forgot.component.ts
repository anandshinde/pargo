import { Component, Inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { SimpleComponent } from '@app/shared/base-classes';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Eventservice } from '@app/core/services/events.service';
import { LoginForgotForm } from './login-forgot.form';
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
import { HttpErrorResponse } from '@angular/common/http';
import { switchMap, take } from 'rxjs/operators';
import { LoginFacade } from '../../login.facade';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { StorageService } from '@core/services';
import { combineLatest, NEVER } from 'rxjs';

@Component({
	selector: 'mflooring-login-forgot',
	templateUrl: './login-forgot.component.html',
	styleUrls: ['./login-forgot.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginForgotComponent
	extends SimpleComponent<any, any>
	implements OnInit
{
	public form = LoginForgotForm();
	public errorFlag = false;
	@Output() submitClicked = new EventEmitter<any>();
	public submitButtonContentProps;
	public formStartFlag: Boolean;

	public submitButtonPresentationProps = {
		theme: ThemeTypes.light,
		buttonType: ButtonTypes.primary,
		buttonWidth: ButtonWidth.normal,
		buttonAction: ButtonAction.submit,
		alignment: HorizAlignment.center,
	};

	public getCustomerKey$ = this.storage.getItem('custKey');
	public getUserToken$ = this.storage.getItem('userToken');
	public getUserName$ = this.storage.getItem('userName');

	public setUserEventData$ = combineLatest([
		this.getCustomerKey$,
		this.getUserToken$,
	]);

	constructor(
		private loginFacade: LoginFacade,
		private dialogRef: MatDialog,
		private storage: StorageService,
		private eventservice: Eventservice,
		@Inject(MAT_DIALOG_DATA) public dataMat: any
	) {
		super();
	}

	ngOnInit(): void {
		this.formStartFlag = true;
		this.submitButtonContentProps = {
			text: this.dataMat.label['global.button.submit.label'],
		};
		this.eventservice.formTracking({
			event: 'Form Viewed',
			formID: '',
			formName: 'Login Forgot',
			formType: 'Login Forgot',
		});
		this.form.valueChanges.subscribe((res) => {
			if (this.formStartFlag) {
				this.eventservice.formTracking({
					event: 'Form Started',
					formID: 'login forgot form',
					formName: 'Login Forgot',
					formType: 'Login Forgot',
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
		return this.form.get('uid');
	}

	get uid() {
		return this.form.get('uid');
	}

	onNoClick() {
		this.dialogRef.closeAll();
	}

	onSubmit(formValues: any) {
		if (this.form.invalid) {
			return;
		}
		this.loginFacade
			.fetchUser$(formValues)
			.pipe(
				take(1),
				switchMap((response: any | HttpErrorResponse) => {
					if (response instanceof HttpErrorResponse) {
						this.submitClicked.emit('Error');
						this.dialogRef.closeAll();
						this.eventservice.formSubmissionFailed({
							formError: response.error,
							formID: '',
							formName: 'Login Forgot',
							formType: 'Login Forgot',
						});
						return NEVER;
					}

					return this.loginFacade.forgotPassword$(formValues).pipe(take(1));
				})
			)
			.subscribe((response: any | HttpErrorResponse) => {
				if (!(response instanceof HttpErrorResponse)) {
					this.submitClicked.emit('Success');
					this.dialogRef.closeAll();
					this.eventservice.formSubmissionSucceeded(
						{
							transactionID: null,
						},
						{
							formName: 'Login Forgot',
							formID: 'login forgot form',
							formType: 'Login Forgot',
						}
					);
				}
			});
	}
}
