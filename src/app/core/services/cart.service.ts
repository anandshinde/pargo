import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { BehaviorSubject, of, Observable, NEVER, combineLatest } from 'rxjs';
import { delay, switchMap, take, tap } from 'rxjs/operators';

import { MessagesService } from '@core/services/messages.service';
import { StorageService } from '@core/services/storage.service';
import { Eventservice } from '@core/services/events.service';

import {
	AddToCartResponse,
	Cart,
	CartEntry,
	CartState,
	HybrisHttpErrorResponse,
	UserState,
} from '@shared/interfaces';
import { AuthService } from '@core/services/auth.service';
import { ProductService } from './product.service';
import { CartApiService } from '../http/cart-api.service';

const messageErrorProps = {
	isError: true,
	duration: 12000,
	autoClose: true,
};

@Injectable({
	providedIn: 'root',
})
export class CartService {
	private _cartState: CartState = {
		guid: null,
		userId: null,
		cartId: null,
		totalItems: 0,
		totalPrice: 0,
		orderDiscounts: null,
		newItem: null,
		allCartItems: [],
		hasCart: false,
		anonymous: true,
	};

	private recentProduct = new BehaviorSubject<boolean>(false);
	private _cartState$: BehaviorSubject<CartState> =
		new BehaviorSubject<CartState>(this._cartState);

	private guid = null;
	private productname = null;
	public recentProduct$ = this.recentProduct.asObservable();

	constructor(
		private auth$: AuthService,
		private http$: HttpClient,
		private messages: MessagesService,
		private router: Router,
		public storage: StorageService,
		public eventservice: Eventservice,
		private productService: ProductService,
		private cartApi: CartApiService
	) {}

	public getMiniCartState(): CartState {
		return this._cartState$.getValue();
	}

	public getCurrentCartState(): CartState {
		return this._cartState$.getValue();
	}

	public productExistsInCart$(
		skuid: string
	): Observable<{ inCart: boolean; entryNumber: number; skuid: string }> {
		return this.getCartState$(false).pipe(
			take(1),
			switchMap((state: CartState) => {
				const product = state.allCartItems.filter((item: CartEntry) => {
					return item.product?.code === skuid;
				})[0];

				return of({
					inCart: !!product,
					entryNumber: product?.entryNumber,
					skuid: skuid,
				});
			})
		);
	}
	public getCartState$(hasDetail: boolean = false): Observable<CartState> {
		return this._cartState$.pipe(
			switchMap((state: CartState) => {
				if (!state.allCartItems.length || !hasDetail) {
					return of(state);
				}
				return this.productService
					.updateCartItemsWithDetails$(state)
					.pipe(take(1));
			})
		);
	}

	private _getCartAndUser$: Observable<[CartState, UserState]> = combineLatest([
		this.getCartState$(false),
		this.auth$.getUserState$(),
	]).pipe(take(1));
	public removeProductFromCart$(entryNumber: number): Observable<any> {
		let name, color;
		return this._getCartAndUser$.pipe(
			take(1),
			switchMap(([cartState, userState]: [CartState, UserState]) => {
				return this.cartApi
					.removeProductFromCartApi$(cartState, entryNumber, userState)
					.pipe(
						take(1),
						switchMap((response: any) => {
							// deleting an item returns nothing, so this is success...
							if (response === 'success') {
								this.productService
									.getProductInformationBySku$(
										cartState.allCartItems[entryNumber]
									)
									.pipe(take(1))
									.subscribe((item) => {
										name = `${item?.details?.brand}`;
										color = item?.details?.color;
										this.messages.setResponseMessage({
											message: `${name} in ${color} removed from your cart`,
											isError: false,
											duration: 4000,
											autoClose: true,
										});
										this.eventservice.productRemovedfromCart({
											product: [
												{
													productInfo: {
														productNumber: item.details.image[0].substring(
															item.details.image[0].lastIndexOf('/') + 1,
															item.details.image[0].indexOf('_')
														),
														productID: item.details.brand,
														brand: 'Pergo',
														name: `${item.details.brand} ${item.details.color}`,
														isSample: 'true',
														sku: item.product.code,
														productLine: item.details.brand,
														trademarkedTechnology:
															this.eventservice.detectTrademarkedTech(
																item.details.brand
															),
														color: item.details.color,
													},
													price: {
														priceTier: 'Good',
													},
												},
											],
										});
									});

								if (userState.anonymous) {
									return this.fetchExistingAnonymousCart$(cartState.guid).pipe(
										take(1)
									);
								}
								// fetch the updated cart from Hybris
								return this.fetchExistingAuthenticatedCart$(
									cartState.guid
								).pipe(take(1));
							}

							if (response instanceof HttpErrorResponse) {
								this.messages.setResponseMessage({
									message: response.error.errors[0].message,
									...messageErrorProps,
								});
								return NEVER;
							}

							return this.getCartState$(false);
						})
					);
			})
		);
	}
	public fetchExistingAnonymousCart$(guid) {
		return this.cartApi.fetchExistingCartApi$(guid, null, true).pipe(
			take(1),
			switchMap((existingCart: Cart | HttpErrorResponse) => {
				if (existingCart instanceof HttpErrorResponse) {
					return this.createNewAnonymousCart().pipe(take(1));
				}

				return this.updateCartState$(
					{
						guid: existingCart?.guid,
						cartId: existingCart?.code,
						allCartItems: existingCart?.entries || [],
						orderDiscounts: existingCart.orderDiscounts,
						totalPrice: existingCart.totalPrice?.value,
						totalItems: existingCart.totalItems,
						anonymous: true,
						hasCart: true,
						newItem: null,
						userId: null,
					},
					'[FETCH CART]: Anonymous'
				);
			})
		);
	}

	// UPDATE STATE

	private _updateCartState$(newState: CartState, from): Observable<CartState> {
		return this.auth$.getUserState$().pipe(
			take(1),
			switchMap((userState: UserState) => {
				const { newItem, updateItem } = newState;
				const cartState = this._cartState$.getValue();

				// get the current items in the cart..
				// sometimes, we will pass back the current state from Hybris.
				// Use that when it's there
				const currentCartItems = newState.allCartItems
					? [...newState.allCartItems]
					: [...cartState.allCartItems];

				// If there are any items to be updated.
				// First update it, then remove it if it's 0
				const updatedItems = !!updateItem
					? currentCartItems
							.map((item: CartEntry) => {
								if (item.entryNumber === updateItem.entryNumber) {
									return { ...item, ...updateItem };
								}
								return item;
							})
							.filter((item) => item.quantity > 0)
					: currentCartItems;

				// update the cart entries...
				// if there is no item to add, just return the existing entries
				// if the cart is empty and there is an item to add, just add it

				const entries = !!newItem
					? [...updatedItems, newItem]
					: [...updatedItems];

				const totals = entries.reduce(
					(a: any, c) => {
						return {
							totalItems: a.totalItems + c.quantity,
							totalPrice: a.totalPrice + c.totalPrice?.value,
						};
					},
					{
						totalPrice: 0,
						totalItems: 0,
					}
				);

				// spread the updated entries into the updated data...
				const updatedData = {
					...newState,
					...totals,
					allCartItems: [...entries],
					userId: userState?.user_id || null,
				};

				const updatedCart = {
					...cartState,
					...updatedData,
				};

				// update the cart state...
				this._cartState$.next(updatedCart);

				this.auth$
					.updateUserState$(
						{
							guid: updatedCart.guid,
						},
						'Cart Update - GUID'
					)
					.pipe(take(1))
					.subscribe();
				return this.getCartState$(false);
			})
		);
	}

	public updateCartState$(newState: CartState, from = 'anonymous') {
		return this._updateCartState$(newState, from).pipe(take(1));
	}

	public createNewAnonymousCart() {
		return this.cartApi.createNewCartApi$().pipe(
			take(1),
			switchMap((anonymousCart: Cart | HttpErrorResponse) => {
				if (anonymousCart instanceof HttpErrorResponse) {
					this.messages.setResponseMessage({
						message: anonymousCart.error.errors[0].message,
						...messageErrorProps,
					});
					return NEVER;
				}

				return this.updateCartState$(
					{
						guid: anonymousCart?.guid,
						cartId: anonymousCart?.code,
						allCartItems: anonymousCart?.entries || [],
						orderDiscounts: anonymousCart.orderDiscounts,
						totalPrice: anonymousCart.totalPrice?.value,
						totalItems: anonymousCart.totalItems,
						anonymous: true,
						hasCart: true,
						newItem: null,
						userId: null,
					},
					'[CREATE CART]: Anonymous'
				);
			})
		);
	}

	public fetchExistingAuthenticatedCart$(guid: string): Observable<any> {
		return this.auth$.getUserState$().pipe(
			take(1),
			switchMap(({ user_id }: UserState) => {
				return this.cartApi.fetchExistingCartApi$(guid, user_id, false).pipe(
					take(1),
					switchMap((response: Cart | HttpErrorResponse) => {
						if (response instanceof HttpErrorResponse) {
							return this.createNewAuthenticatedCart$(user_id).pipe(take(1));
						}

						return this.updateCartState$(
							{
								guid: response?.guid,
								cartId: response?.code,
								allCartItems: response?.entries || [],
								orderDiscounts: response.orderDiscounts,
								anonymous: false,
								hasCart: true,
								newItem: null,
								userId: user_id,
							},
							'[FETCH CART]: Authenticated'
						);
					})
				);
			})
		);
	}

	public createNewAuthenticatedCart$(user_id: string): Observable<CartState> {
		return this.cartApi.createNewCartApi$(user_id).pipe(
			take(1),
			switchMap((response: Cart | HttpErrorResponse) => {
				if (response instanceof HttpErrorResponse) {
					this.messages.setResponseMessage({
						message: response.error.errors[0].message,
						...messageErrorProps,
					});
					return NEVER;
				}
				return this.updateCartState$(
					{
						guid: response?.guid,
						cartId: response?.code,
						allCartItems: response?.entries || [],
						orderDiscounts: response.orderDiscounts,
						anonymous: false,
						hasCart: true,
						newItem: null,
						userId: user_id,
					},
					'[CREATE CART]: Authenticated'
				);
			})
		);
	}
	// ADD/REMOVE/UPDATE
	public addProductToCart$(data: any): Observable<any> {
		const { quantity = 1, skuid } = data;

		const body = {
			product: {
				code: skuid,
			},
			quantity,
		};

		return this._getCartAndUser$.pipe(
			take(1),
			switchMap(([cartState, userState]: [CartState, UserState]) => {
				// If the cart is anonymous...
				if (userState.anonymous) {
					return this.cartApi.addProductToCartApi$(cartState, body, true).pipe(
						take(1),
						switchMap(
							(
								addToCartResponse: AddToCartResponse | HybrisHttpErrorResponse
							) => {
								if (addToCartResponse instanceof HttpErrorResponse) {
									const error = addToCartResponse.error?.errors[0];

									if (error && error.reason === 'notFound') {
										return this.fetchExistingAnonymousCart$(
											cartState.guid
										).pipe(
											take(1),
											switchMap(() => {
												return this.addProductToCart$(data);
											})
										);
									}

									this.messages.setResponseMessage({
										message: addToCartResponse.error.errors[0].message,
										...messageErrorProps,
									});
									return NEVER;
								}
								console.log(`[ADD TO CART]: Added:`, addToCartResponse);
								return of(addToCartResponse);
							}
						)
					);
				}

				return this.cartApi
					.addProductToCartApi$(cartState, body, userState.anonymous)
					.pipe(take(1));
				// ADD AUTHENTICATED HERE...
			}),
			switchMap((response: AddToCartResponse) => {
				if (response instanceof HttpErrorResponse) {
					this.messages.setResponseMessage({
						message: response.error.errors[0].message,
						...messageErrorProps,
					});
					return NEVER;
				}

				if (!response.quantityAdded || response.statusCode !== 'success') {
					this.messages.setResponseMessage({
						message: response.statusCode,
						...messageErrorProps,
					});
					return NEVER;
				}

				return of(response);
			}),
			switchMap((response: AddToCartResponse) => {
				var flag = false;
				// To update cart if product already exists
				this._cartState$.getValue().allCartItems.forEach((element) => {
					if (element.product.code === response.entry.product.code) {
						flag = true;
					}
				});
				if (flag) {
					return this.updateCartState$({ updateItem: response.entry });
				}
				return this.updateCartState$(
					{
						newItem: response.entry,
					},
					'Add Product To Cart'
				);
			})
		);
	}
	public logOutUser(): Observable<CartState> {
		return this.auth$.logUserOut$().pipe(
			switchMap(() => {
				return this.createNewAnonymousCart().pipe(take(1));
			})
		);
	}
}
