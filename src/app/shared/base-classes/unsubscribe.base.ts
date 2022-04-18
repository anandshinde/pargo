import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
	providedIn: 'any',
})
export abstract class UnsubscribeOnDestroy implements OnDestroy {
	protected unsubscribe = new Subject();

	ngOnDestroy(): void {
		this.unsubscribe.next();
		this.unsubscribe.complete();
	}
}
