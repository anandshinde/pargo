import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, HostListener, Inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { BloomreachBaseClass } from '@app/core/bloomreach';
import { LayoutService, StorageService, Eventservice } from '@core/services';
import { breakpoints, Colors } from '@shared/constants';
import { GlobalMainHeaderMapper } from './global-main-header.mapper';
import { WINDOW } from '@shared/utilities/window';

@Component({
	selector: 'mflooring-global-main-header',
	templateUrl: './global-main-header.component.html',
	styleUrls: ['./global-main-header.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GlobalMainHeaderComponent
	extends BloomreachBaseClass
	implements OnInit {
	public isMobile: boolean;
	public backgroundColorStyle: string;
	public isNavFixed = false;
	private readonly utilityNavHeight = 40;

	public layoutContainerProp = {
		content: {
			backgroundColor: Colors.black,
		},
		presentation: {
			isInset: false,
		},
	};

	constructor(
		private breakpoint: BreakpointObserver,
		private layoutService: LayoutService,
		public storage: StorageService,
		public eventservice: Eventservice,
		@Inject(WINDOW) readonly windowRef: Window,
		@Inject(DOCUMENT) private documentRef: Document
	) {
		super();
	}

	get menuItems(): any[] {
		return this.menu?.siteMenuItems;
	}

	get pageTitleVisDemo() {
		return this.documentRef.title?.split(' ')?.[0];
	}

	ngOnInit(): void {
		this.isMobile = this.onResize();
	}

	@HostListener('window:scroll', ['$event'])
	onWindowScroll({ target }) {
		// material dialog sets scroll to 0, which will change the positioning of the header
		const html: Element = target.getElementsByTagName('HTML')[0];
		const modalOpen = html?.classList.contains('cdk-global-scrollblock');
		if (this.windowRef.pageYOffset > this.utilityNavHeight || modalOpen) {
			this.isNavFixed = true;
			this.layoutService.setNavToSticky();
			return;
		}

		this.isNavFixed = false;
		this.layoutService.setNavToUnsticky();
	}

	@HostListener('window:resize', ['$event']) onResize() {
		this.isMobile = this.breakpoint.isMatched(breakpoints.mobileMax);

		return this.isMobile;
	}

	get mainHeaderData() {
		return GlobalMainHeaderMapper("this.resourceBundleData");
	}
}
