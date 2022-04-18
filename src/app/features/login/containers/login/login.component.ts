import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { BloomreachBaseClass } from '@app/core/bloomreach';
import {
	AuthService,
	Eventservice,
	MessagesService,
	StorageService,
} from '@app/core/services';
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
	AuthToken,
	InputTextContentProps,
	InputTextPresentationProps,
	UserState,
} from '@app/shared/interfaces';
import { BehaviorSubject, of } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { LoginForgotComponent } from '../../components';
import { LoginFacade } from '../../login.facade';
import { LoginForm } from './login.form';

@Component({
	selector: 'mflooring-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent extends BloomreachComponent {
	public form = LoginForm();

	constructor(
		public storage: StorageService,
		public eventservice: Eventservice,
		private loginFacade: LoginFacade,
		private authService: AuthService,
		private router: Router,
		private route: ActivatedRoute,
		private dialog: MatDialog,
		private messages: MessagesService
	) {
		super(eventservice, storage);
	}
	public errorSubmitted$: BehaviorSubject<boolean> =
		new BehaviorSubject<boolean>(false);
	// public submitButtonContentProps;
	// public submitButtonPresentationProps: any = {
	// 	theme: ThemeTypes.dark,
	// 	buttonType: ButtonTypes.primary,
	// 	buttonWidth: ButtonWidth.normal,
	// 	buttonAction: ButtonAction.submit,
	// 	alignment: HorizAlignment.center,
	// 	isDisabled: !this.form.valid,
	// };

	// ngOnInit(): void {
	// this.submitButtonContentProps = {
	// 	text: this.resourceBundleData['global.button.submit.label'],
	// };
	// }
	get email() {
		return this.form.get('uid');
	}
	get password() {
		return this.form.get('password');
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
			this.errorSubmitted$.next(true);
			return;
		}
		this.loginFacade
			.loginUser$(formValues)
			.pipe(
				take(1),
				switchMap((response: AuthToken | HttpErrorResponse) => {
					if (response instanceof HttpErrorResponse) {
						this.errorSubmitted$.next(true);
						this._handleEventService(
							null,
							null,
							response.error.error_description
						);
						return of(response);
					}
					this.errorSubmitted$.next(false);

					return this.authService.updateUserState$(
						{
							...response,
							anonymous: false,
							token_gen: Date.now() + response.expires_in * 1000,
							user_id: formValues?.uid,
							remember_me: !!formValues?.remPassword
								? formValues?.remPassword
								: false,
						},
						'[LOGIN]'
					);
				})
			)
			.subscribe((userState: UserState) => {
				if (!(userState instanceof HttpErrorResponse)) {
					const currentUrl = this.route.snapshot.queryParams.ref;
					this._handleEventService(
						userState.customer_id,
						formValues.name,
						null
					);
					void this.router.navigateByUrl(
						currentUrl ? currentUrl : '/my-account',
						{
							skipLocationChange: true,
						}
					);
					if (this.router.url.includes('returnUrl')) {
						void this.router.navigate(['/my-cart'], {
							relativeTo: this.route,
						});
					}
				}
			});
	}
	private _handleEventService(custKey, name = null, error = null) {
		if (!!error) {
			this.eventservice.formSubmissionFailed({
				formError: error,
				formID: 'login form',
				formName: 'Login',
				formType: 'Login',
			});
			return;
		}

		this.eventservice.logUser({
			event: 'User Signed In',
			custKey: custKey,
			loginStatus: 'logged in',
			userType:
				!!name && name.indexOf('@mohawkind.com') !== -1
					? 'employee'
					: 'customer',
		});
		this.eventservice.formSubmissionSucceeded(
			{
				transactionID: null,
			},
			{
				formName: 'Login',
				formID: 'login form',
				formType: 'Login',
			}
		);
	}
	openForgot() {
		const dialogRef = this.dialog.open(LoginForgotComponent, {
			width: '100%',
			maxWidth: '450px',
			height: 'auto',
			panelClass: 'my-dialog',
			data: { label: this.resourceBundleData },
		});

		dialogRef.componentInstance.submitClicked
			.pipe(take(1))
			.subscribe((result) =>
				result === 'Error'
					? this.messages.setResponseMessage({
							message:
								this.resourceBundleData['global.label.account.error.invalid'],
							isError: true,
							duration: 12000,
							autoClose: true,
					  })
					: this.messages.setResponseMessage({
							message: this.resourceBundleData['global.label.reset-password'],
							isError: false,
							duration: 12000,
							autoClose: true,
					  })
			);
	}
	navigateToRegister() {
		void this.router.navigate(['/register'], { relativeTo: this.route });
	}
}
