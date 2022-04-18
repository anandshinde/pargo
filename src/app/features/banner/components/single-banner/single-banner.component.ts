import { HostListener, SimpleChanges } from '@angular/core';
import { ChangeDetectionStrategy, Component, OnChanges } from '@angular/core';
import { SimpleComponent } from '@shared/base-classes';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
// import {
// 	animateHorizontal,
// 	animateVertical,
// } from '@app/shared/animations/animations-simple.animation';
import {
	ThemeNames,
	LinkCompoundTypes,
	LinkCompoundWidths,
	BaseSizeNames,
	HorizAlignmentNames,
	LinkCompoundColors,
	BreakpointValues,
} from '@app/shared/constants';
import { BreakpointObserver } from '@angular/cdk/layout';
import { SimpleBannerContent } from '@app/shared/interfaces/component-banner.interface';

@Component({
	selector: 'mflooring-single-banner',
	templateUrl: './single-banner.component.html',
	styleUrls: ['./single-banner.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	// animations: [animateVertical],
})
export class SingleBannerComponent
	extends SimpleComponent<SimpleBannerContent, any>
	implements OnChanges
{
	public isMobile = null;
	@HostListener('window:resize', ['$event']) onResize() {
		this.isMobile = this.breakpoint.isMatched(BreakpointValues.mobileMax);
	}

	public inViewport$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
		true
	);

	public isInViewport(bool): void {
		this.inViewport$.next(bool);
	}

	public singleBannerData$: Observable<SimpleBannerContent> =
		this.content$.pipe(
			map((content) => {
				return {
					...content,
					banner: {
						...content?.banner,
						bannerLinks: [
							{
								content: {
									...content?.banner?.bannerLinks[0].content,
								},
								presentation: {
									theme: ThemeNames.dark,
									buttonType: LinkCompoundTypes.link,
									buttonWidth: LinkCompoundWidths.normal,
									buttonSize: BaseSizeNames.small,
									textAlign: HorizAlignmentNames.left,
									wrap: true,
									iconPosition: 'left',
									iconSize: BaseSizeNames.medium,
									showIcon: true,
								},
							},
							{
								content: {
									...content?.banner?.bannerLinks[0].content,
								},
								presentation: {
									...content?.banner?.bannerLinks[0].presentation,
									theme: ThemeNames.dark,
								},
							},
						],
					},
				};
			})
		);

	constructor(private breakpoint: BreakpointObserver) {
		super();
	}

	ngOnChanges(changes: SimpleChanges) {
		super.ngOnChanges(changes);
		this.isMobile = this.breakpoint.isMatched(BreakpointValues.mobileMax);
	}
}
