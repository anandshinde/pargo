import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { of, BehaviorSubject } from 'rxjs';
import { catchError, map, switchMap, tap, take } from 'rxjs/operators';

import { BloomreachComponent } from '@app/shared/base-classes';
import { FindRetailerFacadeService } from '@features/find-retailer/find-retailer-facade.service';
import {
	StorageService,
	Eventservice,
	PageMetadataService,
} from '@core/services';
import { Retailer } from '@shared/interfaces';
import { environment } from '@env/environment';
import {
	StorageKeys,
	baseGetByZipQuery,
} from '@shared/constants';

@Component({
  selector: 'mflooring-retailer-details',
  templateUrl: './retailer-details.component.html',
  styleUrls: ['./retailer-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RetailerDetailsComponent extends BloomreachComponent
implements OnInit {
  public retailer$;
	public storeNum;

	constructor(
		public eventservice: Eventservice,
		public storage: StorageService,
		private facade: FindRetailerFacadeService,
		private metaData: PageMetadataService
	) {
		super(eventservice, storage);
	}


	ngOnInit(): void {
		const collections = this.resourceBundleData['retailer.collections'];
		try {
			this.facade.retailerCollections$.next(JSON.parse(collections));
		} catch (e) {
			console.error(
				'There was an error processing collections from resource bundle'
			);
		}
		this.storeNum = this.pageURL.substring(1)?.split('/')[4].toLocaleString();
		this.retailer$ = this.facade.fetchRetailerReviews$(this.storeNum).pipe(
			switchMap((dealer) => {
				const { dealerID } = dealer;
				return this.storage.getItem(StorageKeys.selectedZip).pipe(
					take(1),
					switchMap((zip) => {
						let zipCode = zip;
						if (!zipCode) {
							this.storage.setItem(StorageKeys.selectedZip, dealer.zip);
							zipCode = dealer.zip;
						}

						this.facade.setCurrentZip(zipCode);
						if (!!zipCode) {
							return of(zipCode);
						}
						return this.facade
							.fetchResults$({ ...baseGetByZipQuery, zip: zipCode })
							.pipe(
								take(1),
								map(() => zipCode)
							);
					}),
					switchMap((zip) => {
						return this.facade.fetchDistance$(dealerID, zip).pipe(
							catchError((error) => of(error)),
							map((payload) => {
								// If there is an issue getting the data, return empty distance data
								if (payload instanceof HttpErrorResponse) {
									return {
										distance: null,
									};
								}
								return {
									distance: payload,
								};
							}),
							map(({ distance }: Retailer) => {
								return {
									...dealer,
									distance,
								};
							})
						);
					})
				);
			})
		);

	
		
	}
}
