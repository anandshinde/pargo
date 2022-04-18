import { Component, HostListener, OnInit, Inject, ChangeDetectionStrategy } from '@angular/core';
import { DOCUMENT } from '@angular/common';
// import { BloomreachBaseClass } from '@app/core/bloomreach';
import { breakpoints, Colors } from '@shared/constants';
import { GlobalFooterMapper } from './global-footer.mapper';
import { BreakpointObserver } from '@angular/cdk/layout';
import { StorageService, Eventservice } from '@core/services';
import { BloomreachComponent } from '@app/shared/base-classes/bloomreach-component';

@Component({
	selector: 'mflooring-global-footer',
	templateUrl: './global-footer.component.html',
	styleUrls: ['./global-footer.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	
})
export class GlobalFooterComponent
	extends BloomreachComponent
	implements OnInit {
	public isMobile: boolean;
	public layoutContainerProp = {
		content: {
			backgroundColor: Colors.white,
		},
	};

	@HostListener('window:resize', ['$event']) onResize() {
		this.isMobile = this.breakpoint.isMatched(breakpoints.mobileMax);

		return this.isMobile;
	}

	constructor(
		public storage: StorageService,
		public eventservice: Eventservice,
		private breakpoint: BreakpointObserver,
		@Inject(DOCUMENT) private documentRef: Document
	) {
		super(eventservice, storage);
	}

	get pageTitleVisDemo() {
		return this.documentRef.title?.split(' ')?.[0];
	}

	get isInset() {
		return !this.isMobile;
	}

	get footerData(): {
		logo: any;
		copyright: any;
		privacyPolicy: any;
		search: any;
		socialMedia: any;
	} {
		const test = GlobalFooterMapper(this.resourceBundleData);
		return test;
	}

	ngOnInit() {
		this.isMobile = this.onResize();
	}
}
