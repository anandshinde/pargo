import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class FindRetailerApi {
  private _dealerByZip = `${environment.mohawkgroupApiBaseURL}/dealers/findbyzip?`;
	private _dealerUrl = `${environment.mohawkgroupApiBaseURL}/dealers/getbirdeyereviewbyid?businessId=`;
	private _dealerRatings =
		'https://api.birdeye.com/resources/v1/review/businessid/';
	private _dealerBooking =
		'https://soaconnector-prod-www.azurewebsites.net:443/api/ScheduleAppointment';
	private _dealerQuote =
		'https://soaconnector-prod-www.azurewebsites.net:443/api/SubmitQuote';
	private _dealerById = `${environment.mohawkgroupApiBaseURL}/dealers/getbydealerID?&dealerID=`;
	private _dealerReviews = `${environment.mohawkgroupApiBaseURL}/dealers/getdealerwithrating?dealerID=`;
	private _dealerCoupon =
		'https://soaconnector-prod-www.azurewebsites.net:443/api/Coupons';
	private _dealerDetailReviews = `${environment.birdeyeReviewURL}`;

  constructor(private http$: HttpClient) { }

  public fetchDealerUrl(businessId: number): Observable<any> {
		return this.http$.get(`${this._dealerUrl}${businessId}`);
	}

	public fetchDealerRatings(businessId: number, key: number): Observable<any> {
		let apiKey;
		if (key === 1) {
			apiKey = environment.birdeyeApiKey;
		} else if (key === 2) {
			apiKey = environment.birdeyeApiKey2;
		} else {
			apiKey = environment.birdeyeApiKey3;
		}
		return this.http$.get(
			`${this._dealerRatings}${businessId}/summary?api_key=${apiKey}
			&statuses=published&includeNonAggregatedReviews=true`
		);
	}


  public fetchRetailers(query: string): Observable<any> {
		return this.http$.get(`${this._dealerByZip}${query}`);
	}
	public bookAppoinment(appoinmentDetails: object): Observable<any> {
		return this.http$.post(this._dealerBooking, appoinmentDetails);
	}
	public getQuote(quoteDetails: object): Observable<any> {
		return this.http$.post(this._dealerQuote, quoteDetails);
	}
	public fetchRetailerDetails(dealerId: string): Observable<any> {
		return this.http$.get(`${this._dealerById}${dealerId}`);
	}

	public fetchRetailerDistance(dealerId: any, zipcode: any) {
		return this.http$.get(
			`${environment.mohawkgroupApiBaseURL}/dealers/${dealerId}/distance/${zipcode}`
		);
	}

	public fetchRetailerWithReviews(dealerId: number): Observable<any> {
		return this.http$.get(`${this._dealerReviews}${dealerId}&count=3`);
	}

	public fetchDetailReviews(businessId, key) {
		let apiKey;
		if (key === 1) {
			apiKey = environment.birdeyeApiKey;
		} else if (key === 2) {
			apiKey = environment.birdeyeApiKey2;
		} else {
			apiKey = environment.birdeyeApiKey3;
		}
		return this.http$.post(
			`${this._dealerDetailReviews}${businessId}?sindex=0&count=10&api_key=${apiKey}`,
			{
				sources: ['our_website', 'google'],
				ratings: [3, 4, 5],
			}
		);
	}

	public getCoupon(couponRequestDetails: Object): Observable<any> {
		return this.http$.post(this._dealerCoupon, couponRequestDetails);
	}
}
