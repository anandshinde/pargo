import {
	ChangeDetectionStrategy,
	Component,
	Inject,
	OnInit,
} from '@angular/core';
import { SimpleComponent } from '@shared/base-classes';
import { LinkTargetTypes, ThemeTypes } from '@shared/constants';

import { urlIsExternal } from '@shared/utilities/regex.utilities';
import { ActivatedRoute, Router } from '@angular/router';
import {
	ImageModel,
	ImageCompoundContentProps,
	RichTextContentProps,
	TextTileContentProps,
	TextTilePresentationProps,
} from '@shared/interfaces';
import { WINDOW } from '@shared/utilities/window';

@Component({
	selector: 'mflooring-tile-text-compound',
	templateUrl: './tile-text-compound.component.html',
	styleUrls: ['./tile-text-compound.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TileTextCompoundComponent
	extends SimpleComponent<TextTileContentProps, TextTilePresentationProps>
	implements OnInit
{
	public componentImage: ImageCompoundContentProps;
	public componentText: RichTextContentProps;
	public componentLinkInfo: ImageModel;
	public componentHasLink: boolean;

	public backgroundContent;
	public backgroundPresentation;

	public textContent;
	public textPresentation;

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		@Inject(WINDOW) readonly windowRef: Window
	) {
		super();
	}

	public buttonClick(url, target = LinkTargetTypes.blank): void {
		if (url === null) {
			return;
		}

		const [link, frag] = url.split('#');

		if (urlIsExternal(link)) {
			this.windowRef.open(link, target);
			return;
		}

		void this.router.navigate([link], {
			fragment: frag,
			relativeTo: this.route,
		});
	}

	ngOnInit(): void {
		this.componentText = this.content?.text || null;
		this.componentImage = this.content?.image || null;
		this.componentLinkInfo = this.componentImage?.desktop || null;
		this.componentHasLink = !!this.componentLinkInfo?.link;

		this.backgroundContent = {
			desktopImage: this.content?.image?.desktop,
		};

		this.backgroundPresentation = {
			isInset: false,
		};

		this.textContent = this.content?.text;
		this.textPresentation = {
			theme: ThemeTypes.dark,
			component: 'trend-name',
		};
	}
}
