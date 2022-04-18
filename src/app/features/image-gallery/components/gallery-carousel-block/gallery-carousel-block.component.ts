import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	OnInit,
	Output,
	Inject
} from '@angular/core';
import { SimpleComponent } from '@app/shared/base-classes';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ThemeTypes } from '@app/shared/constants';
@Component({
	selector: 'mflooring-gallery-carousel-block',
	templateUrl: './gallery-carousel-block.component.html',
	styleUrls: ['./gallery-carousel-block.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalleryCarouselBlockComponent extends SimpleComponent<any, any> {
	@Output() closeCarouselBlock = new EventEmitter<void>();
	constructor(
		@Inject(MAT_DIALOG_DATA) public content: any,
		private dialog: MatDialog
	) {
		super();
	}

	get carouselPresentation() {
		return {
			config: {
				initialSlide: this.content?.index || 0,
				loop: false,
				autoHeight: false,
				pagination: false,
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
				},
			},
			theme: ThemeTypes.dark,
		};
		
	}

	get images() {
		return this.content?.images;
	}

	onCloseCarouselBlock(): void {
		this.dialog.closeAll();
	}
	onCloseCarouselDialog(): void {
		
	}
}
