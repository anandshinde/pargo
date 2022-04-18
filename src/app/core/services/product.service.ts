import { Injectable } from '@angular/core';
import {
	CartEntry,
	CartState,
	PLPProduct,
	ProductResponse,
	StoredCollectionProps,
} from '@shared/interfaces';
import {
	getCollectionName,
	processUrlForShopAndDetail,
} from '@shared/utilities/product.utilities';
import { BehaviorSubject, combineLatest, from, Observable, of } from 'rxjs';
import { map, mergeMap, switchMap, take, tap, toArray } from 'rxjs/operators';
import { brsmProductFacets, pdpSearchConfig } from '@shared/constants';
import { environment } from '@env/environment';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductApiService } from '../http/product-api.service';

@Injectable({
	providedIn: 'root',
})
export class ProductService {
	private _collectionLogos;
	private _featuresIcons;

	public _allProductsMap: Map<string, any> = new Map<string, any>();
	public _allSearchesMap: Map<string, any> = new Map<string, any>();
	public _allCollectionsMap: Map<string, any> = new Map<string, any>();

	private _allProductCollectionDocuments: any = {};

	public _productMap: Map<string, any> = new Map<string, any>();

	public _collectionsMap: Map<string, any> = new Map<string, any>();

	private _currentlySelectedProduct$: BehaviorSubject<any> =
		new BehaviorSubject<any>(null);

	public _searchResultSkuid;

	constructor(private productApi: ProductApiService) {}

	set featuresIcons(data) {
		try {
			this._featuresIcons = JSON.parse(data['icons.features']);
		} catch (e) {
			this._featuresIcons = {};
		}
	}

	set collectionLogos(data) {
		try {
			this._collectionLogos = JSON.parse(data['pergo.collections']);
		} catch (e) {
			this._collectionLogos = {};
		}
	}

	set productsMap({ key, value }) {
		this._productMap.set(key, value);
	}

	set currentlySelectedProduct(product) {
		this._currentlySelectedProduct$.next(product);
	}

	public buildCollectionQuery(collection) {
		const config = {
			...pdpSearchConfig,
			...environment.searchParams,
		};
		return Object.entries(config).reduce((a: string, c: any) => {
			a += `&${c[0]}=${c[1]}`;
			return a;
		}, `&efq=collection_name%3A(%22${collection.replace('+', '%2B')}%22)`);
	}

	public buildProductQuery(item_number, filters) {
		const baseConfig = { ...pdpSearchConfig, fl: filters };
		const config = {
			...baseConfig,
			...environment.searchParams,
		};
		return Object.entries(config).reduce((a: string, c: any) => {
			a += `&${c[0]}=${c[1]}`;
			return a;
		}, `q=${item_number}`);
	}

	public fetchProductForCart(skuid) {
		const query = this.buildProductQuery(skuid, brsmProductFacets);
		return this.productApi.fetchProductDetails$(query).pipe(
			take(1),
			map((response) => response[0])
		);
	}

	public getProductsFromAllProducts(items: string[] | string) {
		const map = this._allProductsMap;
		return Array.isArray(items)
			? items.map((item) => {
					const product = map.get(item);
					return !!product ? product : item;
			  })
			: map.get(items);
	}

	public getCollectionFromAllCollections(collection_name: string) {
		const regex = /[\s+]/g;
		const key = regex.test(collection_name)
			? getCollectionName(collection_name)
			: collection_name;
		const collection = this._allCollectionsMap.get(key);

		return !!collection
			? {
					...collection,
					products: [
						...collection.products.map((item_number) => {
							return this._allProductsMap.get(item_number);
						}),
					],
			  }
			: null;
	}

	public processProductCollectionDocuments(data: any[]) {
		if (!Object.keys(this._allProductCollectionDocuments).length) {
			this._allProductCollectionDocuments = data.reduce((a, c) => {
				return {
					...a,
					[getCollectionName(c.collectionName)]: c,
				};
			}, {});
		}
		return this._allProductCollectionDocuments;
	}

	public addCollectionToAllCollections(
		key,
		collection: StoredCollectionProps = null
	) {
		const map = this._allCollectionsMap;
		// map has key...
		if (map.has(key)) {
			return map.get(key);
		}

		// map doesn't have key...
		if (!!collection) {
			map.set(key, collection);
		}

		return collection;
	}

	public getProduct(item_number) {
		return this._allProductsMap.get(item_number) || null;
	}

	public addSearchToAllSearches(key, data = null) {
		if (!key) {
			return null;
		}
		const map = this._allSearchesMap;
		// map has key...
		if (map.has(key)) {
			return map.get(key);
		}
		// map doesn't have key...
		if (!!data) {
			map.set(key, data);
		}
		return data;
	}

	public addProductToAllProducts(item_number, product = null) {
		const map = this._allProductsMap;

		if (map.has(item_number)) {
			return map.get(item_number);
		}

		if (!!product) {
			map.set(item_number, product);
		}

		return product;
	}

	public currentlySelectedProduct$() {
		return this._currentlySelectedProduct$;
	}

	public getProductsFromMap(key) {
		return this._productMap.get(key);
	}

	public getCollectionFromMap(key) {
		return this._collectionsMap.get(key);
	}

	public consolidateProductData(product: PLPProduct) {
		const { variants, ...rest } = product;
		return variants.map((variant) => {
			variant.pdp_url = processUrlForShopAndDetail(
				variant.manufacturer_product_url[0],
				variant.collection_name[0]
			);

			return {
				...rest,
				...variant,
			};
		});
	}

	public updateCartItemsWithDetails$(cartState: CartState) {
		return of(cartState).pipe(
			switchMap((state: CartState) => {
				return from(state.allCartItems).pipe(
					mergeMap((item) => {
						if (!item.details) {
							return this.getProductInformationBySku$(item);
						}
						return of(item);
					}, 4),
					toArray()
				);
			}),
			switchMap((allCartItems: CartEntry[]) => {
				return of({
					...cartState,
					allCartItems,
				});
			})
		);
	}

	//fetchProductForCart
	public getProductInformationBySku$(cartItem: CartEntry) {
		// First, check to see if we already have the data...
		const allProds = Array.from(this._allProductsMap.values());
		const thisProduct: any = allProds.filter(
			(item) => item.skuid === cartItem.product.code
		)[0];

		// If we do not already have it, we need to go get it...
		if (!thisProduct) {
			return this.fetchProductForCart(cartItem?.product?.code).pipe(
				take(1),
				switchMap((product: ProductResponse) => {
					if (product instanceof HttpErrorResponse) {
						return of(null);
					}

					// we need to grab the info off of the variant...
					// so filter out our product...
					const variant = product?.variants
						.map((variant) => {
							const newVariant = {
								...variant,
								brand: product?.brand,
								composition: product?.composition,
								collection: product?.collection_name,
								url: processUrlForShopAndDetail(
									product?.manufacturer_product_url,
									product?.collection_name
								),
								logo: !!this._collectionLogos
									? this._collectionLogos[
											getCollectionName(product?.collection_name)
									  ]
									: null,
								image: product?.room_scene,
								pid: product?.pid,
							};

							// ... but add all the variants to our product map so we don't have to do it again...
							this.addProductToAllProducts(variant?.item_number[0], newVariant);
							return newVariant;
						})
						.filter((variant) => variant?.skuid === cartItem?.product?.code);
					// return a new cart object with the details added...
					return of({
						...cartItem,
						details: {
							brand: product?.brand,
							composition: product?.composition,
							feature: variant[0]?.feature,
							collection: product?.collection_name,
							url: processUrlForShopAndDetail(
								product?.manufacturer_product_url,
								product?.collection_name
							),
							logo: !!this._collectionLogos
								? this._collectionLogos[
										getCollectionName(product?.collection_name)
								  ]
								: null,
							image: product?.room_scene,
							color: variant[0]?.sku_color,
							pid: product?.pid,
						},
					});
				})
			);
		}
		// if we already have the product stored, use it...
		return of({
			...cartItem,
			details: {
				brand: thisProduct.brand,
				composition: thisProduct.composition,
				feature: thisProduct.feature,
				url: thisProduct.pdp_url || thisProduct.url,
				logo: thisProduct.collection_logo || thisProduct.logo,
				image: thisProduct.room_scene,
				color: thisProduct.sku_color,
				pid: thisProduct.pid,
			},
		});
	}

	public buildCollections$(data: any[], visualizerPage?: boolean) {
		return of(data).pipe(
			map((data) => {
				return data.reduce((a, res) => {
					this._searchResultSkuid = data[0]?.skuid;
					const cname = getCollectionName(res.collection_name);
					const products = this.consolidateProductData(res).map((prod) => {
						if (!visualizerPage) {
							prod['collection_logo'] = this._collectionLogos[cname];
							prod['feature_icons'] = Object.keys(this._featuresIcons)
								.map((key) => this._featuresIcons[key])
								.filter(
									(obj) => obj.collections && obj.collections.includes(cname)
								);
						}
						if (visualizerPage) {
							return {
								...prod,
							};
						} else {
							return {
								...prod,
								feature: prod.feature,
							};
						}
					});
					a[cname] = a.hasOwnProperty(cname)
						? [...a[cname], ...products]
						: [...products];
					return a;
				}, {});
			}),
			map((collections) => {
				return Object.entries(collections).map(([key, value]) => {
					if (!visualizerPage) {
						return {
							key,
							skuid: this._searchResultSkuid,
							logo: this._collectionLogos[key] || null,
							products: value,
							featuresIcons: Object.keys(this._featuresIcons)
								.map((key) => this._featuresIcons[key])
								.filter(
									(obj) => obj.collections && obj.collections.includes(key)
								),
						};
					} else {
						return {
							key,
							products: value,
						};
					}
				});
			}),
			tap((collections: any[]) => {
				collections?.forEach((collection) => {
					this.addCollectionToAllCollections(collection.key, {
						...collection,
						products: collection?.products?.map((product) => {
							this.addProductToAllProducts(product.item_number[0], product);
							return product.item_number[0];
						}),
					});
				});
			})
		);
	}
}
