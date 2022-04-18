import {
	Component,
	HostListener,
	OnInit,
	ChangeDetectionStrategy,
} from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

import { MatDialog } from '@angular/material/dialog';

import { Subject, Observable, of, from, NEVER } from 'rxjs';
import { map, switchMap, take, takeUntil } from 'rxjs/operators';

import {
	CartService,
	MessagesService,
	StorageService,
} from '@app/core/services';
import { BloomreachComponent } from '@shared/base-classes';
import { resolveResourceBundleArray } from '@shared/resolvers/compound.resolver';
import {
	ButtonAction,
	ButtonTypes,
	ButtonWidth,
	HorizAlignment,
	InputTextTypes,
	ThemeTypes,
	usStates,
} from '@shared/constants';
import {
	InputTextContentProps,
	InputTextPresentationProps,
	UserState,
} from '@shared/interfaces';

import { MyAccountPwdComponent } from '@features/my-account/components';
import { MyAccountForm } from './my-account.form';
import { MyAccountFacade } from '../../my-account.facade';
import { Router, ActivatedRoute } from '@angular/router';
import { Eventservice } from '@app/core/services/events.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { breakpoints } from '@shared/constants';
import { AuthService } from '@core/services/auth.service';
import { ProductService } from '@app/core/services/product.service';

@Component({
	selector: 'mflooring-my-account',
	templateUrl: './my-account.component.html',
	styleUrls: ['./my-account.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyAccountComponent extends BloomreachComponent implements OnInit {
	public form = MyAccountForm({});
	public formData$ = new Subject();
	public thirdPartyUser: Observable<any> = of(false);
	public submitButtonContentProps;
	public emailId;
	// public _stateFilter = usStates;
	public isMobile: boolean;
	public selectedListItem = 'myAccount';
	public showMenuList: boolean;
	public showContent: boolean;

	public submitButtonPresentationProps = {
		theme: ThemeTypes.light,
		buttonType: ButtonTypes.primary,
		buttonWidth: ButtonWidth.normal,
		buttonAction: ButtonAction.submit,
		alignment: HorizAlignment.center,
	};

	public userName$ = this.storage.getItem('userName');

	public userToken;
	public favorites$: Observable<any>;
	public resourceBundleContent;

	private baseProfile = {
		firstName: '',
		lastName: '',
		uid: '',
		zip: '',
		address: '',
		address2: '',
		city: '',
		state: '',
	};

	constructor(
		public eventservice: Eventservice,
		public storage: StorageService,
		private dialog: MatDialog,
		private myAccountFacade: MyAccountFacade,
		private router: Router,
		private route: ActivatedRoute,
		private messages: MessagesService,
		private cartService: CartService,
		private breakpoint: BreakpointObserver,
		private productService: ProductService,
		private authService: AuthService,
		private viewportScroller: ViewportScroller
	) {
		super(eventservice, storage);
		this.isMobile = this.onResize();
	}

	@HostListener('window:resize', ['$event']) onResize() {
		this.isMobile = this.breakpoint.isMatched(breakpoints.mobileMax);
		if (this.isMobile) {
			this.showMenuList = !this.isMobile;
			this.showContent = this.isMobile;
		} else {
			this.showMenuList = true;
			this.showContent = true;
			this.selectedListItem =
				this.selectedListItem === '' ? 'myAccount' : this.selectedListItem;
		}

		return this.isMobile;
	}

	// get firstName() {
	// 	return this.form.get('firstName');
	// }

	// get lastName() {
	// 	return this.form.get('lastName');
	// }

	// get zipCode() {
	// 	return this.form.get('zip');
	// }

	// get address() {
	// 	return this.form.get('address');
	// }

	// get uid() {
	// 	return this.form.get('uid');
	// }

	// get city() {
	// 	return this.form.get('city');
	// }

	// get state() {
	// 	return this.form.get('state');
	// }

	// get address2() {
	// 	return this.form.get('address2');
	// }

	// get inputTextContent(): InputTextContentProps {
	// 	return {
	// 		placeholder: 'Type here',
	// 	};
	// }

	// get inputTextPresentation(): InputTextPresentationProps {
	// 	return {
	// 		type: InputTextTypes.form,
	// 	};
	// }

	// private displayMessage(message, isError): void {
	// 	this.messages.setResponseMessage({
	// 		message: message,
	// 		isError: isError,
	// 		duration: 12000,
	// 		autoClose: true,
	// 	});
	// }

	// public onSubmit(formValues: any) {
	// 	if (this.form.invalid) {
	// 		return;
	// 	}
	// 	const stateValue = this._stateFilter.filter((val) => {
	// 		return (
	// 			val.label.toLocaleLowerCase() ===
	// 				formValues.state.toLocaleLowerCase() ||
	// 			val.value.toLocaleLowerCase() === formValues.state.toLocaleLowerCase()
	// 		);
	// 	});
	// 	if (stateValue.length == 1) {
	// 		formValues.state = stateValue[0].value;
	// 	} else {
	// 		this.displayMessage('Invalid State Value', true);
	// 		return;
	// 	}
	// 	this.formData$.next(formValues);

	// 	this.authService
	// 		.getUserState$()
	// 		.pipe(
	// 			take(1),
	// 			switchMap(({ third_party_user, user_id }: UserState) => {
	// 				return this.myAccountFacade
	// 					.updateName$(formValues, user_id, third_party_user)
	// 					.pipe(
	// 						take(1),
	// 						switchMap((resp: any | HttpErrorResponse) => {
	// 							if (resp instanceof HttpErrorResponse) {
	// 								this.displayMessage(
	// 									this.resourceBundleContent['global.error.server-exception'],
	// 									true
	// 								);
	// 								return NEVER;
	// 							}

	// 							return this.updateAddress(formValues, user_id);
	// 						})
	// 					);
	// 			})
	// 		)
	// 		.subscribe((resp) => {
	// 			if (resp instanceof HttpErrorResponse) {
	// 				this.displayMessage(
	// 					this.resourceBundleContent['global.error.server-exception'],
	// 					true
	// 				);
	// 			} else {
	// 				this.displayMessage(
	// 					this.resourceBundleContent['global.success.message'],
	// 					false
	// 				);
	// 			}
	// 		});
	// }

	// public updateAddress(user: any, email) {
	// 	return this.myAccountFacade.fetchDefaultAddress$(email).pipe(
	// 		take(1),
	// 		switchMap((resp: any | HttpErrorResponse) => {
	// 			if (resp instanceof HttpErrorResponse) {
	// 				this.displayMessage(
	// 					`${resp.error?.error_description || resp.status}`,
	// 					true
	// 				);
	// 				return NEVER;
	// 			}
	// 			return this.myAccountFacade
	// 				.updateDefaultAddress$(
	// 					email,
	// 					user,
	// 					resp.addresses.length,
	// 					resp.addresses.length === 0 ? 'addr1' : resp.addresses[0].id
	// 				)
	// 				.pipe(take(1));
	// 		})
	// 	);
	// }

	public updatePatchForm(userObj: any) {
		const { firstName, lastName, uid, defaultAddress } = userObj;
		this.form.patchValue({
			firstName,
			lastName,
			uid,
			zip: defaultAddress?.postalCode ? defaultAddress?.postalCode : '',
			address: defaultAddress?.line1 ? defaultAddress?.line1 : '',
			address2: defaultAddress?.line2 ? defaultAddress?.line2 : '',
			city: defaultAddress?.town ? defaultAddress?.town : '',
			state: defaultAddress?.region
				? defaultAddress?.region?.isocode.replace('US-', '')
				: '',
		});
	}

	// public openChangePwd() {
	// 	const dialogRef = this.dialog.open(MyAccountPwdComponent, {
	// 		//	width: '35%',
	// 		panelClass: ['mat-dialog-my-account-forgot-password', 'my-dialog'],
	// 		data: {
	// 			uid: this.form.get('uid'),
	// 			thirdPartyUser: this.thirdPartyUser,
	// 			firstName: this.form.get('firstName'),
	// 			latsName: this.form.get('lastName'),
	// 			label: this.resourceBundleContent,
	// 			userToken: this.userToken,
	// 		},
	// 	});

	// 	/*this.errorFlag$ = dialogRef.componentInstance.submitClicked.pipe(
	// 		take(1),
	// 		map((result) => result === 'Error')
	// 	);*/
	// 	dialogRef.componentInstance.submitClicked
	// 		.pipe(take(1))
	// 		.subscribe((result) =>
	// 			result === 'Error'
	// 				? this.displayMessage(
	// 						this.resourceBundleContent['global.error.server-exception'],
	// 						true
	// 				  )
	// 				: this.displayMessage(
	// 						this.resourceBundleContent['global.label.success'],
	// 						false
	// 				  )
	// 		);

	// 	/*	dialogRef.afterClosed().subscribe((result) => {
	// 	});*/
	// }

	ngOnInit(): void {
		if (this.isMobile) {
			this.showMenuList = !this.isMobile;
			this.showContent = this.isMobile;
			this.selectedListItem = 'myAccount';
		} else {
			this.showMenuList = true;
			this.showContent = true;
			this.selectedListItem = 'myAccount';
		}
		this.resourceBundleContent = resolveResourceBundleArray(
			this.resourceBundleArray,
			this.page
		);

		this.productService.collectionLogos = this.resourceBundleData;

		this.route.data
			.pipe(
				take(1),
				map((data: any) => data.user),
				switchMap((resp: any) => {
					this.updatePatchForm({
						...this.baseProfile,
						...resp,
					});

					return this.authService.updateUserState$(
						{
							customer_id: resp.customerId,
							third_party_user: resp.thirdPartyUser,
						},
						'Initialize - My Account'
					);
				})
			)
			.subscribe((userState: UserState) => {
				this.favorites$ = this.myAccountFacade
					.fetchViewFavorites$(userState.user_id)
					.pipe(take(1));
				console.log('[Utility Header Cart State]:');
			});

		this.getUserToken$
			.pipe(takeUntil(this.unsubscribe))
			.subscribe((userToken) => {
				this.userToken = !!userToken ? userToken.access_token : null;
			});

		this.submitButtonContentProps = {
			text: this.resourceBundleContent['global.button.save.label'],
		};
		this.formData$.subscribe((payload) => {});
		// 'my account', 'abc', 'breadcrumbs','my-account','account','mflooring','English', 'usa');
	}

	public onSignOut() {
		this.authService
			.getUserState$()
			.pipe(
				take(1),
				switchMap((userState: UserState) => {
					const { user_id, remember_me } = userState;
					return this.authService.updateUserState$(
						{
							...userState,
							guid: null,
							access_token: null,
							expires_in: null,
							scope: null,
							anonymous: true,
							token_gen: null,
							token_type: null,
							user_id: remember_me ? user_id : null,
						},
						'LOG OUT'
					);
				})
			)
			.subscribe((userState: UserState) => {
				console.log('[USER LOGGED OUT]');
				this.eventservice.logUser({
					event: 'User Signed Out',
					custKey: this.customerKey,
					loginStatus: 'logged out',
				});
				void this.router.navigate(['/.'], {
					relativeTo: this.route,
				});
			});
	}

	scrollToCategory(el): void {
		this.viewportScroller.scrollToAnchor(el);
	}
}
