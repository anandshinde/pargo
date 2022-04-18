import {
	ChangeDetectionStrategy,
	Component,
	Inject,
	OnChanges,
	OnDestroy,
	QueryList,
	SimpleChanges,
	ViewChild,
	ViewChildren,
	AfterViewInit,
	HostListener,
} from '@angular/core';
import { DatePipe } from '@angular/common';
import { GoogleMap, MapInfoWindow } from '@angular/google-maps';
import { MatDialog } from '@angular/material/dialog';

import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { takeUntil, take } from 'rxjs/operators';

import { SimpleComponent } from '@shared/base-classes';
import { Retailer } from '@shared/interfaces';
import { getRetailerInfoURL } from '@shared/utilities/retailer.utilities';
import { ScriptService, StorageService } from '@core/services';
import { WINDOW } from '@shared/utilities/window';
import { breakpoints, StorageKeys } from '@app/shared/constants';

import {
	getDisplayPhone,
	getHoursOfOperation,
	separateRetailerEmails,
} from '@shared/utilities/retailer.utilities';
import { BreakpointObserver } from '@angular/cdk/layout';
import { RetailerApptModalComponent } from '@app/features/find-retailer/components/retailer-appt-modal/retailer-appt-modal.component';
import { RetailerRequestQuoteComponent } from '@app/features/find-retailer/components/retailer-request-quote/retailer-request-quote.component';

export interface MappingComponentProps {
	markers?: Retailer[];
	center?: any;
	options?: any;
	isDetail?: boolean;
	apiKey?: string;
}

@Component({
	selector: 'mflooring-mapping',
	templateUrl: './mapping.component.html',
	styleUrls: ['./mapping.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MappingComponent
	extends SimpleComponent<MappingComponentProps, any>
	implements OnChanges, OnDestroy, AfterViewInit
{
	protected unsubscribe = new Subject();
	private geocoder: any;
	private bounds$ = new Subject();
	private currentMarkers = '';
	private infoWindowOpen: boolean = false;
	private viewChanged: boolean = true;

	public mapCenter = new BehaviorSubject<any>(null);
	public infoContent: Retailer;
	public mapIsLoaded$ = new BehaviorSubject<boolean>(false);

	public showMap = false;
	public zoomLevel = 12;
	isMobile: boolean;

	@ViewChild(GoogleMap) map: GoogleMap;
	@ViewChild(MapInfoWindow, { static: false }) infoWindow: MapInfoWindow;
	@ViewChildren('marker') markers: QueryList<any>;

	constructor(
		public dialog: MatDialog,
		private date: DatePipe,
		private scriptService: ScriptService,
		private storage: StorageService,
		@Inject(WINDOW) private windowRef: Window,
		private breakpoint: BreakpointObserver
	) {
		super();

		// Load Google Maps
		// script will check if google is already available and load the script tag if not...
		// need to research using resource bundle value for API key
		const googleAPI = localStorage.getItem('googleAPI');
		this.scriptService
			.loadScript(
				'google',
				'https://maps.googleapis.com/maps/api/js?key='+googleAPI
			)
			.pipe(take(1))
			.subscribe((response) => {
				if (response === true) {
					this.mapIsLoaded$.next(true);
					this.geocoder = new google.maps.Geocoder();
					//localStorage.setItem('googleAPI', '')
				}
			});

		this.bounds$.pipe(takeUntil(this.unsubscribe)).subscribe((bounds: any) => {
			if (!!this.mapIsLoaded$.getValue()) {
				this.map?.googleMap.fitBounds(bounds);
			}
		});
	}
	@HostListener('window:resize', ['$event']) onResize() {
		this.isMobile = this.breakpoint.isMatched(breakpoints.mobileMax);
	}
	public trackBy(index: number, el: any): number {
		return el.id;
	}

	protected getBounds(markers) {
		const arr = {
			north: undefined,
			south: undefined,
			east: undefined,
			west: undefined,
		};

		if (!markers || !markers.length) {
			return null;
		}

		for (const marker of markers) {
			// set the coordinates to marker's lat and lng on the first run.
			// if the coordinates exist, get max or min depends on the coordinates.
			arr.north =
				arr.north !== undefined ? Math.max(arr.north, marker.lat) : marker.lat;
			arr.south =
				arr.south !== undefined ? Math.min(arr.south, marker.lat) : marker.lat;
			arr.east =
				arr.east !== undefined ? Math.max(arr.east, marker.lng) : marker.lng;
			arr.west =
				arr.west !== undefined ? Math.min(arr.west, marker.lng) : marker.lng;
		}
		return arr;
	}

	private centerMapBasedOnZip(zip: string) {
		if (!!this.geocoder) {
			this.geocoder.geocode({ address: zip }, (results, status) => {
				if (status === google.maps.GeocoderStatus.OK) {
					this.mapCenter.next({
						lat: results[0].geometry.location.lat(),
						lng: results[0].geometry.location.lng(),
					});
					this.mapIsLoaded$.next(true);
				}
			});
		}
	}

	get hoursOfOperation() {
		return getHoursOfOperation(this.infoContent, this.date);
	}

	getDisplayPhone() {
		return getDisplayPhone(this.infoContent?.phone);
	}

	get retailerEmails() {
		return separateRetailerEmails(this.infoContent?.dealerEmail);
	}

	openInfo(marker: any = this.markers.first, content) {
		this.infoContent = content;
		this.infoWindow?.open(marker);
		this.infoWindowOpen = true;
	}

	ngOnChanges(changes: SimpleChanges) {
		const { currentValue, previousValue } = changes?.content;
		const markers = currentValue?.markers;
		const zip = currentValue?.center;
		const previousZip = previousValue?.center;
		const marker = markers?.[0];
		let lat = marker?.lat || parseFloat('41.79578043176353');
		let lng = marker?.lng || parseFloat('-94.0388717856837');
		this.viewChanged = true;
		this.infoWindowOpen = false;

		if (!markers.length) {
			this.showMap = true;
			this.zoomLevel = 4;
		}

		// check to see if the selected zip has changed before we mess with the map zoom
		if (!!markers?.length && this.content.markers.length >= 1) {
			const [content] = markers;
			this.infoContent = content;
			this.currentMarkers = markers;
			this.showMap = true;
			this.zoomLevel = 12;
		}
		if (lat && lng) {
			this.mapCenter.next({ lat, lng });

			if (previousZip && zip && previousZip === zip) {
				setTimeout(() => {
					if (!this.infoWindowOpen) {
						const [content] = this.content.markers;
						this.openInfo(this.markers.first, content);
					}
				}, 0);
			}
		} else if (zip) {
			this.centerMapBasedOnZip(zip);
		}
	}

	ngOnDestroy(): void {
		localStorage.removeItem("googleAPI");
		this.unsubscribe.next();
		this.unsubscribe.complete();
	}

	ngAfterViewInit() {
		this.markers.changes.subscribe(({ first }) => {
			if (this.viewChanged) {
				const [content] = this.content.markers;
				const bounds = this.getBounds(this.content.markers);
				if (!!bounds) {
					this.map?.googleMap?.panToBounds(bounds);
				}
				this.openInfo(first, content);
			}
		});

		this.storage
			.getItem(StorageKeys.selectedZip)
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(() => {
				const [content] = this.content.markers;
				const bounds = this.getBounds(this.content.markers);
				if (!!bounds) {
					this.map?.googleMap?.panToBounds(bounds);
				}
				this.openInfo(content?.[0], content);
			});
	}

	getRetailerInfoURL() {
		return `${getRetailerInfoURL(
			this.infoContent,
			this.windowRef
		)}?title=${this.infoContent?.storeName.replace(/'/g, '')}`;
	}

	public onMarkerClick(marker, pin) {
		this.viewChanged = false;
		this.openInfo(marker, pin);
	}

	public openAppointmentModal(type) {
		this.isMobile = this.breakpoint.isMatched(breakpoints.mobileMax);
		if (this.isMobile) {
			this.dialog.open(RetailerApptModalComponent, {
				maxWidth: 'auto',
				height: 'auto',
				minHeight: '160px',
				maxHeight: '570px',
				panelClass: ['appointment-modal', 'my-dialog'],
				data: {
					type,
					retailerName: this.infoContent.storeName,
					retailerOperatingHours: this.infoContent.operatingHours,
					retailerDetails: this.infoContent,
					retailerId: this.infoContent.dealerID,
				},
			});
		} else {
			this.dialog.open(RetailerApptModalComponent, {
				width: '63vw',
				height: 'auto',
				minHeight: '160px',
				maxHeight: '570px',
				maxWidth: '820px',
				panelClass: ['appointment-modal', 'my-dialog'],
				data: {
					type,
					retailerName: this.infoContent.storeName,
					retailerOperatingHours: this.infoContent.operatingHours,
					retailerDetails: this.infoContent,
					retailerId: this.infoContent.dealerID,
				},
			});
		}
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
				retailerId: this.infoContent.dealerID,
				retailerName: this.infoContent.storeName,
			},
		});
	}
}
