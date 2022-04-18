import { HttpErrorResponse } from '@angular/common/http';
import {
	HostListener,
	Component,
	OnChanges,
	OnInit,
	Input,
	SimpleChanges,
	ChangeDetectionStrategy,
} from '@angular/core';
import { BehaviorSubject, from, of } from 'rxjs';
import { SimpleComponent } from '@shared/base-classes';
import { AuthService } from '@core/services';
import { MyAccountFacade } from '../../../my-account/my-account.facade';
import { map, take, switchMap, mergeMap, toArray } from 'rxjs/operators';
import { UserState } from '@app/shared/interfaces';
import { fromArray } from 'rxjs/internal/observable/fromArray';
import { BreakpointValues } from '@app/shared/constants';
import { BreakpointObserver } from '@angular/cdk/layout';
// import { ProductDetailFacade } from '@app/features/product-detail/product-detail.facade';

@Component({
	selector: 'mflooring-my-account-order-history',
	templateUrl: './my-account-order-history.component.html',
	styleUrls: ['./my-account-order-history.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyAccountOrderHistoryComponent
	extends SimpleComponent<any, any>
	implements OnChanges
{
	public isMobile = this.breakpoint.isMatched(BreakpointValues.mobileMax);

	@HostListener('window:resize', ['$event']) onResize() {
		this.isMobile = this.breakpoint.isMatched(BreakpointValues.mobileMax);
	}

	public ordersMap = new Map();
	public orders$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

	constructor(
		private breakpoint: BreakpointObserver,
		private myAccountFacade: MyAccountFacade,
		public authService: AuthService // private productDetail: ProductDetailFacade
	) {
		super();

		this.authService
			.getUserState$()
			.pipe(
				take(1),
				switchMap(({ user_id }: UserState) => {
					if (!user_id) {
						return of([]);
					}
					return this.myAccountFacade.getOrderHistory$(user_id).pipe(
						take(1),
						switchMap((history: any) => {
							return from(history?.orders || []).pipe(
								mergeMap((order: any) => {
									return this.myAccountFacade
										.getOrderDetails$(user_id, order.code)
										.pipe(
											take(1),
											map((response) => {
												// reduce the payload
												return {
													loaded: false,
													code: order.code,
													date: order?.placed,
													entries: response.entries,
													quantity: response.entries.reduce(
														(acc, entry) => acc + entry.quantity,
														0
													),
													total:
														response.totalPriceWithTax.value +
														response.orderDiscounts.value,
												};
											})
										);
								}),
								toArray()
							);
						}),
						map((orders: any[]) => {
							return this.updateOrderMap(orders).sort((a, b) => {
								let date1: any;
								let date2: any;
								date1 = new Date(a.date);
								date2 = new Date(b.date);
								return date2 - date1;
							});
						})
					);
				})
			)
			.subscribe((orders) => {
				this.orders$.next(orders);
			});
	}

	public fetchProducts(code) {
		const entries = this.ordersMap.get(code).entries;
		const hasAllOrderNames =
			entries.filter((entry) => {
				return !entry.product.name;
			}).length === 0;

		if (hasAllOrderNames) {
			return;
		}

		fromArray(entries)
			.pipe(
				mergeMap((entry: any) => {
					let code = entry?.product?.code;
					return [];
					// this.productDetail.getSavedProductDetails$(code).pipe(
					// 	take(1),
					// 	map((response) => {
					// 		if (response instanceof HttpErrorResponse) {
					// 			return entry;
					// 		}
					// 		const { collection_name, sku_color }: any = response;

					// 		return {
					// 			...entry,
					// 			product: {
					// 				name: collection_name + ' ' + sku_color,
					// 				code: code,
					// 			},
					// 		};
					// 	})
					// );
				}, 1),
				toArray()
			)
			.subscribe((orders: any[]) => {
				const newOrder = {
					...this.ordersMap.get(code),
					loaded: true,
					entries: [...orders],
				};
				this.ordersMap.set(code, newOrder);
				this.orders$.next(
					Array.from(this.ordersMap.values()).sort((a, b) => {
						let date1: any;
						let date2: any;
						date1 = new Date(a.date);
						date2 = new Date(b.date);
						return date2 - date1;
					})
				);
			});
	}

	private updateOrderMap(orders: any[] = []): any[] {
		orders.forEach((order) => {
			this.ordersMap.set(order.code, order);
		});
		return Array.from(this.ordersMap.values());
	}
	ngOnChanges(changes: SimpleChanges) {
		super.ngOnChanges(changes);
	}
}
