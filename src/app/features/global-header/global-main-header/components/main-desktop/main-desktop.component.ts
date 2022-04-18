import {
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	HostListener,
	Inject,
	Input,
	OnInit,
	ViewChild,
} from '@angular/core';
import { ThemeTypes } from '@app/shared/constants';
import { Component as Page } from '@bloomreach/spa-sdk';
import { GlobalMainHeaderConfig } from '../../containers/global-main-header/global-main-header.config';
import { BehaviorSubject } from 'rxjs';
import { Product } from '@shared/interfaces/featured-component-props.interface';
import { DOCUMENT } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MainHeaderSearchComponent } from '../main-header-search/main-header-search.component';

@Component({
	selector: 'mflooring-main-desktop',
	templateUrl: './main-desktop.component.html',
	styleUrls: ['./main-desktop.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainDesktopComponent {
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
	public openedMenu: number;
	public isLoading = false;
	public _products$: BehaviorSubject<Product[]> = new BehaviorSubject<
		Product[]
	>([]);
	// To match Logo's position with the resource bundle data.
	public readonly logoNameMenu = GlobalMainHeaderConfig.get(
		'MFLOORING_LOGO_URL_ID'
	);

	private _menuItems;

	constructor(
		@Inject(DOCUMENT) private document: Document,
		private eRef: ElementRef,
		private searchDialog: MatDialog
	) {}

	trackBy(index: number, el: any) {
		return el.name;
	}

	openMenu(index: number): void {
		if (this.openedMenu === index) {
			this.closeMenu();
			return;
		}

		this.openedMenu = index;
	}

	openSearch(): void {
		this.searchDialog.open(MainHeaderSearchComponent, {
			data: MainHeaderSearchComponent.prototype.filteredProducts,
			panelClass: 'search-dialog',
			width: '25%',
			height: 'auto',
			position: {
				top: !!this.position ? '85px' : '127px',
				right: '25px',
			},
		});
	}

	closeMenu() {
		this.openedMenu = null;
	}

	get logoPresentation() {
		return {
			theme: ThemeTypes.dark,
		};
	}

	get logoContent() {
		return this.mainHeaderData.logo;
	}

	get menuItems() {
		return this._menuItems;
	}

	@HostListener('document:click', ['$event'])
	closeMenuOutside(event) {
		try {
			if (!this.eRef.nativeElement.contains(event.target)) {
				this.closeMenu();
			}
		} catch (error) {}
	}
}
