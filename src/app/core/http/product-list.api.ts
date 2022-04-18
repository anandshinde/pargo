import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { catchError, map } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

import { environment } from '@env/environment';
import {
	ProductSearchResponse,
	ProductDetailResponse,
	ProductResponse,
} from '@shared/interfaces';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductListApi {

  private _productSearch = `${environment.productApiBaseURL}&request_type=search&search_type=keyword&q=`;

	constructor(private http$: HttpClient, private auth$: AuthService) {}

	public fetchProductLists$(
		query: string
	): Observable<ProductSearchResponse | HttpErrorResponse> {
		return this.http$.get(`${environment.seachApiBaseUrl}?${query}`).pipe(
			map((results: ProductSearchResponse | HttpErrorResponse) => results),
			catchError((error: HttpErrorResponse) => of(error))
		);
	}

	public fetchCollections(
		query
	): Observable<ProductResponse[] | HttpErrorResponse> {
		const url =
			`${this._productSearch}&efq=collection_name:"${encodeURI(query).replace(
				'+',
				'%2B'
			)}"` +
			`&fl=pid,title,brand,manufacturer_product_url,collection_name,sku_color&rows=100&start=0`;
		return this.http$.get(url).pipe(
			map((payload: ProductDetailResponse) => {
				return payload?.response?.docs;
			}),
			catchError((error: HttpErrorResponse) => of(error))
		);
	}
}
