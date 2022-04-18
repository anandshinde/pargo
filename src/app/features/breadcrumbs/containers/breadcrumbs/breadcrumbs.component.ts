import {
	ChangeDetectionStrategy,
	Component,
	OnInit,
	Inject,
} from '@angular/core';
import { LocationStrategy, DOCUMENT } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// APP IMPORTS
// import { BloomreachComponent } from '@app/shared/base-classes';
import { StorageService, Eventservice } from '@core/services';
import { BloomreachComponent } from '@app/shared/base-classes/bloomreach-component';
import { BloomreachBaseClass } from '@app/core/bloomreach';

const buildCrumbLabel = (data) => {
	switch (data) {
		case 'Login':
			return 'Account Login';
		default:
			return data;
	}
};

@Component({
	selector: 'mflooring-breadcrumbs',
	templateUrl: './breadcrumbs.component.html',
	styleUrls: ['./breadcrumbs.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbsComponent
	extends BloomreachBaseClass
	implements OnInit
{
	public readonly name = 'Breadcrumbs';

	public breadcrumbs$: Observable<any[]>;
	public jsonLD: string;
	public pageTitle: string;
	private _pageTitle$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

	constructor(
		@Inject(DOCUMENT) private documentRef: Document,
		public eventservice: Eventservice,
		public storage: StorageService,
		private route: ActivatedRoute,
		private locationRef: LocationStrategy
	) {
		super();
	}

	get breadcrumbsPresentation(): boolean {
		return this.parameters['include-breadcrumbs'];
	}

	get pageTitleVisDemo() {
		return this.documentRef.title?.split(' ')?.[0];
	}

	private buildListItems(crumbs): any[] {
		return crumbs?.map(({ url, label }, i) => ({
			'@type': 'ListItem',
			position: i + 1,
			name: buildCrumbLabel(label),
			item: `${this.locationRef.path()}/${url}`,
		}));
	}

	private buildSchema(breadcrumbs): string {
		const schema = {
			'@context': 'https://schema.org',
			'@type': 'BreadcrumbList',
			itemListElement: this.buildListItems(breadcrumbs),
		};
		return `<script type="application/ld+json">${JSON.stringify(
			schema,
			null,
			2
		)}</script>`;
	}

	private buildBreadCrumbs(url: string): any[] {
		// break the url into segments...
		const segments = url.split('/');
		// find 'detail' in the segments, if it exists. This is the PDP page.
		const pdpIndex = segments.indexOf('detail');
		// if a segment is all numeric, it is the retailer detail page..
		const farIndex = segments.reduce((a, c: string, index) => {
			return Number.isInteger(Number(c)) ? index : a;
		}, -1);

		const removeIndex =
			pdpIndex > -1 ? pdpIndex - 1 : farIndex > -1 ? farIndex : -1;

		// if the page is pdp or far, remove the url segments starting at the 'removeIndex'
		const keptSegments =
			removeIndex > -1 ? segments.slice(0, removeIndex) : segments;

		// For each segment, build the data: label + url
		// if there are any resource bundle overrides, use them
		return keptSegments.map((segment, index, arr) => {
			const resourceBundleOverride = index === 0 ? 'first' : 'second';
			let label =
				this.parameters[`${resourceBundleOverride}-title`] ||
				segment.replace(/-/g, ' ');
			const url =
				this.parameters[`${resourceBundleOverride}-url`] ||
				'/' + arr.filter((a, i) => i < index + 1).join('/');
			label = label === 'rigid vinyl' ? 'luxury vinyl' : label;
			return { label, url };
		});
	}

	public trackBy(el: any): number {
		return el.index;
	}

	public pageTitle$(): Observable<string> {
		return this._pageTitle$.pipe(
			map(({ qsTitle, urlTitle }) => {
				let title = qsTitle;

				if (title?.indexOf('  WetProtect') > -1) {
					title = title?.replace('  WetProtect', ' +WetProtect');
				}

				if (title?.indexOf('Outlast ') > -1) {
					title = title?.replace('Outlast ', 'Outlast+ ');
				}

				return this.isDynamic ? title : this.page.getTitle() || urlTitle;
			})
		) as Observable<string>;
	}

	ngOnInit(): void {
		this.breadcrumbs$ = this.route.queryParams.pipe(
			map((params) => params.title || null),
			map((title: string) => {
				// grab the current URL
				const url = this.pageURL.substring(1) || '';
				const qsTitle = !!title ? decodeURI(title) : null;
				const urlTitle = url.replace(/-/g, ' ');

				// pass the query string title and the url title to the pageTitle subject...
				this._pageTitle$.next({ qsTitle, urlTitle });

				// build the crumbs...
				return this.buildBreadCrumbs(url);
			}),
			map((crumbs: any[]) => {
				// if the page is not dynamic, we need to strip off the last crumb because
				// it will be handled by pageTitle$. Dynamic pages do not have titles so
				// we can leave the last crumb.
				const breadcrumbs = this.isDynamic ? crumbs : crumbs.slice(0, -1);
				this.jsonLD = this.buildSchema(breadcrumbs);

				return breadcrumbs;
			})
		);
	}
}
