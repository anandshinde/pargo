import { HttpErrorResponse } from '@angular/common/http';
import {
	Output,
	Inject,
	EventEmitter,
	Component,
	OnInit,
	ChangeDetectionStrategy,
} from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { take } from 'rxjs/operators';

import { BloomreachComponent } from '@app/shared/base-classes';

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

import { MyAccountFacade } from '../../my-account.facade';
import { MyAccountPwdForm } from './my-account-pwd.form';
import { Eventservice } from '@app/core/services/events.service';
import { StorageService } from '@core/services';
import { combineLatest } from 'rxjs';

@Component({
	selector: 'mflooring-my-account-pwd',
	templateUrl: './my-account-pwd.component.html',
	styleUrls: ['./my-account-pwd.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyAccountPwdComponent
	extends BloomreachComponent
	implements OnInit
{
	@Output() submitClicked = new EventEmitter<any>();

	public form = MyAccountPwdForm();
	public submitButtonContentProps;
	public showError: Boolean;
	public formStartFlag: Boolean;
	public submitButtonPresentationProps = {
		theme: ThemeTypes.dark,
		buttonType: ButtonTypes.primary,
		buttonWidth: ButtonWidth.normal,
		buttonAction: ButtonAction.submit,
		alignment: HorizAlignment.center,
	};

	constructor(
		public eventservice: Eventservice,
		public storage: StorageService,
		private dialogRef: MatDialog,
		private myAccountFacade: MyAccountFacade,
		@Inject(MAT_DIALOG_DATA) public dataMat: any
	) {
		super(eventservice, storage);
	}

	ngOnInit(): void {
		this.formStartFlag = true;
		this.submitButtonContentProps = {
			text: this.dataMat.label['global.label.submit'],
			// text: 'Save Changes',
		};
		this.eventservice.formTracking({
			event: 'Form Viewed',
			formID: 'change password form',
			formName: 'Change Password',
			formType: 'Change Password',
		});
		this.form.valueChanges.subscribe((res) => {
			// if(this.form.value.oldPassword !="" || this.form.value.password != "" || this.form.value.confirmPassword != ""){
			//if(this.oldPassword.value !="" || this.password.value !="" || this.confirmPassword.value !=""){
			if (this.formStartFlag) {
				this.eventservice.formTracking({
					event: 'Form Started',
					formID: 'change password form',
					formName: 'Change Password',
					formType: 'Change Password',
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

	get password() {
		return this.form.get('password');
	}

	get confirmPassword() {
		return this.form.get('confirmPassword');
	}

	get oldPassword() {
		return this.form.get('oldPassword');
	}

	onNoClick() {
		this.dialogRef.closeAll();
	}

	onSubmit(formValues: any) {
		if (this.form.invalid) {
			return;
		}
		this.myAccountFacade
			.changePassword$(formValues)
			.pipe(take(1))
			.subscribe((resp) => {
				if (resp instanceof HttpErrorResponse) {
					const errorType = resp.error.errors[0]?.type;
					if (
						errorType === 'PasswordMismatchError' ||
						errorType === 'InvalidTokenError'
					) {
						this.showError = true;
						this.oldPassword.reset();
						this.eventservice.formSubmissionFailed({
							formError: errorType,
							formID: 'change password form',
							formName: 'Change Password',
							formType: 'Change Password',
						});
					} else {
						this.submitClicked.emit('Error');
						this.dialogRef.closeAll();
						return;
					}
				} else {
					this.submitClicked.emit('Success');
					this.dialogRef.closeAll();
					this.eventservice.formSubmissionSucceeded(
						{
							transactionID: null,
						},
						{
							formName: 'Change Password',
							formID: 'change password form',
							formType: 'Change Password',
						}
					);
				}
			});
	}
}
