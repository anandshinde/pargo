import {
	Component,
	Input,
	OnChanges,
	OnInit,
	SimpleChanges,
	HostListener,
	ChangeDetectionStrategy
} from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import {
	map,
	mergeMap,
	switchMap,
	take,
	takeUntil,
	toArray,
	delay,
} from 'rxjs/operators';
import { BehaviorSubject, Observable, of } from 'rxjs';

import { AuthService, CartService, MessagesService } from '@app/core/services';
import { SimpleComponent } from '@shared/base-classes';
// import { CartModalComponent } from '@shared/components';
import {
	getCollectionName,
	processUrlForShopAndDetail,
} from '@shared/utilities/product.utilities';
import { getCartPosition } from '@shared/utilities/cart.utilities';
import { MyAccountFacade } from '../../../my-account/my-account.facade';
// import { ProductDetailFacade } from '@features/product-detail/product-detail.facade';
import { UserState } from '@shared/interfaces';
import { fromArray } from 'rxjs/internal/observable/fromArray';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material/dialog';
import { breakpoints } from '@shared/constants';
import { CartModalComponent } from '@app/shared/components/cart-modal/cart-modal.component';

@Component({
	selector: 'mflooring-my-account-favorites',
	templateUrl: './my-account-favorites.component.html',
	styleUrls: ['./my-account-favorites.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyAccountFavoritesComponent
	extends SimpleComponent<any, any>
	implements OnChanges, OnInit
{
	@Input() collections: string;
	private collectionLogos;
	private favoritesMap = new Map();

	private favoritesMap$ = new BehaviorSubject<Map<string, any>>(
		this.favoritesMap
	);
	public favorites$: Observable<any>;

	public isMobile: boolean;

	constructor(
		private cartService: CartService,
		private authService: AuthService,
		private myAccountFacade: MyAccountFacade,
		private messages: MessagesService,
		// private productDetailFacade: ProductDetailFacade,
		private dialog: MatDialog,
		private breakpoint: BreakpointObserver
	) {
		super();

		this.favorites$ = this.favoritesMap$.pipe(
			takeUntil(this.unsubscribe),
			switchMap((favMap) => {
				const favorites = Array.from(favMap.values());
				if (favorites.length === 0) {
					return of(favorites);
				}
				return fromArray(favorites).pipe(
					mergeMap((favorite) => {
						if (!!favorite.details) {
							return of(favorite);
						}
						return [];
						// this.productDetailFacade
						// 	.getSavedProductDetails$(favorite?.productCode)
						// 	.pipe(
						// 		delay(200),
						// 		take(1),
						// 		map((response) => {
						// 			if (response instanceof HttpErrorResponse) {
						// 			}
						// 			const {
						// 				collection_name,
						// 				image,
						// 				sku_swatch_images,
						// 				manufacturer_product_url,
						// 				sku_color,
						// 				brand,
						// 			}: any = response;

						// 			favorite.details = {
						// 				collection_logo: this.collectionLogos[
						// 					getCollectionName(collection_name)
						// 				],
						// 				image,
						// 				sku_swatch_images,
						// 				sku_color,
						// 				pdp_url: processUrlForShopAndDetail(
						// 					manufacturer_product_url,
						// 					collection_name
						// 				),
						// 				brand,
						// 			};

						// 	return favorite;
						// })
						// );
					}, 2),
					toArray()
				);
			})
		);

		this.isMobile = this.onResize();
	}

	ngOnInit(): void {
		// this.favorites$.subscribe(foo => {
		// 	console.log('favorites$favorites$favorites$favorites$favorites$',foo)
		// })

		this.collectionLogos = JSON.parse(this.collections);
	}

	ngOnChanges(changes: SimpleChanges) {
		const {
			content: {
				currentValue: { favorites },
			},
		} = changes;
		if (!!favorites) {
			this.initMapOfFavorites(Array.isArray(favorites) ? favorites : []);
		}
	}

	// initialize the array of favorites as a map
	private initMapOfFavorites(arr: any[]): void {
		arr.forEach((fav) => {
			this.favoritesMap.set(fav.productCode, fav);
		});
		// update the observable
		this.favoritesMap$.next(this.favoritesMap);
	}

	public deleteFavorite(productCode) {
		return this.authService
			.getUserState$()
			.pipe(
				take(1),
				switchMap((userState: UserState) => {
					return this.myAccountFacade
						.deleteFavoriteProduct$(userState.user_id, productCode)
						.pipe(take(1));
				})
			)
			.subscribe((resp) => {
				if (resp instanceof HttpErrorResponse) {
					this.messages.setResponseMessage({
						message: `Oops, something went wrong! Please try again: ${
							resp.error?.error_description || resp.status
						}`,
						isError: true,
						duration: 4000,
						autoClose: true,
					});
				} else {
					// remove favorite
					const deletedFavDetails = this.favoritesMap.get(productCode);
					this.favoritesMap.delete(productCode);
					// update the observable
					this.favoritesMap$.next(this.favoritesMap);

					this.messages.setResponseMessage({
						message: `${deletedFavDetails.details.brand} in ${deletedFavDetails.details.sku_color} deleted from favorites`,
						isError: false,
						duration: 4000,
						autoClose: true,
					});
				}
			});
	}

	public isInCart$(skuid): Observable<any> {
		return this.cartService.productExistsInCart$(skuid).pipe(
			map((item) => {
				return item.inCart;
			})
		);
	}

	public handleCartButtonClick(event, { productCode: skuid }): void {
		this.cartService
			.productExistsInCart$(skuid)
			.pipe(
				take(1),
				switchMap((response) => {
					if (response.inCart) {
						return this.cartService
							.removeProductFromCart$(response.entryNumber)
							.pipe(take(1));
					}

					return this.cartService.addProductToCart$({ skuid }).pipe(take(1));
				})
			)
			.subscribe((response: any) => {
				this.openCartDialog();
				console.log('[MY ACCOUNT FAVORITES]', response);
			});
	}

	public openCartDialog(): void {
		this.dialog
			.open(CartModalComponent, {
				data: this.cartService.getCurrentCartState(),
				panelClass: ['custom-modalbox', 'cart-modal', 'sample-added'],
				position: getCartPosition(this.isMobile),
			})
			.afterOpened()
			.subscribe(() => {
				setTimeout(() => {
					this.dialog.closeAll();
				}, 5000);
			});
	}

	@HostListener('window:resize', ['$event']) onResize() {
		this.isMobile = this.breakpoint.isMatched(breakpoints.mobileMax);
		return this.isMobile;
	}
}
