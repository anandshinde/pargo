import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import {
	concatMap,
	delay,
	retryWhen,
	switchMap,
	take,
	timeout,
} from 'rxjs/operators';
import { BehaviorSubject, iif, Observable, of, throwError } from 'rxjs';

import { StorageService } from './storage.service';
import { AuthApiService } from '@core/http/auth-api.service';
import { StorageKeys } from '@shared/constants';
import { AuthToken, UserState } from '@shared/interfaces';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private isloggedIn: boolean;

	public baseUserState: UserState = {
		anonymous: true,
		user_id: null,
		access_token: null,
		expires_in: null,
		scope: null,
		token_type: null,
		token_gen: null,
		remember_me: null,
	};

	public userState$: BehaviorSubject<UserState> = new BehaviorSubject<UserState>(
		this.baseUserState
	);

	constructor(private storage: StorageService, private api$: AuthApiService) {
		this.isloggedIn = false;
	}

	public getUserState$(): Observable<UserState> {
		return this.storage.getItem(StorageKeys.userState);
	}

	private storeUserState(state) {
		this.storage.setItem(StorageKeys.userState, state);
	}

	public timeToRefreshToken(token_gen): boolean {
		if (!token_gen) {
			return true;
		}
		console.log('[TOKEN EXPIRES AT]:', new Date(token_gen).toLocaleString());
		console.log('[CURRENT]:', new Date().toLocaleString());

		return token_gen <= Date.now();
	}

	public getCurrentUserState(): Observable<UserState> {
		return this.storage.getItem(StorageKeys.userState);
	}

	public updateUserState$(
		newState: UserState,
		from = 'anonymous'
	): Observable<UserState> {
		return this.getUserState$().pipe(
			take(1),
			switchMap((currentState: UserState) => {
				console.log('[UPDATE USER] initiator:', from);
				const state = {
					...currentState,
					...newState,
				};

				this.storeUserState(state);
				return of(state);
			})
		);
	}

	public getAuthToken$(): Observable<any | HttpErrorResponse> {
		return this.api$.getAuthTokenApi$().pipe(
			// request should not take too long...
			timeout(3000),
			// if there is an error, try up to two more times then bail...
			retryWhen((errors) =>
				errors.pipe(
					concatMap((e, i) => {
						return iif(
							() => i > 3,
							throwError(e),
							// Otherwise we pipe this back into our stream and delay the retry
							of(e).pipe(delay(500))
						);
					})
				)
			),
			switchMap((response: AuthToken | HttpErrorResponse) => {
				// If response is a server error...
				if (response instanceof HttpErrorResponse) {
					// If error is ProgressError, return the status text...
					const message =
						response.error instanceof ProgressEvent
							? response.statusText
							: response.error;

					// update the auth token object with error...
					return this.updateUserState$(
						{
							error: true,
							anonymous: true,
							token_gen: Date.now() + 120000,
						},
						'[GET TOKEN]: Error'
					);
				}
				// update the auth token object with result...

				return this.updateUserState$(
					{
						...response,
						anonymous: true,
						token_gen: Date.now() + response.expires_in * 1000,
					},
					'[GET TOKEN]: Success'
				);
			})
		);
	}

	public logUserOut$() {
		return this.updateUserState$(
			{
				anonymous: true,
				access_token: null,
				customer_id: null,
				scope: null,
				user_id: null,
				third_party_user: null,
				expires_in: null,
				error: false,
				guid: null,
			},
			'[LOGOUT]'
		).pipe(take(1));
	}
}
