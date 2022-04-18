import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import {
	ActivatedRoute,
	Params,
	PRIMARY_OUTLET,
	Router,
	UrlSegment,
	UrlSegmentGroup,
	UrlSerializer,
	UrlTree,
} from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class UrlStateService {
	private _routeParams$: BehaviorSubject<Params> = new BehaviorSubject<Params>({
		zip: null,
		filter: null,
		page: 1,
		q: null,
		collection: null,
	});

	constructor(
		private router: Router,
		private location: Location,
		private serializer: UrlSerializer,
		private route: ActivatedRoute
	) {}

	public queryStringParams$(): Observable<Params> {
		return this._routeParams$;
	}

	public updateQueryParams(params: Params) {
		return new Promise((resolve) => {
			const urlTree: UrlTree = this.router.createUrlTree([], {
				queryParams: { ...params },
				queryParamsHandling: 'merge',
			});
			this.location.replaceState(this.serializer.serialize(urlTree));
			resolve(urlTree);
		});
	}

	public setQueryParams(params: Params) {
		this.updateQueryParams(params).then((urlTree: UrlTree) => {
			this._routeParams$.next({ ...urlTree.queryParams });
		});
	}

	public updateUrlNoRouting(path) {
		this.location.replaceState(path);
	}

	public setUrl(path: string) {
		void this.router.navigate([`shop/${path}`], { relativeTo: this.route });
	}
}
