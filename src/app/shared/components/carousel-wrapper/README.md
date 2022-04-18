## Carousel Wrapper

The carousel wrapper component uses the [ngx-swiper-wrapper](https://www.npmjs.com/package/ngx-swiper-wrapper) for carousel functionality.
Please refer to the [Swiper API Documentation](https://swiperjs.com/api/) for configuration.

#### Usage

The carousel wrapper transcludes the list of elements to be set up in a
carousel:

```html
<!-- CAROUSEL WRAPPER -->
<section class="carousel-banner">
	<div class="carousel-banner__content">
		<div class="swiper-container" [swiper]="config">
			<div class="swiper-wrapper">
				<ng-content></ng-content>
			</div>
			<div
				class="swiper-pagination"
				[ngClass]="{'stack-in-mobile': stackMobile}"
			></div>
		</div>
	</div>
</section>

<!-- USAGE -->
<mflooring-carousel-wrapper
	[content]="null"
	[presentation]="carouselPresentationProps"
>
	<!-- Content for the carousel goes in here  -->
</mflooring-carousel-wrapper>
```

The component accepts a presentation configuration object:

```typescript
{
	config: SwiperOptions; // See Swiper documentation
	stackMobile: boolean; // does any background image stack in mobile
	theme: ThemeType; // light or dark
}
```
