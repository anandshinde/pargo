import {
	ChangeDetectionStrategy,
	Component,
	Inject,
	Input,
	OnInit,
} from '@angular/core';
import { Router } from '@angular/router';

// BLOOMREACH IMPORTS
import { Page } from '@bloomreach/spa-sdk';

// APP IMPORTS
import { DOCUMENT } from '@angular/common';
import { WINDOW } from '@shared/utilities/window';

@Component({
	selector: 'mflooring-menu-item',
	templateUrl: './menu-item.component.html',
	styleUrls: ['./menu-item.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuItemComponent implements OnInit {
	@Input() site!: any;
	@Input() page!: Page;
	@Input() hasChildren = false;
	@Input() linkContainer = 'Global Header';
	@Input() linkName = 'Global Header Item';

	public linkUrl;
	public hasLink;

	constructor(
		private router: Router,
		@Inject(DOCUMENT) private document: Document,
		@Inject(WINDOW) readonly windowRef: Window
	) {}

	public getLinkUrl() {
		return this.page?.getUrl(this.site) || null;
	}

	ngOnInit() {
		this.linkUrl = this.getLinkUrl();
		this.hasLink = !!this.linkUrl;
	}
}
