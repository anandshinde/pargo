import { SwiperOptions } from 'swiper';

export const baseCarouselConfig: SwiperOptions = {
	a11y: { enabled: true },
	speed: 900,
	autoplay: false,
	direction: 'horizontal',
	slidesPerView: 1,
	navigation: false,
	autoHeight: true,
	keyboard: true,
	mousewheel: false,
	scrollbar: false,
	loop: true,
	lazy: true,
	preloadImages: false,
	watchSlidesVisibility: true,
};
