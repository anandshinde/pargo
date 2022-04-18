import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { UnsubscribeOnDestroy } from '@shared/base-classes/unsubscribe.base';
import { BehaviorSubject } from 'rxjs';

@Directive()
export abstract class SimpleComponent<T, K>
	extends UnsubscribeOnDestroy
	implements OnChanges
{
	@Input() content: T = null;
	@Input() presentation: K = null;

	public content$: BehaviorSubject<T> = new BehaviorSubject<T>(null);
	public presentation$: BehaviorSubject<K> = new BehaviorSubject<K>(null);

	ngOnChanges(changes: SimpleChanges) {
		this.content$.next(changes.content?.currentValue);
		this.presentation$.next(changes.presentation?.currentValue);
	}
}
