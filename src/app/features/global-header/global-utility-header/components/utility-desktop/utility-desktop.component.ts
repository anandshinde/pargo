import {
	AfterViewInit,
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Input,
	Output,
} from '@angular/core';

@Component({
	selector: 'mflooring-utility-desktop',
	templateUrl: './utility-desktop.component.html',
	styleUrls: [
		'../../containers/global-utility-header/global-utility-header.shared.scss',
		'./utility-desktop.component.scss',
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UtilityDesktopComponent {
	@Input() openedMenu: number;
	@Input() menu: any;
	@Input() page: any;
	@Output() openMenu = new EventEmitter<number>();
	@Output() closeMenu = new EventEmitter<number>();

	onOpenMenu(index: number) {
		this.openMenu.emit(index);
	}

	onCloseMenu() {
		this.closeMenu.emit(null);
	}
}
