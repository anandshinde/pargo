import {
	ChangeDetectionStrategy,
	Component,
	HostListener,
	Inject,
	OnDestroy,
	OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { SimpleComponent } from '@shared/base-classes';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BreakpointObserver } from '@angular/cdk/layout';

import { BehaviorSubject, Observable } from 'rxjs';

import { CartService, StorageService } from '@core/services';
import { getCartPosition } from '@shared/utilities/cart.utilities';
import { breakpoints, CartDialog, StorageKeys } from '@shared/constants';
import { CartState } from '@shared/interfaces';
import { map, take } from 'rxjs/operators';

@Component({
	selector: 'mflooring-cart-modal',
	templateUrl: './cart-modal.component.html',
	styleUrls: ['./cart-modal.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartModalComponent
	extends SimpleComponent<any, any>
	implements OnInit
{
	public isMobile = null;
	public recentProduct$ = this.cartService.recentProduct$;
	public textContent = CartDialog;
	public quantity = 1;
	public price = 5;

	private _cartInfo$ = new BehaviorSubject(null);
	public cartInfo$ = this._cartInfo$.pipe(
		map((cartInfo) => {
			return cartInfo;
		})
	);

	@HostListener('window:resize', ['$event']) onResize() {
		const isPrevMobile = this.isMobile;
		this.isMobile = this.breakpoint.isMatched(breakpoints.mobileMax);

		if (isPrevMobile !== this.isMobile) {
			this.dialogRef.updatePosition(getCartPosition(this.isMobile));
		}
	}

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: CartState,
		private breakpoint: BreakpointObserver,
		private cartService: CartService,
		public dialogRef: MatDialogRef<CartModalComponent>,
		public storage: StorageService,
		private router: Router
	) {
		super();
	}

	closeDialog() {
		this.dialogRef.close();
	}

	ngOnInit(): void {
		this._cartInfo$.next(this.data);
		this.isMobile = this.breakpoint.isMatched(breakpoints.mobileMax);
	}

	checkUserLoggedIn() {
		const userState = this.storage.getItem(StorageKeys.userState);
		userState.pipe(take(1)).subscribe((state) => {
			if (state.anonymous) {
				this.router.navigate(['/login'], {
					queryParams: { returnUrl: this.router.url },
				});
			} else if (!state.anonymous) {
				this.router.navigate(['/checkout']);
			}
		});
		this.closeDialog();
	}
}
