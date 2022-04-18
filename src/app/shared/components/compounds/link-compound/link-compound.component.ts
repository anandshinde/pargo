import {
	ChangeDetectionStrategy,
	Component,
	OnInit,
	Output,
	EventEmitter,
	Inject,
	OnChanges,
	SimpleChanges,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// APP IMPORTS
import { SimpleComponent } from '@shared/base-classes';
import { urlIsExternal } from '@shared/utilities/regex.utilities';
import {
	ButtonTypes,
	ThemeTypes,
	ButtonAlignment,
	LinkTargetTypes,
	ButtonAction,
	ThemeNames,
	LinkCompoundTypes,
	BaseColorNames,
	HorizAlignmentNames,
	LinkCompoundWidths,
} from '@shared/constants';
import {
	LinkCompound,
	LinkCompoundContent,
	LinkCompoundPresentationOutput,
	LinkCompoundPresentationProps,
} from '@shared/interfaces';
import { WINDOW } from '@shared/utilities/window';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
	selector: 'mflooring-link-compound',
	templateUrl: './link-compound.component.html',
	styleUrls: ['./link-compound.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinkCompoundComponent
	extends SimpleComponent<LinkCompound, LinkCompoundPresentationProps>
	implements OnChanges
{
	public buttonAction;
	public linkUrl;
	public linkTarget;
	@Output() handleClickAction = new EventEmitter<string>(null);
	public linkContent$: Observable<LinkCompoundContent> = this.content$.pipe(
		map((content) => {
			if (!content) {
				return this.content;
			}
			this.linkUrl = content?.url;
			this.linkTarget =
				content?.target?.indexOf('_blank') === -1 ? '_self' : '_blank';
			return content;
		})
	);

	public linkPresentation$: Observable<LinkCompoundPresentationOutput> =
		this.presentation$.pipe(
			map((presentation: any) => {
				if (!presentation) {
					return null;
				}
				this.buttonAction = presentation?.buttonAction || 'link';
				return {
					...presentation,
					inheritFont: presentation?.inheritFont || false,
					iconType: `${presentation?.iconColor}-${presentation?.iconStroke}`,
					themeClass: `theme-${presentation?.theme || ThemeNames.light}`,
					typeClass: presentation?.buttonType || LinkCompoundTypes.primary,
					widthClass: `width-${
						presentation?.buttonWidth || LinkCompoundWidths.wide
					}`,
					alignmentClass: `align-${
						presentation?.textAlign || HorizAlignmentNames.center
					}`,
					colorClass: `color-${
						presentation?.buttonColor || BaseColorNames.black
					}`,
					iconPositionClass: `icon_${
						presentation?.iconPosition || HorizAlignmentNames.left
					}`,
					wrap: presentation?.wrap || true,
				};
			})
		);

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		@Inject(WINDOW) readonly windowRef: Window
	) {
		super();
	}
	public buttonClick(url: string, target: string = '_blank'): void {
		// If this is a submit button, we only need to know it was clicked...
		if (this.buttonAction !== 'link') {
			this.handleClickAction.emit(this.buttonAction);
			return;
		}

		if (url === null) {
			return;
		}

		if (urlIsExternal(url)) {
			this.windowRef.open(url, target, 'noopener,noreferrer');
			return;
		}

		void this.router.navigate([url], {
			relativeTo: this.route,
		});
	}

	ngOnChanges(changes: SimpleChanges) {
		super.ngOnChanges(changes);
		this.linkPresentation$.subscribe((res) => {});
		this.linkContent$.subscribe((res) => {});
	}
}
