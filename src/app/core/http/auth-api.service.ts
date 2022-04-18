import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '@env/environment';

@Injectable({
	providedIn: 'root',
})
export class AuthApiService {
	constructor(private http$: HttpClient) {}

	public getAuthTokenApi$(): Observable<any | HttpErrorResponse> {
		return this.http$
			.post<any>(
				environment.onDemand.baseUrl + environment.onDemand.apiAuth,
				{}
			)
			.pipe(catchError((error: HttpErrorResponse) => of(error)));
	}

	public loginUserIn$(uid: any, password: any) {
		return this.http$
			.post<any>(
				`${
					environment.onDemand.baseUrl + environment.onDemand.apiAuth
				}?grant_type=${
					environment.onDemand.grant_types.password
				}&username=${uid}&password=${encodeURIComponent(password)}`,
				null
			)
			.pipe(catchError((error: HttpErrorResponse) => of(error)));
	}
}
