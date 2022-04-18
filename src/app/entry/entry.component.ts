import {
	ChangeDetectionStrategy,
	Component,
	Inject,
	InjectionToken,
	OnInit,
	Optional,
} from '@angular/core';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { Page } from '@bloomreach/spa-sdk';
import { BrPageComponent } from '@bloomreach/ng-sdk';

import {
	ActivatedRoute,
	NavigationEnd,
	Router,
	RouterEvent,
} from '@angular/router';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

import { BrMappedComponents } from '@app/features';

export const CMS_BASE_URL = new InjectionToken<string>('brXM Base URL');
export const SPA_BASE_URL = new InjectionToken<string>('SPA Base URL');

@Component({
	selector: 'mflooring-entry-component',
	templateUrl: './entry.component.html',
	styleUrls: ['./entry.component.scss'],
	changeDetection: ChangeDetectionStrategy.Default,
})
export class EntryComponent implements OnInit {
	public configuration: BrPageComponent['configuration'];

	public mapping = { ...BrMappedComponents };
	public navigationEnd$: Observable<NavigationEnd>;
	public pageTemplate: string;

	constructor(
		private router: Router,
		private activatedRoute: ActivatedRoute,
		@Inject(CMS_BASE_URL) cmsBaseUrl: string,
		@Inject(SPA_BASE_URL) spaBaseUrl: string
	) {
		this.configuration = {
			cmsBaseUrl,
			spaBaseUrl,
			request: {
				path: router.url,
			},
		} as BrPageComponent['configuration'];

		this.navigationEnd$ = this.router.events.pipe(
			filter((event: RouterEvent) => event instanceof NavigationEnd)
		) as Observable<NavigationEnd>;
	}

	getPageTemplate(page) {
		return (
			((page?.toJSON() as any).page._meta?.params?.template as string) ||
			'single-column'
		);
	}

	setVisitor(page?: Page) {
		this.configuration.visitor = page?.getVisitor();
	}

	ngOnInit() {
		this.navigationEnd$.subscribe((event: NavigationEnd) => {
			this.configuration = {
				...this.configuration,
				request: { path: event.url },
			};
		});
	}
}
