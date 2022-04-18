import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class LayoutService {
	public navIsSticky$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
		false
	);

	constructor() {}

	public setNavToSticky() {
		this.navIsSticky$.next(true);
	}

	public setNavToUnsticky() {
		this.navIsSticky$.next(false);
	}
}
