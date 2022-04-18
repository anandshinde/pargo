import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';


@Injectable({
  providedIn: 'root'
})
export class ProductSearchApi {
  private _productSearch = `${environment.productApiBaseURL}&request_type=search&search_type=keyword&q=`;
	private _searchSuggestions = `${environment.autosuggestApi}&request_type=suggest&q=`;

	constructor(private http: HttpClient) {}

	public fetchProducts(query): Observable<any> {
		return this.http.get(
			`${this._productSearch}${query}` +
				`&fl=pid,title,brand,price,sale_price,thumb_image,url,description,collection_name&rows=100&start=0`
		);
	}

	public fetchCollections(query): Observable<any> {
		return this.http.get(
			`${this._productSearch}&efq=collection_name:"${query}"` +
				`&fl=pid,title,brand,price,sale_price,thumb_image,url,description,collection_name&rows=100&start=0`
		);
	}

	public fetchSuggestions(query: string): Observable<any> {
		return this.http.get(
			`${this._searchSuggestions}${query}` + `&catalog_views=mohawk_pergo_na`
		);
	}

	public fetchProductByColorName(name): Observable<any> {
		return this.http.get(
			`${this._productSearch}&q=${name}` +
				`&fl=pid%2Cmanufacturer_product_url%2Ccollection_name%2C
				item_number%2Csku_color%2Csku_ids%2Csku_price%2Csku_sale_price
				&rows=10&start=0`
		);
	}
}
