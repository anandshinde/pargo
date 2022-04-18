import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor,
} from '@angular/common/http';
import { NEVER, Observable } from 'rxjs';
import { AuthService } from '@core/services/auth.service';
import { mergeMap, switchMap, retry } from 'rxjs/operators';
import { environment } from '@env/environment';
import { UserState } from '@shared/interfaces';
import { Router } from '@angular/router';
import { CartService } from '@core/services/cart.service';
import { isPlatformServer } from '@angular/common';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
	// Refresh Token Subject tracks the current token, or is null if no token is currently
	// available (e.g. refresh pending).

	private authUrl = environment.onDemand.baseUrl + environment.onDemand.apiAuth;
	private apiUrl =
		environment.onDemand.baseUrl + environment.onDemand.apiUser ||
		environment.onDemand.baseUrl + environment.onDemand.apiForgotPwd ||
		environment.onDemand.baseUrl + environment.onDemand.apiResetPwd;
	private forgotPassUrl =
		environment.onDemand.baseUrl + environment.onDemand.apiForgotPwd;
	private resetPassUrl =
		environment.onDemand.baseUrl + environment.onDemand.apiResetPwd;
	private tokenSecret = environment.onDemand.secret;

	private credentials: string;

	public reqWithHeaders;

	constructor(
		private authService: AuthService,
		private router: Router,
		private cartService: CartService,
		@Inject(PLATFORM_ID) private platformId: any
	) {}

	addAuthToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
		const contentType =
			req.detectContentTypeHeader() ===
			'application/x-www-form-urlencoded;charset=UTF-8'
				? 'application/x-www-form-urlencoded;charset=UTF-8'
				: 'application/json';

		return req.clone({
			setHeaders: {
				Authorization: `Bearer ${token}`,
				'Content-Type': contentType,
			},
		});
	}

	intercept(
		request: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		this.reqWithHeaders = request;

		const authRequest = request.url.includes(this.authUrl);
		const apiRequest = request.url.includes(this.apiUrl);
		const loginRequest = request.url.includes(
			`grant_type=${environment.onDemand.grant_types.password}`
		);
		const forgotPassRequest = request.url.includes(this.forgotPassUrl);
		const resetPassRequest = request.url.includes(this.resetPassUrl);

		// Skip all of this if this is SSR...
		if (!!isPlatformServer(this.platformId)) {
			return next.handle(this.reqWithHeaders);
		}

		this.credentials = btoa(
			`${environment.onDemand.clientId}:${environment.onDemand.secret}`
		);

		if (loginRequest) {
			console.log('[INTERCEPTOR]: Logging in');
			this.reqWithHeaders = request.clone({
				setHeaders: {
					Authorization: `Basic ${this.credentials}`,
					'Content-Type': 'application/x-www-form-urlencoded',
				},
			});
			return next.handle(this.reqWithHeaders);
		}

		if (authRequest) {
			console.log('[INTERCEPTOR]: Auth Request');
			this.reqWithHeaders = request.clone({
				params: request.params
					.append('client_id', 'mohawkflooring')
					.append('client_secret', this.tokenSecret)
					.append('grant_type', 'client_credentials'),
			});
			return next.handle(this.reqWithHeaders);
		}

		if (apiRequest || forgotPassRequest || resetPassRequest) {
			console.log('[INTERCEPTOR]: API Request');
			return this.authService.getUserState$().pipe(
				mergeMap(({ anonymous, token_gen, access_token }: UserState) => {
					if (!anonymous && this.authService.timeToRefreshToken(token_gen)) {
						this.cartService.logOutUser().pipe(
							switchMap(() => {
								this.router.navigate(['login']);
								return NEVER;
							})
						);
					}

					return next.handle(this.addAuthToken(request, access_token));
				})
			);
		}
		return next.handle(this.reqWithHeaders).pipe(retry(1));
	}
}
