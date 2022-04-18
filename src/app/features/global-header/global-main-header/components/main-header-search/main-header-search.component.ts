import {
	ChangeDetectionStrategy,
	Component,
	Inject,
	Input,
	OnInit,
} from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import {
	Product,
	AutoSuggestResponse,
	ProductDetail,
} from '@shared/interfaces/featured-component-props.interface';
import { catchError, switchMap, map, debounceTime, take } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { Eventservice } from '@app/core/services';
import { MatDialogRef } from '@angular/material/dialog';
import { createOfflineCompileUrlResolver } from '@angular/compiler';

import { ProductSearchApi } from '@app/core/http';
import { processUrlForShopAndDetail } from '@app/shared/utilities/product.utilities';

@Component({
	selector: 'mflooring-main-header-search',
	templateUrl: './main-header-search.component.html',
	styleUrls: ['./main-header-search.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainHeaderSearchComponent {
	public collectionName;
	public query = new Subject();
	public productTitle = new Subject();
	public qs;
	public query$: BehaviorSubject<string> = new BehaviorSubject<string>(null);
	public filteredProducts: Observable<AutoSuggestResponse>;
	public searchForm: FormGroup = new FormGroup({
		search: new FormControl('', []),
	});
	public pid$: BehaviorSubject<string> = new BehaviorSubject<string>(null);
	private _product$: BehaviorSubject<any> = new BehaviorSubject<ProductDetail>(
		null
	);
	private baseSearchResults = {
		queryContext: {
			originalQuery: '',
		},
		suggestionGroups: [
			{
				searchSuggestions: [],
			},
		],
	};
	public showCTA = false;

	constructor(
		@Inject(DOCUMENT) private document: Document,
		public dialogRef: MatDialogRef<MainHeaderSearchComponent>,
		private autosuggestAPI: ProductSearchApi,
		private router: Router,
		private route: ActivatedRoute,
		private eventservice: Eventservice
	) {}

	ngOnInit(): void {
		this.filteredProducts = this.searchForm.get('search').valueChanges.pipe(
			switchMap((value) => {
				this.showCTA = value.length > 3;
				return value.length < 3
					? of(this.baseSearchResults)
					: this.fetchSuggestions(value);
			}),
			debounceTime(250),
			map((response) => {
				const suggestions = response?.suggestionGroups[0]?.searchSuggestions;
				this.showCTA = !!suggestions ? false : true;
				this.query.next(
					`View All Product Results for ${response?.queryContext?.originalQuery}`
				);
				this.qs = response?.queryContext?.originalQuery;
				suggestions?.map((item) => {
					const variant = item?.variants?.filter(
						(variant) => variant?.skuid === item?.skuid
					);
					const index = variant[0]?.manufacturer_product_url[0].lastIndexOf(
						'/'
					);
					const color = variant[0]?.manufacturer_product_url[0]
						.substring(index)
						.slice(1)
						.replace(/-/gi, ' ');
					item.url = processUrlForShopAndDetail(
						variant[0]?.manufacturer_product_url[0],
						variant[0]?.collection_name[0]
					);
					this.collectionName = variant[0]?.collection_name[0];
					item.title =
						variant[0]?.item_number[0] +
						' - ' +
						color +
						' - ' +
						item?.collection_name +
						' - ' +
						item?.composition;

					item.title = item.title.replace(
						new RegExp(this.qs, 'gi'),
						(match) => `<strong>${match}</strong>`
					);
				});
				return suggestions?.slice(0, 4);
			})
		);
	}

	trackBy(index: number, el: any) {
		return el.name;
	}

	get viewResultsFor() {
		return `View All Product Results for ${this.searchForm.value.search}`;
	}

	get search(): AbstractControl {
		return this.searchForm.get('search');
	}

	public fetchSuggestions(query): Observable<any> {
		return this.autosuggestAPI.fetchSuggestions(query).pipe(
			map((payload: AutoSuggestResponse | HttpErrorResponse) => {
				if (payload instanceof HttpErrorResponse) {
					return {
						payload: null,
					};
				}
				return payload;
			}),
			map(({ suggestionGroups, queryContext }: AutoSuggestResponse) => {
				return {
					queryContext,
					suggestionGroups,
				};
			}),
			catchError((error) => of(error))
		);
	}

	public product$(): Observable<ProductDetail> {
		return this._product$ as Observable<ProductDetail>;
	}

	public searchNewProduct() {
		const { search } = this.searchForm.value;
		if (search < 2) {
			return;
		}
		this.dialogRef.close();
		this.router.navigate(['/search'], {
			queryParams: {
				q: search,
			},
		});

		this.eventservice.searchPerformed({
			searchTerm: search,
			searchTermCorrected: search,
			searchType: 'Products',
			fakeProductCollection: [
				{
					fakeProductId: 'location',
				},
			],
		});
	}
}
