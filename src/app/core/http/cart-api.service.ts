import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, take } from 'rxjs/operators';

import { AuthService } from '@core/services/auth.service';
import { environment } from '@env/environment';
import { CartState, UserState } from '@shared/interfaces';

@Injectable({
	providedIn: 'root',
})
export class CartApiService {
	constructor(private http$: HttpClient, private auth$: AuthService) {}

	private _getCart(userId, isAnonymous) {
		return `${environment.onDemand.baseUrl + environment.onDemand.apiUser}${
			isAnonymous ? 'anonymous' : userId
		}/carts/`;
	}

	public createNewCartApi$(user_id: string = null) {
		const url = `${
			environment.onDemand.baseUrl + environment.onDemand.apiUser
		}${!!user_id ? user_id : 'anonymous'}/carts`;
		return this.http$
			.post<any>(url, {})
			.pipe(catchError((error: HttpErrorResponse) => of(error)));
	}

	public fetchExistingCartApi$(guid, user_id, anonymous): Observable<any> {
		const url = `${this._getCart(user_id, anonymous)}${
			anonymous ? guid : 'current'
		}`;
		return this.http$
			.get<any>(url)
			.pipe(catchError((error: HttpErrorResponse) => of(error)));
	}

	public updateProductInCartApi$(cart: CartState, body, entryNumber) {
		return this.auth$.getUserState$().pipe(
			take(1),
			switchMap(({ anonymous }) => {
				const { userId, cartId, guid } = cart;
				const url = `${this._getCart(userId, anonymous)}${
					anonymous ? guid : cartId
				}/entries/${entryNumber}`;
				return this.http$
					.patch<any>(url, body)
					.pipe(catchError((error: HttpErrorResponse) => of(error)));
			})
		);
	}

	public addProductToCartApi$(state: CartState, body, anonymous) {
		console.log('addProductToCartApi$', state);
		const { userId, cartId, guid } = state;

		const url = `${this._getCart(userId, anonymous)}${
			anonymous ? guid : cartId
		}/entries`;

		return this.http$
			.post<any>(url, body)
			.pipe(catchError((error: HttpErrorResponse) => of(error)));
	}

	public removeProductFromCartApi$(
		cart: CartState,
		entryNumber: number,
		user: UserState
	) {
		const { cartId, guid } = cart;
		const url = `${this._getCart(user.user_id, user.anonymous)}${
			user.anonymous ? guid : cartId
		}/entries/${entryNumber}`;

		return this.http$.delete<any>(url).pipe(
			map((response) => (!response ? 'success' : response)),
			catchError((error: HttpErrorResponse) => of(error))
		);
	}

	public mergeCartsApi$(userId, oldCartId, newCartId): Observable<any> {
		const url = `${
			environment.onDemand.baseUrl + environment.onDemand.apiUser
		}${userId}/carts?oldCartId=${oldCartId}&toMergeCartGuid=${newCartId}`;

		return this.http$
			.post<any>(url, {})
			.pipe(catchError((error: HttpErrorResponse) => of(error)));
	}

	public deleteCartApi$(cart: CartState): Observable<any> {
		return this.auth$.getUserState$().pipe(
			take(1),
			switchMap(({ anonymous }) => {
				const { userId, cartId, guid } = cart;
				const url = `${this._getCart(userId, anonymous)}${
					anonymous ? guid : cartId
				}`;

				return this.http$.delete<any>(url).pipe(
					map((response: any | HttpErrorResponse) =>
						!response ? 'success' : response
					),
					catchError((error: HttpErrorResponse) => error.message)
				);
			})
		);
	}
}
