import {
	HttpClient,
	HttpErrorResponse,
	HttpHeaders,
	HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '@env/environment';

@Injectable({
	providedIn: 'root',
})
export class AccountApi {
	payload: any;

	constructor(private httpClient$: HttpClient) {}

	register$(body: any) {
		let params = JSON.stringify(body);
		return this.httpClient$.post<any>(
			environment.onDemand.baseUrl + environment.onDemand.apiUser,
			params
		);
	}

	fetchUser$(body: any) {
		return this.httpClient$
			.get<any>(
				environment.onDemand.baseUrl + environment.onDemand.apiUser + body
			)
			.pipe(catchError((error: HttpErrorResponse) => of(error)));
	}

	forgotPassword$(uid: any) {
		return this.httpClient$
			.post<any>(
				environment.onDemand.baseUrl + environment.onDemand.apiForgotPwd + uid,
				null
			)
			.pipe(catchError((error: HttpErrorResponse) => of(error)));
	}

	resetPassword$(password: any, authToken: any) {
		const body = { token: authToken, newPassword: password };
		return this.httpClient$
			.post<any>(
				environment.onDemand.baseUrl + environment.onDemand.apiResetPwd,
				body
			)
			.pipe(catchError((error: HttpErrorResponse) => of(error)));
	}

	changePassword$(uid: any, oldPassword: any, password: any) {
		let params = new HttpParams().set('old', oldPassword).set('new', password);
		return this.httpClient$
			.put<any>(
				environment.onDemand.baseUrl +
					environment.onDemand.apiUser +
					uid +
					'/password',
				params
			)
			.pipe(catchError((error: HttpErrorResponse) => of(error)));
	}
	emailVerify$(uid: any, token: any) {
		const httpHeader = new HttpHeaders().set('tokenkey', token);
		return this.httpClient$
			.post<any>(
				environment.cmsBaseUrl + environment.onDemand.apiVerifyEmail + uid,
				null,
				{ headers: httpHeader }
			)
			.pipe(catchError((error: HttpErrorResponse) => of(error)));
	}

	updateName$(uid: any, firstName: any, lastName: any, thirdPartyUser: any) {
		let params = new HttpParams()
			.set('firstName', firstName)
			.set('lastName', lastName)
			.set('thirdPartyUser', thirdPartyUser);

		return this.httpClient$
			.patch<any>(
				environment.onDemand.baseUrl + environment.onDemand.apiUser + uid,
				params
			)
			.pipe(catchError((error: HttpErrorResponse) => of(error)));
	}

	fetchDefaultAddress$(uid: any) {
		return this.httpClient$
			.get<any>(
				environment.onDemand.baseUrl +
					environment.onDemand.apiUser +
					uid +
					'/addresses'
			)
			.pipe(catchError((error: HttpErrorResponse) => of(error)));
	}

	updateDefaultAddress$(
		emailId: any,
		args: any,
		addressSize: any,
		addressId: any
	) {
		const body = {
			defaultAddress: 'true',
			firstName: args.firstName,
			id: addressId,
			lastName: args.lastName,
			line1: args.address,
			line2: args.address2,
			postalCode: args.zip,
			town: args.city,
			region: { isocode: 'US-' + args.state },
			country: { isocode: 'US' },
		};
		const url =
			addressSize === 0
				? environment.onDemand.baseUrl +
				  environment.onDemand.apiUser +
				  emailId +
				  '/addresses'
				: environment.onDemand.baseUrl +
				  environment.onDemand.apiUser +
				  emailId +
				  '/addresses/' +
				  addressId;
		if (addressSize === 0) {
			return this.httpClient$
				.post<any>(url, body)
				.pipe(catchError((error: HttpErrorResponse) => of(error)));
		}

		// console.log('updateDefaultAddress$', body);
		return this.httpClient$
			.patch<any>(url, body)
			.pipe(catchError((error: HttpErrorResponse) => of(error)));
	}

	addFavorite$(productCode: any, uid: any) {
		let params = new HttpParams().set('productCode', productCode);
		return this.httpClient$
			.post<any>(
				environment.onDemand.baseUrl +
					environment.onDemand.apiUser +
					uid +
					'/wishlist?productCode=' +
					productCode,
				{}
			)
			.pipe(catchError((error: HttpErrorResponse) => of(error)));
	}
	fetchViewFavorites$(uid: any) {
		return this.httpClient$
			.get<any>(
				environment.onDemand.baseUrl +
					environment.onDemand.apiUser +
					uid +
					'/wishlist'
			)
			.pipe(catchError((error: HttpErrorResponse) => of(error)));
	}

	deleteFavorite$(uid: any, productCode: any) {
		return this.httpClient$
			.delete<any>(
				environment.onDemand.baseUrl +
					environment.onDemand.apiUser +
					uid +
					'/wishlist?productCode=' +
					productCode
			)
			.pipe(catchError((error: HttpErrorResponse) => of(error)));
	}

	submitContactForm$(body) {
		return this.httpClient$
			.post<any>(
				'https://api.hsforms.com/submissions/v3/integration/submit/2048593/7657b86b-e8b0-42ea-b2ae-79813ba1f706',
				body
			)
			.pipe(catchError((error: HttpErrorResponse) => of(error)));
	}

	public getOrderHistory$(emailId): Observable<any> {
		const url =
			environment.onDemand.baseUrl +
			environment.onDemand.apiUser +
			emailId +
			'/orders/';

		return this.httpClient$
			.get<any>(url)
			.pipe(catchError((error: HttpErrorResponse) => error.message));
	}

	public getOrderDetails$(emailId, orderCode): Observable<any> {
		const url =
			environment.onDemand.baseUrl +
			environment.onDemand.apiUser +
			emailId +
			'/orders/' +
			orderCode;

		return this.httpClient$
			.get<any>(url)
			.pipe(catchError((error: HttpErrorResponse) => error.message));
	}
}
