import {
	ChangeDetectionStrategy,
	Component,
	SimpleChanges,
	OnChanges,
	Inject,
	HostListener,
} from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';

import { SimpleComponent } from '@shared/base-classes';
// import { RetailerRequestQuoteComponent } from '../retailer-request-quote/retailer-request-quote.component';
// import { RetailerApptModalComponent } from '../retailer-appt-modal/retailer-appt-modal.component';
// import { RetailerRequestCouponComponent } from '../retailer-request-coupon/retailer-request-coupon.component';
import { Retailer } from '@shared/interfaces';
import { StorageService, Eventservice } from '@core/services';
import { breakpoints, RetailerDetails, StorageKeys } from '@shared/constants';
import {
	getDisplayPhone,
	isIndependentRetailer,
	separateRetailerEmails,
} from '@shared/utilities/retailer.utilities';
import { WINDOW } from '@shared/utilities/window';
import { FindRetailerFacadeService } from '@features/find-retailer/find-retailer-facade.service';
import { RetailerRequestQuoteComponent } from '../retailer-request-quote/retailer-request-quote.component';
import { MyRetailerStoredData } from '@shared/interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { RetailerApptModalComponent } from '../retailer-appt-modal/retailer-appt-modal.component';
import { BreakpointObserver } from '@angular/cdk/layout';
export interface RetailerDetailProps {
	index?: number;
	result?: Retailer;
}

@Component({
  selector: 'mflooring-retailer-detail',
  templateUrl: './retailer-detail.component.html',
  styleUrls: ['./retailer-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RetailerDetailComponent
extends SimpleComponent<RetailerDetailProps, any>
implements OnChanges{
  isMobile: any;
  constructor(
		public dialog: MatDialog,
		private storage: StorageService,
		private eventservice: Eventservice,
		private facade: FindRetailerFacadeService,
		@Inject(WINDOW) readonly windowRef: Window,
		private route: ActivatedRoute,
		private router: Router,
		private breakpoint: BreakpointObserver
	) {
		super();
		this.mySelectedRetailer$ = this.storage
			.getItem(StorageKeys.myRetailer)
			.pipe(
				map((retailer: any) => {
					this.selectedRetailerID = retailer?.id;
					return this.selectedRetailerID;
				})
			);
	}
	@HostListener('window:resize', ['$event']) onResize() {
		this.isMobile = this.breakpoint.isMatched(breakpoints.mobileMax);
	}

  get retailerEmails() {
		return separateRetailerEmails(this.retailer?.dealerEmail);
	}

	get reviewUrl() {
		return this.retailer?.birdEyeUrl;
	}

	get webPhone() {
		return this.retailer?.phone.replace(/[()\-\s]/g, '');
	}

	get displayPhone() {
		return getDisplayPhone(this.retailer?.phone);
	}

	get zipcode() {
		return this.retailer?.zip;
	}

	get distance() {
		return `${Math.round(this.retailer?.distance * 100) / 100}mi`;
	}

	get reviews() {
		return this.retailer?.reviews;
	}

	get edgePremier() {
		return this.retailer?.edgePremier;
	}

	get edgeSelect() {
		return this.retailer?.edgeSelect;
	}

	get isIndependentRetailer() {
		const affiliation = this.retailer?.affiliation
			.replace(/\s/g, '')
			.toLowerCase();

		return isIndependentRetailer({ ...this.retailer, affiliation });
	}

	get hoursOfOperation() {
		const data =
			this.retailer?.operatingHours?.map((day) => {
				return day;
			}) || null;

		if (!data) {
			return null;
		}
		return data?.map((day) => {
			return {
				...day,
				from: RetailerDetailComponent?.getHourPlusMeridian(day?.hours?.open),
				to: RetailerDetailComponent?.getHourPlusMeridian(day?.hours?.close),
			};
		});
	}

	get collections() {
		return this.retailer?.collections;
	}

	public mySelectedRetailer$: Observable<boolean>;
	public retailer: Retailer;
	public retailerID$ = new BehaviorSubject<number>(null);
	public selectedRetailerID = null;
	public innerWidth;
	public isExpanded = false;
	public isDisabled = false;
	public collectionURL;
	public bar;

	private static getHourPlusMeridian(time) {
		if (!time) {
			return 'Closed';
		}
		let hour = time?.split(':')[0];
		let min = time?.split(':')[1];
		let part = hour > 12 ? 'pm' : 'am';
		min = (min + '').length == 1 ? `0${min}` : min;
		hour = hour > 12 ? hour - 12 : hour;
		hour = (hour + '').length == 1 ? `${hour}` : hour;
		return `${hour}:${min} ${part}`;
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

	public selectMyRetailer({ value }) {
		const { affiliation, zip } = value;
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
					locationId: this.selectedRetailerID ? this.selectedRetailerID : '',
					locationDeterminationMethod: 'Customer Selection',
				});

				const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
				if (!!returnUrl) {
					void this.router.navigateByUrl(returnUrl);
				}
			});
	}

	// public openCouponModal(type) {
	// 	this.dialog.open(RetailerRequestCouponComponent, {
	// 		width: 'auto',
	// 		maxWidth: '960px',
	// 		height: 'auto',
	// 		minHeight: '160px',
	// 		maxHeight: '570px',
	// 		panelClass: 'my-dialog',
	// 		autoFocus: false,
	// 		data: {
	// 			type,
	// 			retailer: this.retailer,
	// 			retailerId: this.retailer.dealerID,
	// 			retailerName: this.retailer.storeName,
	// 			retailerPhoneNumber: this.retailer.phone,
	// 			retailerLogo: this.retailer.logoUrl,
	// 			retailerOperatingHours: this.retailer.operatingHours,
	// 		},
	// 	});
	// }

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
	}

	public getRetailerSelectionLabel() {
		return this.retailer?.dealerID === this.selectedRetailerID
			? RetailerDetails.selected
			: RetailerDetails.unselected;
	}

	ngOnChanges(changes: SimpleChanges) {
		this.innerWidth = this.windowRef.screen.width;
		if (this.innerWidth > 768) {
			this.isExpanded = true;
			this.isDisabled = true;
		}
		this.retailer = changes.content.currentValue.result;
		this.retailerID$.next(this.retailer?.dealerID);


    console.log( changes.content)
	}

}
