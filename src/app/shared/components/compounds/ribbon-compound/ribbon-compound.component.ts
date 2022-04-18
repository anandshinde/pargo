import { Component, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { SimpleComponent } from '@shared/base-classes';
import {
	ImageCompoundContentProps,
	LinkCompoundContentProps,
	RichTextContentProps,
} from '@shared/interfaces';
import { BehaviorSubject } from 'rxjs';

export interface RibbonComponentContentProps {
	ctaBackground: string;
	ctaContent: RichTextContentProps;
	link: LinkCompoundContentProps;
	logo: ImageCompoundContentProps;
}

@Component({
	selector: 'mflooring-ribbon-compound',
	templateUrl: './ribbon-compound.component.html',
	styleUrls: ['./ribbon-compound.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RibbonCompoundComponent
	extends SimpleComponent<RibbonComponentContentProps, null>
	implements OnChanges {
	public content$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
	public presentation$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

	constructor() {
		super();
	}

	ngOnChanges(changes: SimpleChanges) {
		this.content$.next(changes.content.currentValue);
		this.presentation$.next(changes.presentation.currentValue);
	}
}
