import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	OnInit,
	Output,
} from '@angular/core';
import { SimpleComponent } from '@app/shared/base-classes';
@Component({
	selector: 'mflooring-gallery-carousel-item',
	templateUrl: './gallery-carousel-item.component.html',
	styleUrls: ['./gallery-carousel-item.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalleryCarouselItemComponent extends SimpleComponent<any, any> {
	@Output() closeCarouselDialog = new EventEmitter<void>();
	// constructor() { }

	onCloseCarouselDialog(): void {
		this.closeCarouselDialog.emit();
	}
}
