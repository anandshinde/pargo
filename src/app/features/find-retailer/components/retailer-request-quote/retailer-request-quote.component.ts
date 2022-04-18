import { Component, OnInit, Inject, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';

import { RetailerRequestQuoteForm } from './retailer-request-quote.form';
import { FindRetailerFacadeService } from '../../find-retailer-facade.service';
import { RetailerConstant } from '@shared/constants/storage.constants';
import { Eventservice } from '@app/core/services/events.service';
import { WINDOW } from '@shared/utilities/window';
import { ViewportScroller } from '@angular/common';
@Component({
	selector: 'mflooring-retailer-request-quote',
	templateUrl: './retailer-request-quote.component.html',
	styleUrls: ['./retailer-request-quote.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RetailerRequestQuoteComponent implements OnInit {
	public form = RetailerRequestQuoteForm();
	quoteStatus = false;
	DealerName;
	public baseUrl: string;
	public formStartFlag: Boolean;
	appointmentStatus = new BehaviorSubject<boolean>(false);
	public errorResponseMessage = new BehaviorSubject(null);
	public interestedIn: Array<any> = [
		{
			description: 'Carpet',
			value: 'Carpet',
		},
		{
			description: 'Ceramic Tile',
			value: 'Ceramic Tile',
		},{
			description: 'Hardwood',
			value: 'Hardwood',
		},{
			description: 'Luxury Vinyl Tile',
			value: 'Luxury Vinyl Tile',
		},{
			description: 'Laminate',
			value: 'Laminate',
		},{
			description: 'Vinyl Sheet',
			value: 'Vinyl Sheet',
		},
	];
	preferredItems: string[] = ['Email', 'Phone'];
	months: string[] = ['1 month', '2-3 month', '3-6 month', '6-12 month'];
	purchaseDropdown = false;
	newQuote = true;
	constructor(
		@Inject(MAT_DIALOG_DATA) public data: any,
		@Inject(WINDOW) private windowRef: Window,
		private dialogRef: MatDialog,
		private findRetailerFacadeService: FindRetailerFacadeService,
		private router: Router,
		public eventservice: Eventservice,
		private viewportScroller: ViewportScroller
	) {}

	ngOnInit(): void {
		this.formStartFlag = true;
		this.eventservice.formTracking({
			event: 'Form Viewed',
			formID: 'retailer request quote form',
			formName: 'Retailer Request Quote',
			formType: 'Retailer Request Quote',
		});
		this.form.valueChanges.subscribe(() => {
			if (this.formStartFlag) {
				this.eventservice.formTracking({
					event: 'Form Started',
					formID: 'retailer request quote form',
					formName: 'Retailer Request Quote',
					formType: 'Retailer Request Quote',
				});
				this.formStartFlag = false;
			}
		});

		const port = this.windowRef.location.port || null;
		this.baseUrl = `//${this.windowRef.location.hostname}${
			!!port ? ':' + port : ''
		}/privacy`;
	}
	get preferred() {
		return this.form.get('preferred');
	}

	onCheckChange(event): void {
		const formArray: FormArray = this.form.get('interestedIn') as FormArray;
		if (event.target.checked) {
			formArray.push(new FormControl(event.target.value));
		} else {
			let i = 0;
			formArray.controls.forEach((ctrl: FormControl) => {
				if (ctrl.value == event.target.value) {
					formArray.removeAt(i);
					return;
				}
				i++;
			});
		}
	}

	get email() {
		return this.form.get('email');
	}

	get purchaseMonth() {
		return this.form.get('purchaseMonth');
	}

	get firstName() {
		return this.form.get('firstName');
	}

	get lastName() {
		return this.form.get('lastName');
	}

	get mailingList() {
		return this.form.get('mailingList');
	}

	get phoneNumber() {
		return this.form.get('phoneNumber');
	}
	onSubmit(formValues: any) {
		// const formattedPhone = formValues.phoneNumber.replace(/\D/g, '');
		const retailerQuote = {
			FlooringItems: [],
			LeadID: 0,
			LeadCreateDate: '2021-02-18T15:29:46.815Z',
			CouponDeliveryType: '',
			CouponDeliveryStatus: '',
			FirstName: formValues.firstName,
			LastName: formValues.lastName,
			Email: formValues.email,
			Address1: '',
			Address2: '',
			City: '',
			State: '',
			Zip: '',
			Country: '',
			Phone: formValues.phoneNumber.replace(/\D/g, ''),
			StoreId: this.data.retailerId,
			ActivityType: '',
			Notes: '',
			AppointmentDate: '',
			ContactRequestType: formValues.preferred,
			TimeFrame: formValues.purchaseMonth,
			HubSpotPortalId: 0,
			HubSpotFormID: '',
			SMSMessageID: '',
			HubSpotUtk: '',
			HubSpotContactID: '',
			UserIP: '',
			LeadUrl:(RetailerConstant.LeadUrl).replace("9592",this.data.retailerId),
			SubscribedToNewsletter: formValues.mailingList,
			LeadCampaign: '',
			LeadSource: '',
			LeadSourceDetail: '',
			LeadForm: '',
			SearchKeyword: '',
			ContactPreference: RetailerConstant.ContactPreference,
			ReferringUrl: '',
			InterestCarpet: formValues.interestedIn.includes(
				'Carpet'),
			InterestHardwood: formValues.interestedIn.includes(
				'Hardwood'),
			InterestLaminate: formValues.interestedIn.includes(
				'Laminate'),
			InterestCeramicTile: formValues.interestedIn.includes(
				'Ceramic Tile'),
			InterestLuxuryVinylTile: formValues.interestedIn.includes(
				'Luxury Vinyl Tile'),
			InterestVinylSheet: formValues.interestedIn.includes(
				'Vinyl Sheet'),
			InterestAreaRug: '',
			InterestOther: '',
			InterestRigidVinyl: formValues.interestedIn.includes(
				'Pergo Extreme Rigid Vinyl'
			),
			LeadActivity: '',
			LeadActivated: 0,
			DateLastChanged: '2021-02-18T15:29:46.815Z',
			CouponExpirationDate: '2021-02-18T15:29:46.815Z',
			KarastanCouponExpirationDate: '2021-02-18T15:29:46.815Z',
			Site: 1,
		};
		this.findRetailerFacadeService
			.getRetailerQuote(retailerQuote)
			.pipe(take(1))
			.subscribe((response) => {
				if (response) {
					this.newQuote = false;
					this.quoteStatus = true;
					this.appointmentStatus.next(true);
					this.DealerName = this.data.retailerName;
					this.eventservice.formSubmissionSucceeded(
						{
							transactionID: null,
						},
						{
							formName: 'Retailer Request Quote',
							formID: 'retailer request quote form',
							formType: 'Retailer Request Quote',
						}
					);
				}
			});
	}

	onNoClick() {
		this.dialogRef.closeAll();
	}

	goHome(event: MouseEvent) {
		event.preventDefault();
		this.router.navigate(['/']).then(() => {
			this.onNoClick();
			setTimeout(() => {
				this.viewportScroller.scrollToPosition([0, 0]);
			}, 500);
		});
	}
}
