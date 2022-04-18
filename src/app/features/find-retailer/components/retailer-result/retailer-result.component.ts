import {
	ChangeDetectionStrategy,
	Component,
	HostListener,
	Inject,
	OnChanges,
	SimpleChanges,
} from '@angular/core';
import { DatePipe } from '@angular/common';

import { MatDialog } from '@angular/material/dialog';

import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { SimpleComponent } from '@shared/base-classes';
import { MyRetailerStoredData, Retailer } from '@shared/interfaces';
import { StorageKeys, RetailerDetails, breakpoints } from '@shared/constants';
import { StorageService, Eventservice } from '@core/services';
import { RetailerRequestQuoteComponent } from '../retailer-request-quote/retailer-request-quote.component';
import {
	getDisplayPhone,
	getHoursOfOperation,
	getRetailerInfoURL,
	isIndependentRetailer,
	separateRetailerEmails,
} from '@shared/utilities/retailer.utilities';
import { WINDOW } from '@shared/utilities/window';
import { FindRetailerFacadeService } from '@features/find-retailer/find-retailer-facade.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RetailerApptModalComponent } from '../retailer-appt-modal/retailer-appt-modal.component';
import { BreakpointObserver } from '@angular/cdk/layout';

export interface RetailerResultProps {
	index?: number;
	result?: Retailer;
}

@Component({
	selector: 'mflooring-retailer-result',
	templateUrl: './retailer-result.component.html',
	styleUrls: ['./retailer-result.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RetailerResultComponent
	extends SimpleComponent<RetailerResultProps, any>
	implements OnChanges
{
	public mySelectedRetailer$: Observable<boolean>;
	public storeBC;
	isMobile: any;
	constructor(
		private router: Router,
		private route: ActivatedRoute,
		public dialog: MatDialog,
		private date: DatePipe,
		private storage: StorageService,
		private eventservice: Eventservice,
		private facade: FindRetailerFacadeService,
		private breakpoint: BreakpointObserver,
		@Inject(WINDOW) private windowRef: Window
	) {
		super();

		this.mySelectedRetailer$ = this.storage
			.getItem(StorageKeys.myRetailer)
			.pipe(map((retailer) => retailer?.id === this.retailer.dealerID));
	}
	@HostListener('window:resize', ['$event']) onResize() {
		this.isMobile = this.breakpoint.isMatched(breakpoints.mobileMax);
	}

	get retailer(): Retailer {
		return this.content?.result;
	}

	get edgePremier() {
		return this.retailer?.edgePremier;
	}

	get edgeSelect() {
		return this.retailer?.edgeSelect;
	}

	get displayPhone() {
		return getDisplayPhone(this.retailer?.phone);
	}

	get webPhone() {
		return this.retailer.phone.replace(/[()\-\s]/g, '');
	}

	get distance() {
		return `${Math.round(this.retailer.distance * 100) / 100}mi`;
	}

	get hoursOfOperation() {
		return getHoursOfOperation(this.retailer, this.date);
	}

	get isIndependentRetailer() {
		return isIndependentRetailer(this.retailer);
	}

	get retailerEmails() {
		return separateRetailerEmails(this.retailer?.dealerEmail);
	}

	get collections() {
		return this.retailer?.collections;
	}
	public getRetailerInfoURL() {
		return `${getRetailerInfoURL(
			this.retailer,
			this.windowRef
		)}?title=${this.retailer?.storeName.replace(/'/g, '').replace(/&/, 'and')}`;
	}

	public resultClicked() {
		this.eventservice.locationListingItemClicked({
			itemPosition: this.content.index + 1,
			locationType: this.isIndependentRetailer
				? this.edgePremier
					? 'specialty~premier'
					: this.edgeSelect
					? 'specialty~select'
					: 'specialty~preferred'
				: 'Retail Store',
			locationId: this.retailer.dealerID,
			locationName: this.retailer.storeName,
		});
	}
	public openModal(type) {
		this.dialog.open(RetailerRequestQuoteComponent, {
			width: '100%',
			maxWidth: '960px',
			height: 'auto',
			minHeight: '160px',
			maxHeight: '570px',
			panelClass: 'my-dialog',
			data: {
				type,
				retailerId: this.retailer.dealerID,
				retailerName: this.retailer.storeName,
			},
		});
	}
	public openAppointmentModal(type) {
		this.isMobile = this.breakpoint.isMatched(breakpoints.mobileMax);
		if(this.isMobile){
			this.dialog.open(RetailerApptModalComponent, {
				maxWidth: 'auto',
				height: 'auto',
				minHeight: '160px',
				maxHeight: '570px',
				panelClass: ['appointment-modal', 'my-dialog'],
				data: {
					type,
					retailerName: this.retailer.storeName,
					retailerOperatingHours: this.retailer.operatingHours,
					retailerDetails: this.retailer,
					retailerId: this.retailer.dealerID,
				},
			});
		}
		else {
			this.dialog.open(RetailerApptModalComponent, {
				width: '63vw',
				height: 'auto',
				minHeight: '160px',
				maxHeight: '570px',
				maxWidth: '820px',
				panelClass: ['appointment-modal', 'my-dialog'],
				data: {
					type,
					retailerName: this.retailer.storeName,
					retailerOperatingHours: this.retailer.operatingHours,
					retailerDetails: this.retailer,
					retailerId: this.retailer.dealerID,
				},
			});
		}
		console.log(this.isMobile)
	}
	public selectMyRetailer({ value }) {
		const { affiliation, id, name, zip }: MyRetailerStoredData = value;

		this.facade
			.getStoredResults(zip)
			.pipe(
				take(1),
				map((results: any[]) => {
					const alternate = this.facade.findAlternateRetailer(
						results,
						affiliation
					);
					const storedRetailerInfo = {
						...value,
						alternate,
						selectedManually: true,
					};

					this.storage.setItem(StorageKeys.myRetailer, storedRetailerInfo);
					return storedRetailerInfo;
				})
			)
			.subscribe((retailer: any) => {
				this.eventservice.locationSelected({
					locationName: retailer.name,
					locationType: this.isIndependentRetailer
						? this.edgePremier
							? 'specialty~premier'
							: this.edgeSelect
							? 'specialty~select'
							: 'specialty~preferred'
						: 'Retail Store',
					locationId: Number(retailer.id),
					locationDeterminationMethod: 'Customer Selection',
				});

				const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
				if (!!returnUrl) {
					void this.router.navigateByUrl(returnUrl);
				}
			});
	}

	public getSelectedRetailerLabel(selected) {
		return selected ? RetailerDetails.selected : RetailerDetails.unselected;
	}

	ngOnChanges(changes: SimpleChanges) {
		// Need to resolve `'` in query string/angular routing``
		this.storeBC = this.retailer?.storeName.replace(/'/g, '');
	}
}
