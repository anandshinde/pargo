import {
	Component,
	Input,
	AfterViewInit,
	ViewChild,
	ChangeDetectionStrategy,
} from '@angular/core';
import { SimpleComponent } from '@app/shared/base-classes';
import { TabbedTabProps } from '@app/shared/interfaces';
import { BreakpointValues } from '@app/shared/constants';
import { BreakpointObserver } from '@angular/cdk/layout';
import { HostListener, SimpleChanges } from '@angular/core';
import { baseCarouselConfig } from '@app/shared/constants';
import Swiper, { SwiperOptions } from 'swiper';

// import Swiper core and required modules
import SwiperCore, { Navigation, Pagination } from 'swiper/core';
// install Swiper modules
SwiperCore.use([Pagination, Navigation]);

import { SwiperComponent } from 'swiper/angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Component({
	selector: 'mflooring-tabbed-tab',
	templateUrl: './tabbed-tab.component.html',
	styleUrls: ['./tabbed-tab.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabbedTabComponent
	extends SimpleComponent<TabbedTabProps[], any>
	implements AfterViewInit
{
	@Input() selectedTabParam;
	public openedPanel = null;
	public selectedTab;
	public selectedAccIndex = -2;
	public isMobile = null;
	@HostListener('window:resize', ['$event']) onResize() {
		this.isMobile = this.breakpoint.isMatched(BreakpointValues.mobileMax);
	}

	constructor(private breakpoint: BreakpointObserver) {
		super();
	}

	@ViewChild('focusedSlideCarousel') swiperCarousel: SwiperComponent;

	public baseConfig: SwiperOptions = {
		...baseCarouselConfig,
		slidesPerView: 1,
		centeredSlides: true,
		autoHeight: false,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		pagination: false,
		loop: false,
	};
	public swiperRef: Swiper;
	public currentMobileItem;

	ngAfterViewInit() {
		let tab = this.content.filter((tabs) => {
			return tabs.label.toLowerCase() === this.selectedTabParam;
		});
		this.selectedTab = tab[0]?.index;
		this.isMobile = this.breakpoint.isMatched(BreakpointValues.mobileMax);
		this.currentMobileItem = this.content[0];
		if (this.swiperRef) {
			this.swiperRef.slideTo(0, 1000, false);
		}
	}

	public setOpenPanel(panel) {
		this.openedPanel = panel;
	}

	public trackBy(index: number, el: any) {
		return el.index;
	}

	public onSwiper(swiper) {
		this.swiperRef = this.swiperCarousel.swiperRef;
		this.swiperRef?.lazy?.loadInSlide(0);
	}

	public sliderChanged(event) {
		this.currentMobileItem = this.content[event];
	}

	public update(swiper) {}
	public tabbedTabData$: Observable<TabbedTabProps[]> = this.content$.pipe(
		map((content) => {
			if (this.isMobile) {
				this.currentMobileItem = content.length > 0 ? content[0] : null;
				if (this.swiperCarousel && content.length > 0) {
					this.swiperCarousel.swiperRef.slideTo(0, 0, true);
					this.swiperRef.activeIndex = 0;
				}
			}
			return content;
		})
	);
}
