import {
	ChangeDetectionStrategy,
	Component,
	Input,
	OnInit,
} from '@angular/core';
import { Component as Page } from '@bloomreach/spa-sdk';

@Component({
	selector: 'mflooring-expansion-menu-mobile',
	templateUrl: './expansion-menu-mobile.component.html',
	styleUrls: ['./expansion-menu-mobile.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpansionMenuMobileComponent {
	@Input() items: any[];
	@Input() page: Page;
	@Input() panelHeaderHeight = '48px';

	public openMenu = null;

	setOpened(index: number) {
		this.openMenu = index;
	}

	hasChildren(item: any): boolean {
		return !!item.childMenuItems.length;
	}

	trackBy(index: number, el: any) {
		return el.name;
	}
}
