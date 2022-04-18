import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Input,
	Output,
} from '@angular/core';

@Component({
	selector: 'mflooring-utility-mobile',
	templateUrl: './utility-mobile.component.html',
	styleUrls: [
		'../../containers/global-utility-header/global-utility-header.shared.scss',
		'./utility-mobile.component.scss',
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UtilityMobileComponent {
	@Input() page: any;
	@Input() menuFlatted: any[];
	@Input() openedMenu: number;
	@Output() openMenu = new EventEmitter<number>();
	@Output() closeMenu = new EventEmitter<number>();

	onOpenMenu(index: number) {
		this.openMenu.emit(index);
	}

	onCloseMenu() {
		this.closeMenu.emit(null);
	}
}
