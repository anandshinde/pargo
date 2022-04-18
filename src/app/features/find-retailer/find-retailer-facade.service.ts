import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';

import { from, of, Observable, BehaviorSubject } from 'rxjs';

import {
	catchError,
	map,
	mergeMap,
	switchMap,
	take,
	toArray,
	tap,
} from 'rxjs/operators';

import {
	FindRetailerApi,
	ProductListApi,
} from '@core/http';

import {
	Retailer,
	RetailerRating,
	RetailerResponse,
	FindRetailerQueryStringConfig,
	RetailerAppoinmentDetails,
	RetailerQuoteDetails,
	RetailerCouponDetails,
} from '@shared/interfaces';

import { FindARetailerFilters, FindARetailerFiltersEdge } from '@shared/constants/label.constants';
import { baseGetByZipQuery } from '@shared/constants';
import {
	getAlternateRetailer,
	getHoursOfOperation,
	isIndependentRetailer,
} from '@shared/utilities/retailer.utilities';
import { processUrlForShopAndDetail } from '@app/shared/utilities/product.utilities';

// const mapPinColor = {
// 	[FindARetailerFilters.homedepot.value]: 'orange',
// 	[FindARetailerFilters.lowes.value]: 'blue',
// };

@Injectable({
	providedIn: 'root',
})
export class FindRetailerFacadeService {
	// Store previous searches in a map: [key: zip, value: payload]
	private searchResultsMap: Map<number, any[]> = new Map();
	private currentZip: number;

	public retailerCollections$ = new BehaviorSubject([]);

	constructor(
		private api: FindRetailerApi,
		private date: DatePipe,
		private productList: ProductListApi
	) {}

	public hasSelectedResultsByZip(zip: number): boolean {
		return this.searchResultsMap.has(zip);
	}

	public findAlternateRetailer(results, aff): any {
		const {
			latitude,
			longitude,
			city,
			state,
			zip,
			address1,
			affiliation,
		} = results.find((result) => {
			return getAlternateRetailer(result, aff);
		});
		return {
			latitude,
			longitude,
			city,
			state,
			zip,
			address: address1,
			affiliation,
		};
	}

	public getStoredResults(zip = null) {
		return this.fetchResults$({
			...baseGetByZipQuery,
			zip,
		}).pipe(take(1));
	}

	public fetchDealerUrl$(dealer: Retailer): Observable<any> {
		const { birdeyebusinessid } = dealer;

		// If there is no Birdeye Business ID, no results are available -- skip.
		if (!birdeyebusinessid) {
			return of(dealer);
		}

		return this.api.fetchDealerUrl(birdeyebusinessid).pipe(
			take(1),
			catchError((error) => of(error)),
			map((payload: RetailerRating | HttpErrorResponse) => {
				// If there is an issue getting the data, return empty review data
				if (payload instanceof HttpErrorResponse) {
					return {
						birdEyeUrl: null,
					};
				}
				return payload;
			}),
			map(({ baseUrl }: RetailerRating) => {
				// Spread the review data into the dealer data and return the new object
				return {
					...dealer,
					birdEyeUrl: baseUrl,
				};
			})
		);
	}

	public fetchDealerRatings$(dealer: Retailer, key: number): Observable<any> {
		const { birdeyebusinessid } = dealer;

		// If there is no Birdeye Business ID, no results are available -- skip.
		if (!birdeyebusinessid) {
			return of(dealer);
		}
		/** Fetch Review Data
		 * @summary we need to process the array of dealers for review data,
		 * 					which needs to be fetched separately.
		 * @method [take] only do this once
		 * @method [catchError] handle any errors
		 * @method [map] project the results into a callback to be merged into the dealer data
		 * **/

		return this.api.fetchDealerRatings(birdeyebusinessid, key).pipe(
			take(1),
			catchError((error) => of(error)),
			map((payload: RetailerRating | HttpErrorResponse) => {
				// If there is an issue getting the data, return empty review data
				if (payload instanceof HttpErrorResponse) {
					return {
						reviewCount: null,
						avgRating: null,
					};
				}
				return payload;
			}),
			map(({ avgRating, reviewCount }: RetailerRating) => {
				// Spread the review data into the dealer data and return the new object
				return {
					...dealer,
					reviewCount,
					averageRating: avgRating,
				};
			})
		);
	}
	public setCurrentZip(zip) {
		this.currentZip = zip;
	}
	public fetchResults$(config: FindRetailerQueryStringConfig): Observable<any> {
		// build query string for request
		const query = this.buildQueryString(config);
		this.setCurrentZip(config.zip);
		// if this zip code has already been searched, return the results from the map
		if (this.searchResultsMap.has(config.zip)) {
			return of(this.searchResultsMap.get(config.zip));
		}
		// if this zip doesn't already exist, fetch the results from the service
		return this.api.fetchRetailers(query).pipe(
			switchMap(({ Dealers }: RetailerResponse) => {
				/** Process retailer results
				 * @summary we need to process the array of dealers for review data,
				 * 					which needs to be fetched separately.
				 * @method [from] emit each item in array separately
				 * @method [mergeMap] load each item fetches each items review data
				 * @method [toArray] collects all items into an array and returns it
				 * **/
				return from(Dealers).pipe(
					mergeMap((dealer: Retailer) => {
						dealer = {
							...dealer,
							collections: this.getCollectionURL(dealer.affiliation),
						};
						return this.fetchDealerRatings$(dealer, 1);
					}),
					mergeMap((dealer: Retailer) => {
						dealer = {
							...dealer,
						};

						if (dealer.reviewCount === null || dealer.averageRating === null) {
							return this.fetchDealerRatings$(dealer, 2);
						} else {
							return of(dealer);
						}
					}),
					mergeMap((dealer: Retailer) => {
						dealer = {
							...dealer,
						};
						if (dealer.reviewCount === null || dealer.averageRating === null) {
							return this.fetchDealerRatings$(dealer, 3);
						} else {
							return of(dealer);
						}
					}),
					mergeMap((dealer: Retailer) => {
						dealer = {
							...dealer,
						};
						return this.fetchDealerUrl$(dealer);
					}),
					toArray()
				);
			}),
			map((results) => {
				/** Store Results
				 * @summary Store results from search in a map (key is the zip code searched) so we don't need to make another request.
				 * **/
				this.searchResultsMap.set(config.zip, results);
				return results;
			}),
			catchError((error) => of(error))
		);
	}

	private buildQueryString(config: FindRetailerQueryStringConfig) {
		const items = Object.entries(config).map((entry) => {
			if (Array.isArray(entry[1])) {
				return entry[1]
					.map((e) => {
						return `&${entry[0]}=${e}`;
					})
					.join('');
			}
			if(entry[0]==='zip'){
				return `${entry[0]}=${entry[1]}`;
			}
			else{
				return `&${entry[0]}=${entry[1]}`;
			}
			
		});
		return items.join('');
	}

	public bookAnAppointment$(appoinmentDetails): Observable<any> {
		/** Fetch Review Data
		 * @summary we need to process the array of dealers for review data,
		 * 					which needs to be fetched separately.
		 * @method [take] only do this once
		 * @method [catchError] handle any errors
		 * @method [map] project the results into a callback to be merged into the dealer data
		 * **/

		return this.api.bookAppoinment(appoinmentDetails).pipe(
			take(1),
			catchError((error) => of(error)),
			map((payload: RetailerAppoinmentDetails | HttpErrorResponse) => {
				// If there is an issue getting the data, return empty review data
				if (payload instanceof HttpErrorResponse) {
					return {
						message: 'An error occurred processing your request.',
						success: false,
					};
				}
				return payload;
			})
		);
	}

	public getRetailerQuote(quoteDetails): Observable<any> {
		return this.api.getQuote(quoteDetails).pipe(
			take(1),
			catchError((error) => of(error)),
			map((payload: RetailerQuoteDetails | HttpErrorResponse) => {
				// If there is an issue getting the data, return empty review data
				if (payload instanceof HttpErrorResponse) {
					return {
						retailerQuote: null,
					};
				}
				return payload;
			}),
			map(({ retailerQuote }: RetailerQuoteDetails) => {
				// Spread the review data into the dealer data and return the new object
				return {
					retailerQuote,
				};
			})
		);
	}
	//getCoupon
	getRetailerCoupon(couponDetails): Observable<any> {
		return this.api.getCoupon(couponDetails).pipe(
			take(1),
			catchError((error) => of(error)),
			map((payload: RetailerCouponDetails | HttpErrorResponse) => {
				// If there is an issue getting the data, return empty review data
				if (payload instanceof HttpErrorResponse) {
					return {
						retailerCoupon: null,
					};
				}
				return payload;
			})
			// map(({ retailerCoupon }: RetailerCouponDetails) => {
			// 	// Spread the review data into the dealer data and return the new object
			// 	return {
			// 		retailerCoupon,
			// 	};
			// })
		);
	}

	public addCustomProperties(results: Retailer[]) {
		return results.map((retailer: Retailer) => {
			const { address1, city, state, zip, affiliation } = retailer;
			const mapPinName ='black';
			return {
				...retailer,
				marker: `assets/images/map-pin-${mapPinName}.svg`,
				directions: `https://www.google.com/maps?saddr=My+Location&daddr=${address1}+${city}+${state}+${zip}`,
			};
		});
	}

	public setMapPins(results: Retailer[]): any {
		return [
			...results.map((result) => {
				return {
					...result,
					lat: result.latitude,
					lng: result.longitude,
					currentHours: getHoursOfOperation(result, this.date),
					independent: isIndependentRetailer(result),
				};
			}),
		];
	}

	public fetchRetailerReviews$(dealerID: any): Observable<any> {

		return this.api.fetchRetailerWithReviews(dealerID).pipe(
			take(1),
			catchError((error) => of(error)),
			map((dealer) => {
				return this.addCustomProperties([dealer]);
			}),
			map((dealer) => {
				return this.setMapPins(dealer)[0];
			}),
			mergeMap((dealer) => {
				return this.fetchDealerUrl$(dealer);
			}),
			mergeMap((dealer) => {
				if (dealer?.reviews?.length !== 3) {
					return this.fetchDetailReviews$(dealer, dealer.birdeyebusinessid, 1);
				} else {
					return of(dealer);
				}
			}),
			mergeMap((dealer) => {
				if (dealer?.reviews?.length !== 3) {
					return this.fetchDetailReviews$(dealer, dealer.birdeyebusinessid, 2);
				} else {
					return of(dealer);
				}
			}),
			mergeMap((dealer) => {
				if (dealer?.reviews?.length !== 3) {
					return this.fetchDetailReviews$(dealer, dealer.birdeyebusinessid, 3);
				} else {
					return of(dealer);
				}
			}),
			map((dealer) => {
				// We bring back >3 reviews because some have no comments.
				// Filter the ones with no comments out, and get the first 3.
				const reviews = dealer?.reviews
					?.filter((review) => {
						return review.comments !== null;
					})
					?.slice(0, 3);

				return (dealer = {
					...dealer,
					reviews,
					collections: this.getCollectionURL(dealer.affiliation),
				});
			})
		);
	}

	public fetchCollections$(collection) {
		return this.productList?.fetchCollections(collection).pipe(
			map((res) => {
				if (res) {
					let collections = !!collection?.includes('')
						? res[0]?.variants
						: res;
					res = collections?.sort((a, b) => {
						let url1 =
							a.manufacturer_product_url.length === 1
								? a.manufacturer_product_url[0]
								: a.manufacturer_product_url;
						let url2 =
							b.manufacturer_product_url.length === 1
								? b.manufacturer_product_url[0]
								: b.manufacturer_product_url;
						return url1?.substring(url1?.lastIndexOf('/') + 1) >
							url2?.substring(url2?.lastIndexOf('/') + 1)
							? 1
							: -1;
					});
					return res[0];
				}
			})
		);
	}

	public getCollectionURL(retailer: string) {
		return this.retailerCollections$.pipe(
			map((collections: any) => {
				const lcase = retailer.replace(/\s/g, '').toLowerCase();
				const key =
					lcase !== 'lowes' && lcase !== 'homedepot' ? 'independent' : lcase;

				return collections[key];
			})
		);
	}

	public fetchDistance$(dealerID, zipcode) {
		return this.api.fetchRetailerDistance(dealerID, zipcode);
	}

	public fetchDetailReviews$(dealer, businessId, apiKey) {
		return this.api.fetchDetailReviews(businessId, apiKey).pipe(
			take(1),
			catchError((error) => of(error)),
			map((payload: Retailer) => {
				// If there is an issue getting the data, return empty review data
				if (payload instanceof HttpErrorResponse) {
					return dealer;
				}

				return {
					...dealer,
					reviews: payload,
				};
			})
		);
	}
}
