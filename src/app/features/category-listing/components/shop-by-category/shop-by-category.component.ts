import { BreakpointObserver } from '@angular/cdk/layout';
import {
	Component,
	HostListener,
	OnChanges,
	OnInit,
	SimpleChanges,
	ViewChild, ChangeDetectionStrategy
} from '@angular/core';
import { SimpleComponent } from '@app/shared/base-classes';
import {
	baseCarouselConfig,
	BreakpointNumbers,
	BreakpointValues,
} from '@app/shared/constants';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import Swiper, { SwiperOptions } from 'swiper';

@Component({
	selector: 'mflooring-shop-by-category',
	templateUrl: './shop-by-category.component.html',
	styleUrls: ['./shop-by-category.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopByCategoryComponent
	extends SimpleComponent<any, any>
	implements OnChanges
{
	constructor(private breakpoint: BreakpointObserver) {
		super();
	}
	activeCategory = 0;
	activeBottomCat = -1;
	public isMobile = null;
	@HostListener('window:resize', ['$event']) onResize() {
		this.isMobile = this.breakpoint.isMatched(BreakpointValues.mobileMax);
	}
	ngOnChanges(changes: SimpleChanges) {
		super.ngOnChanges(changes);
		this.isMobile = this.breakpoint.isMatched(BreakpointValues.mobileMax);
	}
	public shopByCategoryData$: Observable<any> = this.content$.pipe(
		map((content) => {
			return content;
		})
	);
	@ViewChild('subTabCarousel') swiperCarousel: any;
	public baseConfig: SwiperOptions = {
		...baseCarouselConfig,
		autoHeight: false,
		slidesPerView: 1,
		slidesPerGroup: 1,
		spaceBetween: 30,
		centeredSlides: true,
		loop: true,
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
