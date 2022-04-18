import {
	ChangeDetectionStrategy,
	Component,
	Inject,
	OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// APP IMPORTS
import { SimpleComponent } from '@app/shared/base-classes';
import { urlIsExternal } from '@shared/utilities/regex.utilities';
import { LinkTargetTypes, VertAlignment } from '@shared/constants';
import {
	IconTextCompoundContentProps,
	IconTextCompoundPresentationProps,
	ImageCompoundContentProps,
	RichTextContentProps,
	ImageModel,
} from '@shared/interfaces';
import { WINDOW } from '@shared/utilities/window';
import { Eventservice } from '@core/services';

@Component({
	selector: 'mflooring-icon-text-compound',
	templateUrl: './icon-text-compound.component.html',
	styleUrls: ['./icon-text-compound.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconTextCompoundComponent
	extends SimpleComponent<
		IconTextCompoundContentProps,
		IconTextCompoundPresentationProps
	>
	implements OnInit {
	public componentImage: ImageCompoundContentProps;
	public componentText: RichTextContentProps;
	public componentImagePositionClassName: string;
	public componentLinkInfo: ImageModel;
	public componentHasLink: boolean;

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		public eventservice: Eventservice,
		@Inject(WINDOW) readonly windowRef: Window
	) {
		super();
	}

	public buttonClick(url, target = LinkTargetTypes.blank): void {
		if (url === null) {
			return;
		}

		if (urlIsExternal(url)) {
			if (url.indexOf('.pdf') !== -1) {
				let splitUrl = url.split('/');
				let fileName = splitUrl[splitUrl.length - 1];
				this.eventservice.downloadLinkClicked({
					linkId: this.componentLinkInfo.title || 'Icon Text Link Clicked',
					fileName: fileName,
				});
			}
			this.windowRef.open(url, target);
			return;
		}

		void this.router.navigate([url], { relativeTo: this.route });
	}

	ngOnInit(): void {
		this.componentText = this.content?.text || null;
		this.componentImage = this.content?.image || null;
		this.componentLinkInfo = this.componentImage?.desktop || null;
		this.componentHasLink =
			!!this.componentLinkInfo?.link && this.componentLinkInfo?.link !== '';
		this.componentImagePositionClassName = `position-${
			this.presentation?.imagePosition || VertAlignment.top
		}`;
	}
}
