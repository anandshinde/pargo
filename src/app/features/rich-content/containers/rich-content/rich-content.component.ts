import {
	AfterViewInit,
	  ChangeDetectionStrategy,
	  Component,
	  HostListener,
	  OnInit,
	  ViewChild,
  } from '@angular/core';
  import { BloomreachBaseClass, BloomreachCompoundTypes } from '@core/bloomreach';
  import { map } from 'rxjs/operators';
  import { RichContentMapper } from '@features/rich-content/rich-content.mapper';
  import {
	  animate,
	  state,
	  style,
	  transition,
	  trigger,
  } from '@angular/animations';
  import { BehaviorSubject } from 'rxjs';
  // import Swiper core and required modules
  import SwiperCore, {
	  A11y,
	  Keyboard,
	  Lazy,
	  Navigation,
	  Pagination,
	  SwiperOptions,
	  Swiper,
  } from 'swiper/core';
  SwiperCore.use([A11y, Keyboard, Lazy, Navigation, Pagination, Swiper]);
  
  import { BreakpointNumbers, BreakpointValues } from '@app/shared/constants';
  import { BreakpointObserver } from '@angular/cdk/layout';
  import { SwiperComponent } from 'swiper/angular';
  
  @Component({
	  selector: 'mflooring-rich-content',
	  templateUrl: './rich-content.component.html',
	  styleUrls: ['./rich-content.component.scss'],
	  changeDetection: ChangeDetectionStrategy.OnPush,
	  animations: [
		  trigger('animateUp', [
			  state(
				  'outview',
				  style({
					  transform: 'translateY(40%)',
					  opacity: 0,
				  })
			  ),
			  state(
				  'inview',
				  style({
					  transform: 'translateY(0)',
					  opacity: 1,
				  })
			  ),
			  transition('outview => inview', [animate('500ms')]),
			  transition('inview => outview', [animate('200ms')]),
		  ]),
	  ],
  })
  export class RichContentComponent
	  extends BloomreachBaseClass
	  implements OnInit
  {
	  public baseConfig: SwiperOptions = {
		  direction: 'horizontal',
		  slidesPerView: 1,
		  keyboard: true,
		  mousewheel: false,
		  navigation: false,
		  loop: false,
		  pagination: {
			  el: '.rich-content-3col-pagination',
		type: 'bullets',
			  clickable: true,
		  },
		  centeredSlides: true,
	  };
  
	  public isMobile = null;
	  @HostListener('window:resize', ['$event']) onResize() {
		  this.isMobile = this.breakpoint.isMatched(BreakpointValues.mobileMax);
	  }
  
	  @ViewChild('richContentThreeColumnCarousel') swiperCarousel: SwiperComponent;
  
	  public swiperRef: Swiper;
  
	  public inViewport$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
		  false
	  );
  
	  public isInViewport(bool): void {
		  this.inViewport$.next(bool);
	  }
  
	  public richContentData$ = this.componentData$.pipe(
		  map((richContent: any) => {
			  if (!richContent) {
				  return null;
			  }
			  return richContent?.detailContent?.map((content) => {
				  return {
					  richDivider: content.divider,
					  richContent: RichContentMapper(content, this.page),
				  };
			  });
		  })
	  );
  
	  public richContentParams$ = this.componentParameters$.pipe(
		  map((params: any) => {
			  return params;
		  })
	  );
  
	  constructor(private breakpoint: BreakpointObserver) {
		  super();
	  }
  
	  public trackBy(index: number) {
		  return index;
	  }
  
	  get types() {
		  return BloomreachCompoundTypes;
	  }
  
	  public onSwiper(swiper): void {
	  this.swiperRef = this.swiperCarousel.swiperRef;
		  this.swiperRef?.lazy?.loadInSlide(0);
	  }
  
	  public update(swiper): void {}
  
	  ngOnInit(): void {
		  super.ngOnInit();
		  this.isMobile = this.breakpoint.isMatched(BreakpointValues.mobileMax);
	  }
  }
  