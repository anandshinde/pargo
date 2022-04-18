import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap, take, tap } from 'rxjs/operators';
import { AccountApi } from '@core/http/account.api';
import { AuthService } from '@core/services';
import { UserState } from '@shared/interfaces';

@Injectable({
	providedIn: 'root'
  })
export class MyAccountFacade {
	constructor(
		private accountApi: AccountApi,
		private authService: AuthService
	) {}

	changePassword$(args: any): Observable<any> {
		return this.authService.getUserState$().pipe(
			take(1),
			switchMap(({ third_party_user, user_id }: UserState) => {
				const oldPassword = third_party_user ? 'Dummy@123' : args.oldPassword;
				if (third_party_user) {
					this.updateName$(args, user_id, false);
				}
				return this.accountApi
					.changePassword$(user_id, oldPassword, args.password)
					.pipe(take(1));
			})
		);
	}

	updateName$(args: any, emailId: any, thirdPartyUser: any): Observable<any> {
		return this.accountApi
			.updateName$(emailId, args.firstName, args.lastName, thirdPartyUser)
			.pipe(
				take(1),
				tap(() => {
					// Do what you need to do...
				})
			);
	}

	fetchDefaultAddress$(uid: any): Observable<any> {
		return this.accountApi.fetchDefaultAddress$(uid).pipe(
			take(1),
			tap(() => {
				// Do what you need to do...
			})
		);
	}

	updateDefaultAddress$(
		emailId: any,
		args: any,
		addressSize: any,
		addressId: any
	): Observable<any> {
		return this.accountApi
			.updateDefaultAddress$(emailId, args, addressSize, addressId)
			.pipe(
				take(1),
				tap(() => {
					// Do what you need to do...
				})
			);
	}

	fetchViewFavorites$(args: any): Observable<any> {
		return this.accountApi.fetchViewFavorites$(args).pipe(
			take(1),
			tap((r) => {
				// Do what you need to do...
			})
		);
	}
	deleteFavoriteProduct$(uid: any, product_id: any): Observable<any> {
		return this.accountApi.deleteFavorite$(uid, product_id).pipe(
			take(1),
			tap(() => {
				// Do what you need to do...
			})
		);
	}
	getOrderHistory$(emailID: any): Observable<any> {
		return this.accountApi.getOrderHistory$(emailID).pipe(
			take(1),
			tap(() => {
				// Do what you need to do...
			})
		);
	}
	getOrderDetails$(emailID: any, productCode: any): Observable<any> {
		return this.accountApi.getOrderDetails$(emailID, productCode).pipe(
			take(1),
			tap(() => {
				// Do what you need to do...
			})
		);
	}
}
