import {
	Component,
	HostListener,
	OnDestroy,
	OnInit,
	ViewChild,
	ViewEncapsulation,
	ChangeDetectionStrategy
} from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { BloomreachBaseClass, BloomreachContentList } from '@core/bloomreach';
// APP IMPORTS

import { Eventservice, StorageService } from '@app/core/services';
import { baseCarouselConfig, BreakpointNumbers } from '@app/shared/constants';
import {
	ImageGalleryMapper,
	ImageGalleryResourceBundleMapper,
} from './image-gallery.mapper';
import { breakpoints } from '@app/shared/constants';

import { combineLatest } from 'rxjs';
import { map, take } from 'rxjs/operators';

import Swiper, { SwiperOptions } from 'swiper';

// import Swiper core and required modules
import SwiperCore, { Navigation, Pagination } from "swiper/core";
// install Swiper modules
SwiperCore.use([Pagination, Navigation]);

import { SwiperComponent } from 'swiper/angular';

@Component({
  selector: 'mflooring-image-carousel',
  templateUrl: './image-carousel.component.html',
  styleUrls: ['./image-carousel.component.scss'],
  encapsulation:ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageCarouselComponent extends BloomreachBaseClass implements OnInit, OnDestroy {

  @HostListener('window:resize', ['$event']) onResize(): void {
		this.isMobile = this.breakpoint.isMatched(breakpoints.mobileMax);

		this.showHiddenElementsDesktop();
	}

	constructor(
		public storage: StorageService,
		public eventservice: Eventservice,
		private breakpoint: BreakpointObserver,
	) {
		super();
	}

	@ViewChild('focusedSlideCarousel') swiperCarousel: SwiperComponent;

	public baseConfig: SwiperOptions = {
		...baseCarouselConfig,
		slidesPerView: 1,
		centeredSlides: true,
		autoHeight: false,
		navigation: true,
		pagination: {
			el: '.focused-slide-pagination',
			type: 'bullets',
			clickable: true,
		  },
	};
	public swiperRef: Swiper;

	public carouselContent;
	public imagesMapped;
	public isMobile: boolean;
	public areSectionsHidden;
	public readonly name = 'Image Carousel';

	public carouselTemplate$ = this.componentParameters$.pipe(
		map((params: any) => {
		  return params;
		})
	  );

	  public carouselImagesContent$ = this.componentData$.pipe(
		take(1),
		map((data: BloomreachContentList) => {
		return ImageGalleryMapper(data, this.page);
		})
	  );
	

	ngOnInit(): void {
		super.ngOnInit();
		
	}

	public onSwiper(swiper) {
		this.swiperRef = this.swiperCarousel.swiperRef;
		this.swiperRef?.lazy?.loadInSlide(0);
	}

	public update(swiper) { }

	public trackBy(index: number, el: any): number {
		return el.index;
	}


	private showHiddenElementsDesktop(): void {
		if (this.isMobile) {
			return;
		}
		if (!this.areSectionsHidden) {
			return;
		}
	}

}
