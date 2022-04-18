import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { AccountApi } from '@core/http/account.api';

@Injectable({
	providedIn: 'root'
  })
export class ForgotPwdFacade {
	constructor(private accountApi: AccountApi) {}

	resetPassword$(args: any, authToken: any): Observable<any> {
		return this.accountApi.resetPassword$(args.password, authToken).pipe(
			take(1),
			tap(() => {
				// Do what you need to do...
			})
		);
	}
}
