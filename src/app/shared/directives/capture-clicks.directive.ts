import { Directive, HostListener, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { LinkTargetValues } from '@shared/constants';
import { urlIsExternal } from '@shared/utilities/regex.utilities';
import { WINDOW } from '@shared/utilities/window';
import { Eventservice } from '@app/core/services';

@Directive({
	selector: '[captureClicks]',
})
export class CaptureClicksDirective {
	constructor(
		private router: Router,
		private route: ActivatedRoute,
		public eventservice: Eventservice,
		@Inject(WINDOW) readonly windowRef: Window,
		@Inject(DOCUMENT) private document: Document
	) {}

	// possible that the user clicked on a nested tag
	static getAnchor(target) {
		while (target) {
			if (target instanceof HTMLAnchorElement) {
				return target;
			}
			target = target.parentNode;
		}
	}

	// PARSE WHAT SHOULD BE A QUERY STRING
	static parseQueryString(string: string): any {
		return string.split('&').reduce((a, c) => {
			const q = c.split('=');
			if (!!q.length) {
				a[q[0]] = q[1];
			}
			return a;
		}, {});
	}

	private parseString(str: string): any {
		return str.split(/([$#?])/).reduce(
			(a, c, index, arr) => {
				switch (c) {
					case '$':
						a.url = arr[index + 1] || '/';
						return a;
					case '#':
						a.frag = arr[index + 1];
						return a;
					case '?':
						a.query = CaptureClicksDirective.parseQueryString(arr[index + 1]);
						return a;
					default:
						return a;
				}
			},
			{ url: null, frag: null, query: {} }
		);
	}

	@HostListener('click', ['$event'])
	handleClickLink(event): void {
		event.preventDefault();
		const target = CaptureClicksDirective.getAnchor(event.target);
		const href = target && target.getAttribute('href');

		if (!href) {
			return;
		}

		// data for tagging
		const type = target.getAttribute('data-link-type') || null;
		const name = target.getAttribute('data-link-name') || target.text || null;
		const container = target.getAttribute('data-link-container') || null;

		if (type) {
			this.eventservice.handleLinks({ type, name, href, container });
		}

		// If the URL is external, open it in a new tag/window
		if (urlIsExternal(href) || href.includes('localhost')) {
			if (type !== 'social') {
				this.eventservice.exitLinkClicked({ name, href });
			}
			this.windowRef.open(href, LinkTargetValues.blank, 'noopener, noreferrer');
			return;
		}

		if (!urlIsExternal(href) && !container) {
			this.eventservice.internalLinkClicked({ name, href });
		}

		// Split URL into: url, fragment (#), query string (parsed into object)
		const urlParts = this.parseString(`$${href}`);

		// build a proper URL per Angular
		this.router
			.navigate([urlParts.url], {
				relativeTo: this.route,
				fragment: urlParts.frag,
				queryParams: { ...urlParts.query },
			})
			.then(() => {
				// if there is a #hash,
				if (!!urlParts.frag) {
					setTimeout(() => {
						const panel: HTMLElement = this.document.getElementById(
							urlParts.frag
						).offsetParent as HTMLElement;
						if (panel instanceof HTMLAnchorElement) {
							panel.click();
						}
					}, 500);
				}
			});
	}
}
