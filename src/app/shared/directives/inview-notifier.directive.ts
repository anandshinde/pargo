import {
	AfterViewInit,
	Directive,
	ElementRef,
	EventEmitter,
	Host,
	Inject,
	OnDestroy,
	Output,
	PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
	selector: '[inViewNotifier]',
})
export class InviewNotifierDirective implements AfterViewInit, OnDestroy {
	@Output() isVisible: EventEmitter<boolean> = new EventEmitter<boolean>();

	private _observer: IntersectionObserver;

	constructor(
		@Host() private _elementRef: ElementRef,
		@Inject(PLATFORM_ID) protected platformID: Object
	) {}

	ngAfterViewInit(): void {
		if (isPlatformBrowser(this.platformID)) {
			const options = {
				root: null,
				rootMargin: '0px',
				threshold: 0.0,
			};

			this._observer = new IntersectionObserver(this._callback, options);

			this._observer.observe(this._elementRef.nativeElement);
		}
	}

	ngOnDestroy() {
		if (isPlatformBrowser(this.platformID)) {
			this._observer.disconnect();
		}
	}

	private _callback = (entries, observer) => {
		entries.forEach((entry) => {
			this.isVisible.emit(!!entry.isIntersecting);
		});
	};
}
