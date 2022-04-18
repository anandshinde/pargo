import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { AccountApi } from '@core/http/account.api';
import { AuthApiService } from '@core/http';

@Injectable({
	providedIn: 'root'
  })
export class LoginFacade {
	constructor(
		private accountApi: AccountApi,
		private authApi: AuthApiService
	) {}

	loginUser$(args: any): Observable<any> {
		return this.authApi.loginUserIn$(args.uid, args.password).pipe(
			take(1),
			map((response: any) => response)
		);
	}

	forgotPassword$(args: any): Observable<any> {
		return this.accountApi.forgotPassword$(args.uid).pipe(
			take(1),
			map((response: any) => response)
		);
	}

	fetchUser$(args: any): Observable<any> {
		return this.accountApi.fetchUser$(args.uid).pipe(
			take(1),
			map((response: any) => response)
		);
	}
}
