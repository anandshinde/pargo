import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { map } from 'rxjs/operators';
import { CategoryListingMapper } from './category-listing.mapper';
import { combineLatest } from 'rxjs';
import {
	BloomreachBaseClass,
} from '@core/bloomreach';

@Component({
	selector: 'mflooring-category-listing',
	templateUrl: './category-listing.component.html',
	styleUrls: ['./category-listing.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryListingComponent
	extends BloomreachBaseClass
	implements OnInit
{
	constructor() {
		super();
	}

	ngOnInit(): void {
		super.ngOnInit();
	}
	public resourceBundle$ = this.resourceBundleData$.pipe(
		map((data: any) => {
			let resourceObj = {};
			data = Array.isArray(data) === true ? data : [];
			data.forEach((item) => {
				resourceObj = { ...resourceObj, ...item };
			});
			return resourceObj;
		})
	);
	public categoryListingContent$ = combineLatest([
		this.componentData$,
		this.componentParameters$,
	]).pipe(
		map(([data, params]: [any | any, any]) => {
			return CategoryListingMapper(data, params, this.page);
		})
	);
}
