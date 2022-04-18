import {
	ChangeDetectionStrategy,
	Component,
	Input,
	OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ThemeTypes } from '@app/shared/constants';
import { Component as Page } from '@bloomreach/spa-sdk';
import { GlobalMainHeaderConfig } from '../../containers/global-main-header/global-main-header.config';
import { MainHeaderSearchComponent } from '../main-header-search/main-header-search.component';

@Component({
	selector: 'mflooring-main-mobile',
	templateUrl: './main-mobile.component.html',
	styleUrls: ['./main-mobile.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainMobileComponent {
	@Input() set menuItems(data) {
		const recursive = (array, name) => {
			return array.map((item) => {
				const container = !!name ? name : item.name;
				let children = item.childMenuItems;
				if (!!children && children.length) {
					item.childMenuItems = [
						...item.childMenuItems.map((child) => {
							recursive(item.childMenuItems, container);
							return child;
						}),
					];
				}
				item['container'] = container;
				return item;
			});
		};
		this._menuItems = recursive(data, null);
	}
	@Input() page: Page;
	@Input() mainHeaderData: any;
	@Input() position: boolean;
	readonly logoNameMenu = GlobalMainHeaderConfig.get('mflooring_LOGO_URL_ID');
	public isMenuOpened = false;
	private _menuItems;

	constructor(public searchDialog: MatDialog) {}

	openSearch(): void {
		this.searchDialog.open(MainHeaderSearchComponent, {
			data: MainHeaderSearchComponent.prototype.filteredProducts,
			panelClass: 'search-dialog',
			width: '100%',
			height: '80%',
			position: {
				top: !!this.position ? '70px' : '110px',
			},
		});
	}

	trackBy(index: number, el: any) {
		return el.name;
	}

	menuOpened(status: boolean) {
		this.isMenuOpened = status;
	}

	get logoPresentation() {
		return {
			theme: ThemeTypes.dark,
		};
	}

	get menuItems() {
		return this._menuItems;
	}

	get menuItemsRender() {
		return this.menuItems?.filter(
			({ name }: any) => name !== this.logoNameMenu
		);
	}

	get logoUrl() {
		return this.menuItems?.find(
			({ name }: any) => name.toUpperCase() === this.logoNameMenu
		);
	}

	get logoContent() {
		return this.mainHeaderData?.logo;
	}
}
