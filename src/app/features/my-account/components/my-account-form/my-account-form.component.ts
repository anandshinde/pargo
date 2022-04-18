import { HttpErrorResponse } from '@angular/common/http';
import {
	ChangeDetectionStrategy,
	Component,
	Input,
	OnInit,
} from '@angular/core';
import {
	AuthService,
	Eventservice,
	MessagesService,
	StorageService,
} from '@app/core/services';
import {
	ButtonAction,
	ButtonTypes,
	ButtonWidth,
	HorizAlignment,
	InputTextTypes,
	ThemeTypes,
	usStates,
} from '@app/shared/constants';
import {
	InputTextContentProps,
	InputTextPresentationProps,
	UserState,
} from '@app/shared/interfaces';
import { NEVER, Observable, of, Subject } from 'rxjs';
import { switchMap, take, takeUntil } from 'rxjs/operators';
import { MyAccountForm } from '../../containers/my-account/my-account.form';
import { MyAccountFacade } from '../../my-account.facade';
import { BloomreachComponent } from '@shared/base-classes';

import { MatDialog } from '@angular/material/dialog';
import { MyAccountPwdComponent } from '../my-account-pwd/my-account-pwd.component';

@Component({
	selector: 'mflooring-my-account-form',
	templateUrl: './my-account-form.component.html',
	styleUrls: ['./my-account-form.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyAccountFormComponent
	extends BloomreachComponent
	implements OnInit
{
	constructor(
		private myAccountFacade: MyAccountFacade,
		private authService: AuthService,
		private messages: MessagesService,
		public eventservice: Eventservice,
		public storage: StorageService,
		private dialog: MatDialog
	) {
		super(eventservice, storage);
	}
	public thirdPartyUser: Observable<any> = of(false);
	public form = MyAccountForm({});
	public formData$ = new Subject();
	@Input() resourceBundleContent;
	public _stateFilter = usStates;
	public submitButtonContentProps;
	public submitButtonPresentationProps = {
		theme: ThemeTypes.light,
		buttonType: ButtonTypes.primary,
		buttonWidth: ButtonWidth.normal,
		buttonAction: ButtonAction.submit,
		alignment: HorizAlignment.center,
	};
	public userToken;

	ngOnInit(): void {
		this.getUserToken$
			.pipe(takeUntil(this.unsubscribe))
			.subscribe((userToken) => {
				this.userToken = !!userToken ? userToken.access_token : null;
			});

		this.submitButtonContentProps = {
			text: this.resourceBundleContent['global.button.save.label'],
		};
	}
	get firstName() {
		return this.form.get('firstName');
	}

	get lastName() {
		return this.form.get('lastName');
	}

	get zipCode() {
		return this.form.get('zip');
	}
	get country() {
		return this.form.get('country');
	}

	get address() {
		return this.form.get('address');
	}

	get uid() {
		return this.form.get('uid');
	}

	get city() {
		return this.form.get('city');
	}

	get state() {
		return this.form.get('state');
	}

	get address2() {
		return this.form.get('address2');
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
	public onSubmit(formValues: any) {
		if (this.form.invalid) {
			return;
		}
		const stateValue = this._stateFilter.filter((val) => {
			return (
				val.label.toLocaleLowerCase() ===
					formValues.state.toLocaleLowerCase() ||
				val.value.toLocaleLowerCase() === formValues.state.toLocaleLowerCase()
			);
		});
		if (stateValue.length == 1) {
			formValues.state = stateValue[0].value;
		} else {
			this.displayMessage('Invalid State Value', true);
			return;
		}
		this.formData$.next(formValues);

		this.authService
			.getUserState$()
			.pipe(
				take(1),
				switchMap(({ third_party_user, user_id }: UserState) => {
					return this.myAccountFacade
						.updateName$(formValues, user_id, third_party_user)
						.pipe(
							take(1),
							switchMap((resp: any | HttpErrorResponse) => {
								if (resp instanceof HttpErrorResponse) {
									this.displayMessage(
										this.resourceBundleContent['global.error.server-exception'],
										true
									);
									return NEVER;
								}

								return this.updateAddress(formValues, user_id);
							})
						);
				})
			)
			.subscribe((resp) => {
				if (resp instanceof HttpErrorResponse) {
					this.displayMessage(
						this.resourceBundleContent['global.error.server-exception'],
						true
					);
				} else {
					this.displayMessage(
						this.resourceBundleContent['global.success.message'],
						false
					);
				}
			});
	}
	private displayMessage(message, isError): void {
		this.messages.setResponseMessage({
			message: message,
			isError: isError,
			duration: 12000,
			autoClose: true,
		});
	}
	public updateAddress(user: any, email) {
		return this.myAccountFacade.fetchDefaultAddress$(email).pipe(
			take(1),
			switchMap((resp: any | HttpErrorResponse) => {
				if (resp instanceof HttpErrorResponse) {
					this.displayMessage(
						`${resp.error?.error_description || resp.status}`,
						true
					);
					return NEVER;
				}
				return this.myAccountFacade
					.updateDefaultAddress$(
						email,
						user,
						resp.addresses.length,
						resp.addresses.length === 0 ? 'addr1' : resp.addresses[0].id
					)
					.pipe(take(1));
			})
		);
	}
	public openChangePwd() {
		const dialogRef = this.dialog.open(MyAccountPwdComponent, {
			//	width: '35%',
			panelClass: ['mat-dialog-my-account-forgot-password', 'my-dialog'],
			data: {
				uid: this.form.get('uid'),
				thirdPartyUser: this.thirdPartyUser,
				firstName: this.form.get('firstName'),
				latsName: this.form.get('lastName'),
				label: this.resourceBundleContent,
				userToken: this.userToken,
			},
		});

		/*this.errorFlag$ = dialogRef.componentInstance.submitClicked.pipe(
			take(1),
			map((result) => result === 'Error')
		);*/
		dialogRef.componentInstance.submitClicked
			.pipe(take(1))
			.subscribe((result) =>
				result === 'Error'
					? this.displayMessage(
							this.resourceBundleContent['global.error.server-exception'],
							true
					  )
					: this.displayMessage(
							this.resourceBundleContent['global.label.success'],
							false
					  )
			);

		/*	dialogRef.afterClosed().subscribe((result) => {
		});*/
	}
}
