import {
	ChangeDetectionStrategy,
	Component,
	OnInit,
	ViewChild,
} from '@angular/core';
import { SimpleComponent } from '@app/shared/base-classes';
import {
	baseCarouselConfig,
	BreakpointNumbers,
	BreakpointValues,
} from '@app/shared/constants';
import { SimpleBannerContent } from '@app/shared/interfaces';
import Swiper, { SwiperOptions } from 'swiper';

@Component({
	selector: 'mflooring-carousel-banner',
	templateUrl: './carousel-banner.component.html',
	styleUrls: ['./carousel-banner.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarouselBannerComponent extends SimpleComponent<
	SimpleBannerContent,
	any
> {
	constructor() {
		super();
	}
	@ViewChild('bannerCarousel') swiperCarousel: any;
	public baseConfig: SwiperOptions = {
		...baseCarouselConfig,
		autoHeight: false,
		slidesPerView: 1,
		slidesPerGroup: 1,
		spaceBetween: 30,
		centeredSlides: true,
		loop: true,
		autoplay: true,
		speed: 900,
		navigation: true,
		effect: 'fade',
		pagination: {
			clickable: true,
		},
		breakpoints: {
			[BreakpointNumbers.mobile]: {
				slidesPerView: 1,
				slidesPerGroup: 1,
				spaceBetween: 40,
				centeredSlides: false,
			},
		},
	};

	public swiperRef: Swiper;
	public onSwiper(swiper): void {
		this.swiperRef = this.swiperCarousel.swiperRef;
		this.swiperRef?.lazy?.loadInSlide(0);
	}

	public update(swiper): void {}
}
