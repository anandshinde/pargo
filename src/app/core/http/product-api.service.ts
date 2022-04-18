import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { catchError, map, switchMap, delay } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

import { environment } from '@env/environment';
import { AuthService } from '@core/services/auth.service';

import { ProductDetailResponse, ProductResponse } from '@shared/interfaces/';

@Injectable({
	providedIn: 'root',
})
export class ProductApiService {
	constructor(private http$: HttpClient, private auth$: AuthService) {}

	public addFavorite$(productCode: any, uid: any) {
		const url = `${
			environment.onDemand.baseUrl + environment.onDemand.apiUser + uid
		}/wishlist?productCode=${productCode}`;
		return this.http$
			.post<any>(url, null)
			.pipe(catchError((error: HttpErrorResponse) => of(error)));
	}

	public fetchProductDetails$(
		query: string
	): Observable<ProductResponse[] | HttpErrorResponse> {
		const url = `${environment.seachApiBaseUrl}?${query}`;
		return this.http$.get(url).pipe(
			delay(250),
			map((payload: ProductDetailResponse) => {
				return payload?.response?.docs;
			}),
			catchError((error: HttpErrorResponse) => of(error))
		);
	}

	public fetchProductReviews$(
		item_number
	): Observable<any | HttpErrorResponse> {
		return this.http$
			.get(
				`${environment.bazaarVoice.baseURL}/reviews.json?ApiVersion=5.4&Passkey=${environment.bazaarVoice.passkey}
				&limit=100&Filter=ProductId:${item_number}&Stats=Reviews&Include=Products`
			)
			.pipe(
				map((payload) => {
					return payload;
				}),
				catchError((error: HttpErrorResponse) => of(error))
			);
	}

	public fetchFavorite$(uid: any) {
		const url = `${
			environment.onDemand.baseUrl + environment.onDemand.apiUser + uid
		}/wishlist`;
		return this.http$
			.get<any>(url)
			.pipe(catchError((error: HttpErrorResponse) => of(error)));
	}

	public fetchLocationAPI$(itemNumber: any, location: any) {
		const params = location
			? `&cl=${location.address}&lat=${location.latitude}&lon=${location.longitude}`
			: '';

		const url = `${environment.locationURL + itemNumber}${params}`;

		return this.http$
			.get<any>(url)
			.pipe(catchError((error: HttpErrorResponse) => of(error)));
	}

	public fetchProductFeedAPI$(
		itemNumber: any,
		lat: any = 0,
		long: any = 0,
		address: any
	) {
		const path = `${!!address ? '&cl=' + address : ''}${
			!!lat ? '&lat=' + lat : ''
		}${!!long ? '&long=' + long : ''}`;

		const url = `${environment.productFeedURL}${encodeURI(itemNumber)}${path}`;

		return this.http$.get<any>(url).pipe(
			map((response) => {
				return response;
			}),
			catchError((error: HttpErrorResponse) => {
				return of(error);
			})
		);
	}

	public fetchRealTimeAPI$(
		itemNumber: any,
		lat: any,
		long: any,
		address: any,
		rid: any,
		lid: any
	) {
		const url = `${
			environment.realTimeURL +
			itemNumber +
			'&cl=' +
			address +
			'&lat=' +
			lat +
			'&lon=' +
			long +
			'&rid=' +
			rid +
			'&lid=' +
			lid
		}`;
		return this.http$
			.get<any>(url)
			.pipe(catchError((error: HttpErrorResponse) => of(error)));
	}

	public submitRatingReview$(
		ProductId: any,
		Rating: any,
		ReviewText: any,
		Title: any,
		UserNickName: any
	): Observable<any | HttpErrorResponse> {
		const url = `${
			environment.bazaarVoice.baseURL +
			'/submitreview.json?&apiversion=5.4' +
			'&PassKey=' +
			environment.bazaarVoice.passkey +
			'&ProductId=' +
			ProductId +
			'&Action=submit' +
			'&Rating=' +
			Rating +
			'&Title=' +
			Title +
			'&UserNickName=' +
			UserNickName +
			'&fp' +
			environment.bazaarVoice.fingerprint +
			'&ReviewText=' +
			ReviewText
		}`;
		return this.http$
			.post(url, '')
			.pipe(catchError((error: HttpErrorResponse) => of(error)));
	}
}
