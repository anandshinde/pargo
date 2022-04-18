import {
	Component,
	ElementRef,
	HostListener,
	OnInit,
	Inject,
	ChangeDetectionStrategy
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
// import { BloomreachBaseClass } from '@app/core/bloomreach';
// import { BloomreachComponent } from '@app/shared/base-classes';
import { GlobalUtilityHeaderMapper } from './global-utility-header.mapper';
import { StorageService, Eventservice } from '@core/services';
import { BehaviorSubject } from 'rxjs';
import { BloomreachComponent } from '@app/shared/base-classes/bloomreach-component';

@Component({
	selector: 'mflooring-global-utility-header',
	templateUrl: './global-utility-header.component.html',
	styleUrls: [
		'./global-utility-header.shared.scss',
		'./global-utility-header.component.scss',
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GlobalUtilityHeaderComponent
	extends BloomreachComponent
	implements OnInit
{
	public openedMenu: number;

	public utilityHeaderData$ = new BehaviorSubject<any>(null);

	public layoutContainerProp = {
		content: {
			backgroundColor: '#CCCDCE',
		},
		presentation: {
			isInset: false,
		},
	};

	constructor(
		private eRef: ElementRef,
		public storage: StorageService,
		public eventservice: Eventservice,
		@Inject(DOCUMENT) private documentRef: Document
	) {
		super(eventservice, storage);
	}

	openMenu(index: number): void {
		if (this.openedMenu === index) {
			this.closeMenu();
			return;
		}
		this.openedMenu = index;
	}

	get menuFlatted() {
		return this.flatMenu(this.menu.siteMenuItems);
	}

	get pageTitleVisDemo() {
		return this.documentRef.title?.split(' ')?.[0];
	}

	private flatMenu(siteMenuItems: any) {
		return siteMenuItems.reduce(
			(acc, curr) =>
				curr.childMenuItems.length
					? [...acc, curr, ...this.flatMenu(curr.childMenuItems)]
					: [...acc, curr],
			[]
		);
	}

	closeMenu() {
		this.openMenu(null);
	}

	// TODO: Once the action icons work it should be moved to a menu container as wrapper.
	@HostListener('document:click', ['$event'])
	closeMenuOutside(event) {
		try {
			if (!this.eRef.nativeElement.contains(event.target)) {
				this.closeMenu();
			}
		} catch (error) {}
	}

	ngOnInit() {
		// super.ngOnInit();
		this.utilityHeaderData$.next(
			GlobalUtilityHeaderMapper(this.resourceBundleData)
		);
	}
}
