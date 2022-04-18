import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { BehaviorSubject, Observable } from 'rxjs';

import { WINDOW } from '@shared/utilities/window';

@Injectable({
	providedIn: 'root',
})
export class TourService {
	private _tourId$ = new BehaviorSubject<number>(0);
	constructor(
		@Inject(DOCUMENT) private document: Document,
		@Inject(WINDOW) readonly windowRef: Window
	) {}

	public launchTour() {
		this.continueTour(1);
	}

	public continueTour(id: number) {
		this._tourId$.next(id);
		this.scrollTo(id);
	}

	public exitTour() {
		this._tourId$.next(0);
	}

	public tourId$() {
		return this._tourId$ as Observable<number>;
	}

	public scrollTo(id: number) {
		const el = document
			.getElementById(`${id}`)
			.querySelector('.tour-scroll__target');

		el.scrollIntoView({ behavior: 'smooth' });
	}
}
