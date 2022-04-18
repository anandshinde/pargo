import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { TrendCollectionMapper } from '@features/trend-collection/containers/trend-collection/trend-collection.mapper';
import { BloomreachBaseClass, BloomreachContentList } from '@core/bloomreach';
import { ViewportScroller } from '@angular/common';

import {
	BreakpointValues,
	ThemeTypes,
	TwoColumnRatios,
} from '@shared/constants';
import { BreakpointObserver } from '@angular/cdk/layout';
import { breakpoints } from '@shared/constants';
import {
	LayoutWrapperProps,
	RichTextProps,
	TwoColumnCompoundPresentationProps,
} from '@shared/interfaces';
import { Eventservice } from '@app/core/services/events.service';
import { StorageService } from '@core/services';
import { map } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { HostListener } from '@angular/core';

@Component({
	selector: 'mflooring-trend-collection',
	templateUrl: './trend-collection.component.html',
	styleUrls: ['./trend-collection.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrendCollectionComponent
	extends BloomreachBaseClass
	implements OnInit
{
	public readonly name = 'Trend Collection';

	public isMobile = this.breakpoint.isMatched(BreakpointValues.mobileMax);
	public twoColumnCompoundPresentation: TwoColumnCompoundPresentationProps;

	public collection: {
		leftColumn: any[];
		rightColumn: any[];
	};

	constructor(
		private breakpoint: BreakpointObserver,
		public storage: StorageService,
		public eventservice: Eventservice,
		private viewportScroller: ViewportScroller
	) {
		super();
	}

	ngOnInit(): void {
		super.ngOnInit();
		this.twoColumnCompoundPresentation = {
			theme: ThemeTypes.dark,
			ratio: TwoColumnRatios[5050],
		};
		this.onResize();
	}
	@HostListener('window:resize', ['$event']) onResize() {
		this.isMobile = this.breakpoint.isMatched(BreakpointValues.mobileMax);
		this.isMobileView();
	}

	public isMobileView() {
		if (this.isMobile) {
			this.trendCount = 1;
			this.toggleItemFlag = true;
		} else {
			this.trendCount = 3;
			this.toggleItemFlag = false;
		}
	}

	public trendCollectionContent$ = combineLatest([
		this.componentData$,
		this.componentParameters$,
	]).pipe(
		map(([data, params]: [any, any]) => {
			return TrendCollectionMapper(data, this.page);
		})
	);
	toggleItemFlag: boolean;
	trendCount = 3;
	loadMore() {
		this.trendCount = this.trendCount + 1;
		console.log(this.trendCount);

		setTimeout(() => {
			this.viewportScroller.scrollToAnchor(
				'trendCollection__' + this.trendCount
			);
		}, 10);
	}
	loadless() {
		if (this.isMobile) {
			this.trendCount = 1;
		} else {
			this.trendCount = 3;
		}
	}

	public trackBy(index: number, el: any) {
		return el.index;
	}
	scrollToTop(): void {
		// window.scrollTo(0, 350);
		this.viewportScroller.scrollToPosition([0, 350]);
	}
	// scrollToTop1(): void {
	// 	window.scrollTo(0, 0);
	// }
}
