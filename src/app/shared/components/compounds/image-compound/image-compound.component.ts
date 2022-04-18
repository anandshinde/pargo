import {
	ChangeDetectionStrategy,
	Component,
	OnChanges,
	SimpleChanges,
} from '@angular/core';

// APP IMPORTS
import { SimpleComponent } from '@shared/base-classes';
import {
	ImageCompoundContentProps,
	ImageCompoundPresentationProps,
} from '@shared/interfaces';
import { breakpoints, BreakpointValues } from '@shared/constants';
import { Eventservice } from '@core/services';
import {
	ImageCompoundContent,
	ImageCompoundImage,
	ImageCompoundPresentation,
	ImageContent,
} from '@app/shared/interfaces/compound-images.interface';
import { Observable } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { brxmMapImageUrl } from '@app/core/bloomreach';

@Component({
	selector: 'mflooring-image-compound',
	templateUrl: './image-compound.component.html',
	styleUrls: ['./image-compound.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageCompoundComponent
	extends SimpleComponent<ImageCompoundContent, ImageCompoundPresentation>
	implements OnChanges
{
	public imageContent$: Observable<ImageCompoundImage> = this.content$.pipe(
		map((content: ImageCompoundContent) => {
			if (!content) {
				return null;
			}
			const { altText, title, link } = {
				...content?.imageMobile,
				...content?.image,
			};
			const imageMobile = content?.imageMobile;
			const image = content?.image;
			const desktop = ImageCompoundComponent.handleImageUrl(image);

			return {
				altText,
				title,
				link,
				desktop,
				mobile: !!imageMobile
					? ImageCompoundComponent.handleImageUrl(imageMobile)
					: desktop,
			};
		})
	);

	public breakpoint: string = BreakpointValues.mobileMax;

	constructor() {
		super();
	}

	private static handleImageUrl(
		image: ImageContent = { imageDAMUrl: null, imageBRE: null }
	) {
		let { imageDAMUrl, imageBRE } = image;
		imageDAMUrl = !!image.imageDAM
			? image.imageDAM
			: !!(image.original && image.original.url)
			? image.original.url
			: image.imageDAMUrl;
		return !!imageDAMUrl
			? imageDAMUrl
			: !!imageBRE
			? brxmMapImageUrl(imageBRE?.original?._links)
			: null;
	}

	ngOnChanges(changes: SimpleChanges) {
		super.ngOnChanges(changes);
		this.content$.subscribe((foo) => {
		});

		this.presentation$
			.pipe(takeUntil(this.unsubscribe))
			.subscribe((presentation: ImageCompoundPresentation) => {
				if (!!presentation && !!Object.keys(presentation).length) {
					this.breakpoint = presentation?.breakpoint;
				}
			});
	}
}
