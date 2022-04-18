import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { AccountApi } from '@core/http/account.api';

@Injectable({
	providedIn: 'root',
})
export class CreateAccountFacade {
	constructor(private accountApi: AccountApi) {}

	register$(args: any): Observable<any> {
		delete args['confirmPassword'];
		return this.accountApi.register$(args).pipe(
			take(1),
			tap((response) => {
				// Do what you need to do...
			})
		);
	}
	fetchUser$(args: any): Observable<any> {
		return this.accountApi.fetchUser$(args).pipe(
			take(1),
			tap((response) => {
				// Do what you need to do...
			})
		);
	}

	emailVerify$(args: any, token: any): Observable<any> {
		return this.accountApi.emailVerify$(args, token).pipe(
			take(1),
			tap((response) => {
				// Do what you need to do...
			})
		);
	}
}
