import { Component, ElementRef, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

import { BehaviorSubject, of, Observable } from 'rxjs';
import { map, switchMap, take, takeUntil, tap } from 'rxjs/operators';

import {
	PageMetadataService,
	UrlStateService,
	StorageService,
	Eventservice,
} from '@core/services';
import { BloomreachComponent } from '@shared/base-classes';
import { FindRetailerFacadeService } from '@features/find-retailer/find-retailer-facade.service';
import {
	FindARetailerFilters,
	StorageKeys,
	baseGetByZipQuery,
	FindARetailerFiltersEdge
} from '@shared/constants';
import {
	Retailer,
	RetailerFilterProps,
	LayoutWrapperPresentationProps,
} from '@shared/interfaces';
import { isIndependentRetailer } from '@shared/utilities/retailer.utilities';
import { environment } from '@env/environment';

@Component({
  selector: 'mflooring-find-retailer',
  templateUrl: './find-retailer.component.html',
  styleUrls: ['./find-retailer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FindRetailerComponent extends BloomreachComponent implements OnInit {

  @ViewChild('retailerSearchInput') retailerInput: ElementRef;
	// _currentPage: used to increment the results shown based on
	// clicking the "view more" button

	private _currentPage = 1;

	// Results
	private _results$: BehaviorSubject<Retailer[]> = new BehaviorSubject<
		Retailer[]
	>([]);

	public currentZip$: BehaviorSubject<string> = new BehaviorSubject<string>(
		null
	);

	// Show the view more button:
	// [true] if there are more results,
	// [false] if all are shown
	private _showViewMore: boolean;

	// initial filter object
	private _allFilters = FindARetailerFiltersEdge;

	public isLoading = false;

	public layoutPresentationProps: LayoutWrapperPresentationProps = {
		isInset: true,
	};

	// filter object as Observable
	public allFilters$ = new BehaviorSubject<RetailerFilterProps[]>(
		this.filtersAsArray()
	);

	// selected filter
	public selectedFilter$ = new BehaviorSubject<string>(
		FindARetailerFiltersEdge.nearestlocation.value
	);

	// Zip Code form group
	public zipCodeForm: FormGroup = new FormGroup({
		zip: new FormControl('', []),
	});

	public mapPins = new BehaviorSubject<any>([]);

	public retailerCollections = new BehaviorSubject(null);

  constructor(private route: ActivatedRoute,
		private urlState: UrlStateService,
		private facade: FindRetailerFacadeService,
		public storage: StorageService,
		public eventservice: Eventservice,) {
    super(eventservice, storage);

    // evaluate the query params when the page loads. This runs only once.
		this.route.queryParams
    .pipe(
      take(1),
      switchMap((params) => {
        return this.storage.getItem(StorageKeys.selectedZip).pipe(
          take(1),
          map((zip) => {
            return !params?.zip ? { ...params, zip } : params;
          })
        );
      })
    )
    .subscribe((params: Params) => {
      // ...set the state accordingly
      this.urlState.setQueryParams({
        ...params,
        page: 1,
        filter: params?.retailer || FindARetailerFiltersEdge.nearestlocation.value,
      });
    });

  // watch the url state (service) and react to changes
  this.urlState
    .queryStringParams$()
    .pipe(
      takeUntil(this.unsubscribe),
      tap(() => {
        this.isLoading = true;
      }),
      switchMap((params: Params) => {
        if (!params.zip) {
          return of([]);
        }
        this.currentZip$.next(params?.zip);
        // process the updated params
        this.processUrlState(params);
        const query = {
          ...baseGetByZipQuery,
          zip: params?.zip,
        };

        // SET PAGE META DATA
      //  this.setMetaData(params);

        // ****** API CALL
        // pass the updated params: [zip]
        // process the initial response to get the raw counts
        return this.facade.fetchResults$(query).pipe(
          map((payload: Retailer[] | HttpErrorResponse) => {
            return payload instanceof HttpErrorResponse
              ? []
              : this.processResultsForCounts(payload);
          }),
          map((retailers: Retailer[]) =>
            this.facade.addCustomProperties(retailers)
          )
        );
      })
    )
    .subscribe((results: any) => {
      // update the filters observable
      this.allFilters$.next(this.filtersAsArray());
      // update the results observable
      if (results.length > 0) {
        this.updateResults(results);
      }
      //this._results$.next(results);
      this.isLoading = false;
    });

  }

  // private setMetaData(params) {
	// 	this.metaData.setTitle(`Find a Retailer: ${params.zip}`);
	// 	this.metaData.setPageMetadata({
	// 		'twitter:image': environment.brxmBase + IconPaths.pageMetaDataLogo,
	// 		'og:image': environment.brxmBase + IconPaths.pageMetaDataLogo,
	// 	});
	// }

	// Filter the results based on the selected filter (affiliation)
	private filterResultsByAffiliation(results): Retailer[] {
		return results.filter((result: Retailer) => {
			// ******** FILTER RESULTS
			// if the selected retailer is 'independent'
			if (
				this.selectedFilter$.value === FindARetailerFilters.independent.value
			) {
				return isIndependentRetailer(result);
			} else {
				// return only the results that match the selected retailer
				return (
					this.selectedFilter$.value === FindARetailerFilters.all.value ||
					result.affiliation === this.selectedFilter$.value
				);
			}
		});
	}


	private filterResultsByEdgePremierEdgeSelect(results): Retailer[] {
		return results.filter((result: Retailer) => {
			// ******** FILTER RESULTS
			// if the selected retailer is 'nearestlocation'
			if (
				this.selectedFilter$.value === FindARetailerFiltersEdge.nearestlocation.value
			) {
				return result;
			} else if(this.selectedFilter$.value === FindARetailerFiltersEdge.featuredretailers.value) {
				// return only the results that match the selected retailer
				return (
					this.selectedFilter$.value === FindARetailerFilters.all.value ||
					result.edgePremier === true || result.edgeSelect === true
				);
			}
		});
	}

	// Process the results to get the raw counts
	private processResultsForCounts(results: Retailer[]): Retailer[] {
		return results.map((dealer: Retailer, index, array) => {
			// normalize the result's edgePremier and edgeSelect...
			//dealer.affiliation = dealer.affiliation.replace(/\s/g, '').toLowerCase();
			// set the 'nearestlocation' filter count
			this._allFilters[FindARetailerFiltersEdge.nearestlocation.value].count = array.length;
			// set 'independent' featuredretailers count
			this._allFilters[FindARetailerFiltersEdge.featuredretailers.value].count += Number(
				dealer.edgePremier === true || dealer.edgeSelect === true
			);
			// return the full array
			return dealer;
		});
	}

	// process the url state with the updated query params
	private processUrlState(state): void {
		// update the selected filter
		this.selectedFilter$.next(state?.filter);
		// update the form zip field
		this.zipCodeForm.patchValue({ zip: state?.zip });
	}

	// The filters object is an object but we need to pass it as an array to the UI
	private filtersAsArray(): RetailerFilterProps[] {
		return Object.entries(this._allFilters).map((entry) => entry[1]);
	}

	// expose the showViewMore boolean to the UI
	get showViewMore() {
		return this._showViewMore;
	}

	// get the zip field from the form
	get zip(): AbstractControl {
		return this.zipCodeForm.get('zip');
	}

	// UPDATE RESULTS
	public results$(): Observable<Retailer[]> {
		// watch for changes to the results due to zip code change or "view more" click
		return this._results$;
	}

	public updateResults(results): void {
		const res = this.filterResultsByEdgePremierEdgeSelect([...results]).sort((a, b) => {
			return a.distance < b.distance ? -1 : 1;
		});
		const resSet = res.slice(0, this._currentPage * 3);
		// check to see if the number of results is greater than
		// the items per page times the number of times the user
		// has clicked "view more"

		this._showViewMore = res.length > this._currentPage * 3;

		
		this._results$.next(resSet);

		this.mapPins.next([...this.facade.setMapPins(resSet)]);

		const locationParamsList = resSet.map((item, index) => {
			return {
				location: {
					fakeProductId: 'location',
					locationId: item.dealerID.toString(),
					locationName: item.storeName,
					locationType: 'Retail store',
				},
				isDisplayed: resSet.length > 0,
				itemPosition: index + 1,
			};
		});
		setTimeout(() => {
			this.eventservice.locationListingDisplayed(locationParamsList, {
				resultsCount: results.length,
				displayCount: resSet.length,
				listingType: 'Location',
			});
		}, 3100);
	}

	// Handle clicking the "View More" button
	public viewMore(): void {
		// if all results are shown, return
		if (!this.showViewMore) {
			return;
		}
		// increment the rowMultiplier by 1
		this._currentPage = this._currentPage + 1;
		this.urlState.setQueryParams({
			zip: this.currentZip$.value,
			page: this._currentPage,
			filter: this.selectedFilter$.value,
		});
	}

	// Handle selecting a filter
	public setSelectedFilter(filter: string): void {
		this.urlState.setQueryParams({
			zip: this.currentZip$.value,
			filter,
			page: 1,
		});
	}

	// Handle entering a new zip code
	public searchNewZipCode(): void {
		const { zip } = this.zipCodeForm.value;
		if (zip.length < 5) {
			return;
		}
		this.eventservice.searchPerformed({
			searchTerm: zip.toString(),
			searchTermCorrected: zip.toString(),
			searchType: 'Retailers',
			fakeProductCollection: [
				{
					fakeProductId: `${zip}`,
				},
			],
		});
		this._currentPage = 1;
		this.storage.setItem(StorageKeys.selectedZip, zip);
		this.urlState.setQueryParams({
			zip,
			filter: this.selectedFilter$.value,
			page: 1,
		});
	}

	public clearRetailerSearchInput(): void {
		this.zipCodeForm.reset();
		this.retailerInput.nativeElement.focus();
	}

	public validateZipCode(e: KeyboardEvent) {
		return /^[0-9]$/i.test(e.key);
	}

	ngOnInit(): void {
		localStorage.setItem('googleAPI', this.resourceBundleData['mf.google.apiKey']);
		const collections = this.resourceBundleData['retailer.collections'];
		try {
			this.facade.retailerCollections$.next(JSON.parse(collections));
		} catch (e) {
			console.error(
				'There was an error processing collections from resource bundle'
			);
		}
	}
  

}
