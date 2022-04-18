import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformServer, DOCUMENT } from '@angular/common';

import { from, of, Observable, throwError, iif } from 'rxjs';
import {
	catchError,
	concatMap,
	delay,
	retryWhen,
	switchMap,
} from 'rxjs/operators';

import { WINDOW } from '@shared/utilities/window';

@Injectable({
	providedIn: 'root',
})
export class ScriptService {
	constructor(
		@Inject(PLATFORM_ID) private platformId: any,
		@Inject(WINDOW) private windowRef: Window,
		@Inject(DOCUMENT) private documentRef: Document
	) {}

	/** Load Script
	 * Adds script tag to the DOM. Will check whether the script is already
	 * available and try a few times to load it before giving up.
	 *
	 * @param key: string > class or object name to test for. [no spaces or special characters]
	 * @param src: string > url to script
	 * @param retryIn: number > delay in ms before script will try and load again
	 * @param maxRetries: number > number of retry attempts before giving up
	 * @param skipValidation: boolean > skip validating whether the script is available
	 */

	public loadScript(
		key: string,
		src: string,
		retryIn = 1000,
		maxRetries = 4,
		skipValidation = false
	): Observable<boolean | Error> {
		const scriptId = `mohawkflooring_script_${key}`;
		const scriptElem = this.documentRef.getElementById(scriptId);
		// SSR: no window so don't try to load anything
		if (!!isPlatformServer(this.platformId)) {
			return of(false);
		}

		// SUCCESS: script is already loaded and available
		if (!!this.windowRef[key]) {
			return of(true);
		}

		// LOADED: script is loaded and no key was provided to test
		if (!!scriptElem && !!skipValidation) {
			return of(true);
		}

		// LOADED WITH ERROR: script is loaded but cannot be called
		if (!!scriptElem && !this.windowRef[key]) {
			return throwError(new Error(`Script loaded but "${key}" was not found.`));
		}

		// LOAD: script is not available
		return from(this.addScript(src, scriptId)).pipe(
			switchMap(() => {
				let retry = 0;
				return of(null).pipe(
					switchMap(() => {
						if (!!skipValidation) {
							return of(true);
						}

						const script = this.windowRef[key] || false;
						retry++;

						if (!!script) {
							console.log(`Script: "${key}" successfully loaded.`);
							return of(true);
						}

						if (retry < maxRetries) {
							console.log(`Loading script: ${key}. Retry ${retry}`);
							return throwError(retry);
						}
					}),
					retryWhen((errors) => {
						return errors.pipe(
							concatMap((err, i) => {
								return iif(
									() => i > maxRetries,
									throwError(
										new Error(
											`Script loaded but "${key}" was not found after ${maxRetries} attempts.`
										)
									),
									of(err).pipe(delay(retryIn))
								);
							})
						);
					}),
					catchError((error) => {
						return of(error);
					})
				);
			})
		);
	}

	private addScript(src, id): Promise<void> {
		return new Promise((resolve) => {
			let node = this.documentRef.createElement('script');
			node.src = src;
			node.id = id;
			node.type = 'text/javascript';
			node.async = false;
			this.documentRef.getElementsByTagName('BODY')[0].appendChild(node);
			resolve();
		});
	}
}
