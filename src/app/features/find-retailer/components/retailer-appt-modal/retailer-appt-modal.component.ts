import {
	Component,
	Inject,
	OnInit,
	ViewChild,
	ElementRef,
	AfterViewInit,
	ChangeDetectionStrategy,
	TemplateRef,
	HostListener,
} from '@angular/core';
import { DatePipe, ViewportScroller } from '@angular/common';
import { Router } from '@angular/router';

import { MatStepper } from '@angular/material/stepper';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import {
	CalendarEvent,
	CalendarMonthViewDay,
	CalendarView,
} from 'angular-calendar';

import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { UserDetailsForm } from './user-details.form';
import { InputTextPresentationProps } from '@app/shared/interfaces';
import { FindRetailerFacadeService } from '../../find-retailer-facade.service';
import {
	RetailerConstant,
	InputTextTypes,
	monthsOfYear,
	daysOfWeek,
	breakpoints,
} from '@shared/constants';
import { Eventservice } from '@app/core/services/events.service';
import { CalendarDateFormatter } from 'angular-calendar';
import { CustomDateFormatter } from './calendar-date-formatter.provider';
import { BreakpointObserver } from '@angular/cdk/layout';

const apiInfo = {
	ActivityType: '',
	Address1: null,
	Address2: null,
	City: null,
	ContactPreference: RetailerConstant.ContactPreference,
	ContactRequestType: null,
	Country: null,
	CouponDeliveryStatus: null,
	CouponDeliveryType: null,
	CouponExpirationDate: '2021-02-15T15:14:03.527Z',
	DateLastChanged: '2021-02-15T15:14:03.527Z',
	FlooringItems: [],
	HubSpotContactID: null,
	HubSpotFormID: null,
	HubSpotPortalId: null,
	HubSpotUtk: null,
	// InterestAreaRug: null,
	// InterestCarpet: false,
	// InterestCeramicTile: false,
	// InterestHardwood: false,
	// InterestLaminate: false,
	// InterestLuxuryVinylTile: false,
	// InterestOther: null,
	// InterestRigidVinyl: false,
	// InterestVinylSheet: false,
	KarastanCouponExpirationDate: '2021-02-15T15:14:03.527Z',
	LeadActivated: 0,
	LeadActivity: null,
	LeadCampaign: null,
	LeadCreateDate: '2021-02-15T18:14:03.526Z',
	LeadForm: null,
	LeadID: 0,
	LeadSource: null,
	LeadSourceDetail: null,
	// LeadUrl: RetailerConstant.LeadUrl,
	ReferringUrl: null,
	SMSMessageID: null,
	SearchKeyword: null,
	Site: 0,
	State: null,
	SubscribedToNewsletter: RetailerConstant.SubscribedToNewsletter,
	TimeFrame: RetailerConstant.TimeFrame,
	UserIP: null,
	Zip: null,
};

@Component({
	selector: 'mflooring-retailer-appt-modal',
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './retailer-appt-modal.component.html',
	styleUrls: ['./retailer-appt-modal.component.scss'],
	providers: [
		{
			provide: CalendarDateFormatter,
			useClass: CustomDateFormatter,
		},
	],
})
export class RetailerApptModalComponent implements OnInit, AfterViewInit {
	@ViewChild('picker', { static: false }) picker: ElementRef<HTMLElement>;
	@ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;
	@ViewChild('stepper') private myStepper: MatStepper;

	private _dateTime = null;
	public currentStep = 0;
	public leftIconDisabled = new BehaviorSubject(false);
	public rightIconDisabled = new BehaviorSubject(false);
	public errorResponseMessage = new BehaviorSubject(null);
	public formStartFlag: Boolean;

	// default state, assuming its desktop.
	public isMobile = false;
	public prev_isMobile = false;

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: any,
		private dialogRef: MatDialog,
		private findRetailerFacadeService: FindRetailerFacadeService,
		private datePipe: DatePipe,
		private router: Router,
		public eventservice: Eventservice,
		private viewportScroller: ViewportScroller,
		private breakpoint: BreakpointObserver
	) {}

	viewDate: Date = new Date();
	view: CalendarView = CalendarView.Month;
	refresh: Subject<any> = new Subject();
	public form = UserDetailsForm();
	appointmentStatus = new BehaviorSubject<boolean>(false);
	message: string;
	newAppointment = true;
	stepperName = ['Choose a Date', 'Choose a Time', 'Your Information Details'];
	totalSteps = this.stepperName.length;
	currentMonthYear = '';
	selectedDate = '';
	selectedDateTime = '';
	dealerName = '';
	workingHours: number[];
	workHolidays = ['Saturday', 'Sunday'];
	returnHolidays;

	ngOnInit(): void {
		// getting the value and setting the initial state
		this.isMobile = this.breakpoint.isMatched(breakpoints.mobileMax);
		this.formStartFlag = true;
		this.currentMonthYear =
			monthsOfYear[this.viewDate.getMonth()] +
			' ' +
			this.viewDate.getFullYear();
		this.eventservice.formTracking({
			event: 'Form Viewed',
			formID: 'retailer appiontment form',
			formName: 'Retailer appiontment',
			formType: 'Retailer appiontment',
		});
		this.form.valueChanges.subscribe((res) => {
			if (this.formStartFlag) {
				this.eventservice.formTracking({
					event: 'Form Started',
					formID: 'retailer appointment form',
					formName: 'Retailer appiontment',
					formType: 'Retailer appiontment',
				});
				this.formStartFlag = true;
			}
		});
	}
	ngAfterViewInit() {
		setTimeout(() => {
			this.leftIconDisabled.next(true);
		}, 200);
	}
	applyDateSelectionPolicy({ body }: { body: CalendarMonthViewDay[] }): void {
		let dayValue = body[0];

		let startDate = new Date();
		startDate.setDate(startDate.getDate() + 1);

		if (daysOfWeek[startDate.getDay()] == 'Saturday') {
			startDate.setDate(startDate.getDate() + 1);
		} else if (daysOfWeek[startDate.getDay()] == 'Sunday') {
			startDate.setDate(startDate.getDate() + 2);
		}

		startDate.setHours(0);
		startDate.setMinutes(0);
		startDate.setSeconds(0);
		startDate.setMilliseconds(0);
		startDate.setUTCSeconds(0);

		let numWeeks = 4;
		let fourWeeksFromNow = new Date();
		fourWeeksFromNow.setDate(fourWeeksFromNow.getDate() + numWeeks * 7);

		fourWeeksFromNow.setHours(0);
		fourWeeksFromNow.setMinutes(0);
		fourWeeksFromNow.setSeconds(0);
		fourWeeksFromNow.setMilliseconds(0);
		fourWeeksFromNow.setUTCSeconds(0);

		let endDate = JSON.parse(JSON.stringify(dayValue));
		endDate.date = fourWeeksFromNow;
		endDate.inMonth = false;
		endDate.isFuture = true;
		endDate.isPast = false;
		endDate.isToday = false;
		endDate.day = fourWeeksFromNow.getDay();

		if (endDate.day == 6 || endDate.day == 0) {
			endDate.isWeekend == true;
		} else {
			endDate.isWeekend == false;
		}

		let retailerOperatingHours = this.data.retailerOperatingHours;
		let holidays = [];
		retailerOperatingHours.map((operatingHours) => {
			if (
				operatingHours.hours.open == null &&
				operatingHours.hours.close == null
			) {
				holidays.push(operatingHours.dayOfWeek);
			}
		});

		if (retailerOperatingHours.length == 0) {
			holidays = this.workHolidays;
		}
		this.returnHolidays = holidays;

		body.forEach((day) => {
			day.cssClass = 'disabled-date';
			if (
				this.currentMonthYear.indexOf(monthsOfYear[startDate.getMonth()]) == -1
			) {
				if (day.date <= fourWeeksFromNow) {
					day.cssClass = 'enabled-date';
				}
			}
			if (
				this.currentMonthYear.indexOf(monthsOfYear[startDate.getMonth()]) != -1
			) {
				if (day.date == startDate) {
					day.cssClass = 'enabled-date';
				} else if (day.date > startDate && day.date < endDate.date) {
					day.cssClass = 'enabled-date';
				}
				// else if (endDate.date < day.date) {
				// 	day.cssClass = 'enabled-date';
				// }
			}
			if (holidays.indexOf(daysOfWeek[day.date.getDay()]) != -1) {
				day.cssClass = 'disabled-date';
			}
		});
		if (fourWeeksFromNow.getMonth() === startDate.getMonth()) {
			this.rightIconDisabled.next(true);
			this.leftIconDisabled.next(true);
		}
	}
	onNoClick() {
		this.dialogRef.closeAll();
	}
	prevStepper() {
		this.currentStep -= 1;
		this.errorResponseMessage.next(null);
	}
	nextStepper() {
		this.currentStep += 1;
	}
	goBack() {
		this.myStepper.previous();
		this.errorResponseMessage.next(null);
	}
	goForward() {
		this.myStepper.next();
	}
	public dayClicked(
		{ date }: { date: Date; events: CalendarEvent[] },
		event
	): void {
		this._dateTime = date; //this.datePipe.transform(date, 'EEEE, MMMM d');
		const operatingHours = this.data.retailerOperatingHours;
		const hours =
			!!operatingHours && operatingHours.length > 0
				? this.data.retailerOperatingHours.filter((item) => {
						return daysOfWeek[date.getDay()] == item.dayOfWeek;
				  })[0]?.hours
				: null;

		if (!!hours) {
			const open = parseInt(hours.open?.split(':')[0]);
			const close = parseInt(hours.close?.split(':')[0]);
			this.workingHours = Array.from(
				{ length: close - open },
				(v, k) => k + open
			);
		}
		this.nextStepper();
		this.goForward();
	}
	timeClicked(hour) {
		this._dateTime.setHours(hour);
		this.nextStepper();
		this.goForward();
	}
	get dateTime() {
		return new Date(this._dateTime);
	}
	get firstName() {
		return this.form.get('firstName');
	}
	get lastName() {
		return this.form.get('lastName');
	}
	get email() {
		return this.form.get('email');
	}
	get phoneNumber() {
		return this.form.get('phoneNumber');
	}
	get leaveMessage() {
		return this.form.get('leaveMessage');
	}
	get inputTextPresentation(): InputTextPresentationProps {
		return {
			type: InputTextTypes.form,
		};
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
	onSubmit(formValues: any) {
		const info = {
			...apiInfo,
			AppointmentDate:
				this.datePipe.transform(this._dateTime, 'yyyy-MM-ddThh:mm:ss') +
				'.527Z',
			LeadUrl: (RetailerConstant.LeadUrl).replace("9592",this.data.retailerId),
			Email: formValues.email,
			FirstName: formValues.firstName,
			LastName: formValues.lastName,
			Notes: formValues.leaveMessage,
			Phone: formValues.phoneNumber,
			StoreId: this.data.retailerId,
		};

		this.appointmentStatus.next(true);
		this.dealerName = this.data.retailerName;
		this.findRetailerFacadeService
			.bookAnAppointment$(info)
			.pipe(take(1))
			.subscribe((response) => {
				if (response.success === true) {
					setTimeout(() => {
						this.newAppointment = false;
						this.appointmentStatus.next(true);
						this.dealerName = this.data.retailerName;
					}, 200);
					this.eventservice.formSubmissionSucceeded(
						{
							transactionID: null,
						},
						{
							formName: 'Retailer appiontment',
							formID: 'retailer appiontment form',
							formType: 'Retailer appiontment',
						}
					);
				} else {
					this.errorResponseMessage.next(response.message);
					this.eventservice.formSubmissionFailed({
						formError: response.error,
						formID: 'retailer appiontment form',
						formName: 'Retailer appiontment',
						formType: 'Retailer appiontment',
					});
				}
			});
	}
	closeOpenMonthViewDayPrev() {
		this.currentMonthYear =
			monthsOfYear[this.viewDate.getMonth()] +
			' ' +
			this.viewDate.getFullYear();
		this.rightIconDisabled.next(false);
		this.leftIconDisabled.next(true);
	}
	closeOpenMonthViewDayNext() {
		this.currentMonthYear =
			monthsOfYear[this.viewDate.getMonth()] +
			' ' +
			this.viewDate.getFullYear();
		this.rightIconDisabled.next(true);
		this.leftIconDisabled.next(false);
	}
	@HostListener('window:resize', ['$event']) onResize() {
		this.isMobile = this.breakpoint.isMatched(breakpoints.mobileMax);
		// our view state has changed
		if (this.isMobile != this.prev_isMobile) {
			this.prev_isMobile = this.isMobile;
			// close the dialog
			this.dialogRef.closeAll();
		}
	}
}
