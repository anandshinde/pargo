import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import {
	CanActivate,
	ActivatedRouteSnapshot,
	RouterStateSnapshot,
	UrlTree,
	Router,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { delay, switchMap, take } from 'rxjs/operators';

import { AuthService, CartService } from '@core/services';
import { UserState } from '@shared/interfaces';
import { isPlatformServer } from '@angular/common';

@Injectable({
	providedIn: 'root',
})
export class AccountGuard implements CanActivate {
	constructor(
		private cartService: CartService,
		private authService: AuthService,
		private router: Router,
		@Inject(PLATFORM_ID) private platformId: any
	) {}
	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<boolean | UrlTree> {
		const isMyAccount = state.url.includes('my-account');
		const isLogin = state.url.includes('login');
		const isCheckout = state.url.includes('checkout');

		if (!!isPlatformServer(this.platformId)) {
			return of(true);
		}

		return this.authService.getUserState$().pipe(
			delay(250),
			take(1),
			switchMap((userState: UserState) => {
				return !!userState
					? of(userState)
					: this.authService.updateUserState$(
							this.authService.baseUserState,
							'[AUTH GUARD]'
					  );
			}),
			switchMap((userState: UserState) => {
				const refreshToken = this.authService.timeToRefreshToken(
					userState?.token_gen
				);

				if (!!refreshToken) {
					console.log('[AUTH GUARD]: Refresh Token');
					return this.authService.getAuthToken$().pipe(take(1));
				}

				return of(userState);
			}),
			switchMap((userState: UserState) => {
				if (
					(isMyAccount && userState.anonymous) ||
					(isCheckout && userState.anonymous)
				) {
					this.router.navigateByUrl('/login').then(() => {
						return of(false);
					});
				}

				if (isLogin && !userState.anonymous) {
					this.router.navigateByUrl('/my-account').then(() => {
						return of(false);
					});
				}

				if (
					isCheckout &&
					!this.cartService.getCurrentCartState().allCartItems.length
				) {
					this.router.navigateByUrl('/my-cart').then(() => {
						return of(false);
					});
				}
				return of(true);
			})
		);
	}
}
