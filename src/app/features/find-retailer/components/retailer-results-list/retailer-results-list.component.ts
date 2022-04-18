import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SimpleComponent } from '@shared/base-classes';
import { FindRetailerResultsProps } from '@shared/interfaces';

@Component({
	selector: 'mflooring-retailer-results-list',
	templateUrl: './retailer-results-list.component.html',
	styleUrls: ['./retailer-results-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RetailerResultsListComponent extends SimpleComponent<
	FindRetailerResultsProps,
	any
> {
	constructor() {
		super();
	}

	get isLoading() {
		return this.presentation.isLoading;
	}

	get results() {
		return this.content.retailers;
	}
}
