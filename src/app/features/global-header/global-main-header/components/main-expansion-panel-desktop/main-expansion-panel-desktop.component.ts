import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Input,
	Output,
} from '@angular/core';
import { Component as Page } from '@bloomreach/spa-sdk';

@Component({
	selector: 'mflooring-main-expansion-panel-desktop',
	templateUrl: './main-expansion-panel-desktop.component.html',
	styleUrls: ['./main-expansion-panel-desktop.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainExpansionPanelDesktopComponent {
	@Input() items: any[];
	@Input() page: Page;
	@Output() openMenu = new EventEmitter<number>();
	@Output() closeMenu = new EventEmitter<number>();

	onCloseMenu() {
		this.closeMenu.emit(null);
	}

	trackBy(index: number, el: any) {
		return el.name;
	}
}
