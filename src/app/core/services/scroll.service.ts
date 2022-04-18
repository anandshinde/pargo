import { Inject, Injectable } from '@angular/core';
import { WINDOW } from '@shared/utilities/window';
import { BehaviorSubject } from 'rxjs';

export interface ScrollParams {
	baseOffset?: number;
	offset?: number;
	idOverride?: string;
}

@Injectable({
	providedIn: 'root',
})
export class ScrollService {
	public scrollParams$: BehaviorSubject<ScrollParams> = new BehaviorSubject<ScrollParams>(
		{
			baseOffset: 0,
			offset: 0,
			idOverride: null,
		}
	);

	constructor(@Inject(WINDOW) private windowRef: Window) {}

	public setScrollParams(params: ScrollParams) {
		this.scrollParams$.next({
			...this.scrollParams$.getValue(),
			...params,
		});
	}
}
