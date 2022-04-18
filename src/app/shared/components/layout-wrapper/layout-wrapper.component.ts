import {
	ChangeDetectionStrategy,
	Component,
	OnChanges,
	OnInit,
	SimpleChanges,
} from '@angular/core';
import { SimpleComponent } from '@shared/base-classes';

import { HorizAlignment } from '@shared/constants';
import {
	ImageModel,
	LayoutWrapperContent,
	LayoutWrapperContentProps,
	LayoutWrapperPresentation,
	LayoutWrapperPresentationProps,
} from '@shared/interfaces';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
	selector: 'mflooring-layout-wrapper',
	templateUrl: './layout-wrapper.component.html',
	styleUrls: ['./layout-wrapper.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutWrapperComponent
	extends SimpleComponent<LayoutWrapperContent, LayoutWrapperPresentation>
	implements OnChanges
{
	// public backgroundImage: ImageModel;
	// public hasBackground: boolean;
	// public stackInMobile: boolean;
	// public backgroundColorStyle: string;
	// public backgroundImageStyle: string;
	// public contentIsInset: boolean;
	// public isWideAspect: boolean;
	// public backgroundAlignmentClass: string;

	// constructor() {
	// 	super();
	// }

	// ngOnInit() {
	// 	this.stackInMobile = this.presentation?.stackMobile;
	// 	this.isWideAspect = this.presentation?.isWideAspect || true;
	// }

	// ngOnChanges(changes: SimpleChanges) {
	// 	const content = changes?.content?.currentValue;
	// 	const bgColor = this.content?.backgroundColor || null;
	// 	const presentation = changes?.presentation?.currentValue;
	// 	const bgImage = content?.mobileImage || content?.desktopImage;

	// 	this.contentIsInset = presentation?.isInset;
	// 	this.backgroundColorStyle = bgColor || 'transparent';
	// 	this.hasBackground = !!bgImage;
	// 	this.backgroundAlignmentClass = `align-${
	// 		this.presentation?.alignment || HorizAlignment.center
	// 	}`;
	// 	this.backgroundImageStyle = this.hasBackground
	// 		? `url(${bgImage?.original?.url})`
	// 		: 'none';
	// }
	public layoutContent$: Observable<LayoutWrapperContent> = this.content$.pipe(
		map((content) => {
			return {
				...content,
				backgroundColor: content?.backgroundColor || 'transparent',
			};
		})
	);

	public layoutPresentation$: Observable<LayoutWrapperPresentation> =
		this.presentation$.pipe(
			map((presentation) => {
				return {
					...presentation,
				};
			})
		);

	constructor() {
		super();
	}
}
