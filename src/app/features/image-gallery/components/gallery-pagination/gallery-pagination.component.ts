import {
	Component,
	OnInit,
	ChangeDetectionStrategy,
	EventEmitter,
	Input,
	Output,
} from '@angular/core';
import { ThemeTypes, ButtonAlignment } from '@app/shared/constants';
import { LinkCompoundPresentationProps } from '@app/shared/interfaces';
import { SimpleComponent } from '@app/shared/base-classes';
@Component({
	selector: 'mflooring-gallery-pagination',
	templateUrl: './gallery-pagination.component.html',
	styleUrls: ['./gallery-pagination.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalleryPaginationComponent {
	@Input() paginationOrder: any;
	@Output() pageChange = new EventEmitter<number>();
	constructor() {}

	onPageChange(page: number) {
		this.pageChange.emit(page);
	}

	get linkPresentation(): LinkCompoundPresentationProps {
		return {
			theme: ThemeTypes.dark,
			buttonType: 'primary',
			alignment: ButtonAlignment.left,
			hasArrow: true,
		};
	}
}
