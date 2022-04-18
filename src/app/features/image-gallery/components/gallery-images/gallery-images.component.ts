import {
	Component,
	ChangeDetectionStrategy,
	EventEmitter,
	OnChanges,
	Output,
	SimpleChanges,
} from '@angular/core';
import { MatDialogConfig } from '@angular/material/dialog';
import { SimpleComponent } from '@app/shared/base-classes';
@Component({
	selector: 'mflooring-gallery-images',
	templateUrl: './gallery-images.component.html',
	styleUrls: ['./gallery-images.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalleryImagesComponent extends SimpleComponent<any[], any> implements OnChanges{
	// constructor() { }
	@Output() firstLastOrder = new EventEmitter();
	@Output() openImage = new EventEmitter<MatDialogConfig>();
	ngOnChanges(changes: SimpleChanges): void {
		this.emitFirstLastOrder();
	}

	emitFirstLastOrder(): void {
		const order = { first: this.firstOrder, last: this.lastOrder };

		this.firstLastOrder.emit(order);
	}

	onOpenImage(index: number): void {
		window.scroll(0,150);
		const dialogConfig: MatDialogConfig = {
      maxWidth: "100vw",
      width: "960px",
      autoFocus: false,
      data: {
        index,
        images: this.content,
      },
      id: "image-gallery__dialog__content",
      backdropClass: "image-gallery__dialog__backdrop",
      panelClass: "my-dialog_new",
    };

		this.openImage.emit(dialogConfig);
	}

	get firstOrder(): number {
		const first = this.content[0];

		return first?.order || 0;
	}
	get lastOrder(): number {
		const last = this.content[this.content.length - 1];

		return last?.order || 0;
	}
}
