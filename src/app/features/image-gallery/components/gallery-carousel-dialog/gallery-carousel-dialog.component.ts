import {
	Component,
	OnInit,
	ChangeDetectionStrategy,
	Inject,
} from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ThemeTypes } from '@app/shared/constants';
@Component({
	selector: 'mflooring-gallery-carousel-dialog',
	templateUrl: './gallery-carousel-dialog.component.html',
	styleUrls: ['./gallery-carousel-dialog.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalleryCarouselDialogComponent {
	constructor(
		@Inject(MAT_DIALOG_DATA) public data: any,
		private dialog: MatDialog
	) {}

	get carouselPresentation() {
		return {
			config: {
				initialSlide: this.data?.index || 0,
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

	onCloseCarouselDialog(): void {
		this.dialog.closeAll();
	}

	get images() {
		return this.data.images;
	}
}
