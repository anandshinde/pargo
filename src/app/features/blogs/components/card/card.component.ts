import {
	animate,
	state,
	style,
	transition,
	trigger,
} from '@angular/animations';
import { Component, OnChanges, OnInit, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import {
	animateVertical,
	animateHorizontal,
} from '@app/shared/animations/animations-simple.animation';
import { SimpleComponent } from '@app/shared/base-classes';
import { BaseSizeNames } from '@app/shared/constants';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
	selector: 'mflooring-card',
	templateUrl: './card.component.html',
	styleUrls: ['./card.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [
		trigger('animateUp', [
			state(
				'outview',
				style({
					transform: 'translateY(40%)',
					opacity: 0,
				})
			),
			state(
				'inview',
				style({
					transform: 'translateY(0)',
					opacity: 1,
				})
			),
			transition('outview => inview', [animate('500ms')]),
			transition('inview => outview', [animate('200ms')]),
		]),
	],
})
export class CardComponent
	extends SimpleComponent<any, any>
	implements OnChanges
{
	public inViewport$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
		false
	);

	constructor() {
		super();
	}

	public isInViewport(bool): void {
		this.inViewport$.next(bool);
	}
	public blogCardData$: Observable<any> = this.content$.pipe(
		map((blog) => {
			return {
				...blog,
			};
		})
	);

	ngOnChanges(changes: SimpleChanges) {
		super.ngOnChanges(changes);
	}
}
