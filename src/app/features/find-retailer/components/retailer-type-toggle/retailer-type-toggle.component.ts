import {
	AfterViewInit,
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	HostListener,
	Input,
	OnInit,
	Output,
	ViewChild,
} from '@angular/core';
import { MatSelect } from '@angular/material/select';
import { Eventservice } from '@core/services';

@Component({
	selector: 'mflooring-retailer-type-toggle',
	templateUrl: './retailer-type-toggle.component.html',
	styleUrls: ['./retailer-type-toggle.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RetailerTypeToggleComponent implements AfterViewInit {
	@ViewChild(MatSelect, { static: false })
	public selectComponent;
	@Output() updateRetailer = new EventEmitter<string>();
	@Input() selectedRetailer: string = null;
	@Input() allRetailers: any[];
	@ViewChild('matSelect') matSelect;

	@HostListener('window:scroll', ['$event']) onScroll(): void {
		this.matSelect.close();
	}

	constructor(public eventservice: Eventservice) {}

	public filterListByRetailer(retailer) {	
		let oldRetailer = this.selectedRetailer;
		this.updateRetailer.emit(retailer);
		retailer !== 'all'
			? this.eventservice.listingFilterAdded({
					listingType: 'Location',
					filterList: 'retailerType~' + retailer,
			  })
			: this.eventservice.listingFilterRemoved({
					listingType: 'Location',
					filterList: 'retailerType~' + oldRetailer,
			  });
	}

	ngAfterViewInit() {	
		//this.selectComponent.overlayDir.backdropClass = 'retailer-type-select';
	}
}
