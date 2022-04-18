import {
	AfterViewInit,
	Component,
	Input,
	OnChanges,
	OnInit,
	SimpleChanges,
	ViewChild,
	Output,
	EventEmitter,
	ViewEncapsulation,
	ChangeDetectionStrategy,
} from '@angular/core';
import {
	SwiperPaginationInterface,
	SwiperDirective,
	SwiperLazyInterface,
} from 'ngx-swiper-wrapper';
import { SwiperOptions } from 'swiper';

// APP IMPORTS
import {
	CarouselWrapperContentProps,
	CarouselWrapperPresentationProps,
} from '@shared/interfaces';
import { BasicSizes } from '@shared/constants';
import { SimpleComponent } from '@shared/base-classes';

@Component({
	selector: 'mflooring-carousel-wrapper',
	templateUrl: './carousel-wrapper.component.html',
	styleUrls: ['./carousel-wrapper.component.scss'],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarouselWrapperComponent
	extends SimpleComponent<
		CarouselWrapperContentProps,
		CarouselWrapperPresentationProps
	>
	implements OnChanges, OnInit, AfterViewInit
{
	@ViewChild(SwiperDirective) directiveRef: SwiperDirective;

	@Output() slideChanged = new EventEmitter();

	@Input() set slide(index) {
		this.goToSlide(index);
	}

	public index: number;

	public insetContent = false;
	private pagination: SwiperPaginationInterface = {
		el: '.swiper-pagination',
		clickable: true,
	};
	private baseConfig: SwiperOptions = {
		a11y: { enabled: true },
		speed: 600,
		direction: 'horizontal',
		slidesPerView: 1,
		keyboard: true,
		mousewheel: false,
		scrollbar: false,
		navigation: false,
		pagination: this.pagination,
		autoHeight: true,
		loop: false,
		lazy: true,
		initialSlide: this.slide || 0,
	};

	public config: SwiperOptions = {
		...this.baseConfig,
		...this.presentation?.config,
	};

	public stackMobile: boolean;
	public bulletSizeClass: string;

	public swiperRef;

	constructor() {
		super();
	}

	public trackBy(index: number, el: any) {
		return el.id;
	}

	public goToSlide(index) {
		this.swiperRef?.slideTo(index);
		this.slideChanged.emit(index);
	}

	public getIndex(index) {
		this.slideChanged.emit(index);
	}

	ngOnInit() {
		this.stackMobile = this.presentation?.stackMobile || false;
		this.bulletSizeClass = `bullet-${
			this.presentation?.bulletSize || BasicSizes.small
		}`;
	}

	ngOnChanges(changes: SimpleChanges) {
		this.config = {
			...this.baseConfig,
			...this.presentation?.config,
		};
	}

	ngAfterViewInit() {
		this.swiperRef = this.directiveRef?.swiper();
		// service worker causes Safari to fail to update the height of the initial slide when the page loads.
		// this just invokes a reset after 400ms.
		setTimeout(() => {
			this.directiveRef?.update();
		}, 400);
	}
}
