import {
	ChangeDetectionStrategy,
	Component,
	HostListener,
	Input,
	OnChanges,
	SimpleChanges,
} from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { ActivatedRoute, Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';

import { distinctUntilChanged, map, take, takeUntil } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { breakpoints, StorageKeys } from '@app/shared/constants';
import { getCartPosition } from '@shared/utilities/cart.utilities';

import { UtilityActionsdialogComponent } from '../utility-actionsdialog/utility-actionsdialog.component';
import { UnsubscribeOnDestroy } from '@app/shared/base-classes';
import { AuthService } from '@core/services/auth.service';
import { StorageService } from '@app/core/services/storage.service';

@Component({
	selector: 'mflooring-utility-actions',
	templateUrl: './utility-actions.component.html',
	styleUrls: ['./utility-actions.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UtilityActionsComponent
	extends UnsubscribeOnDestroy
	implements OnChanges
{
	@Input() content: any;

	public isMobile = null;

	public myRetailer$: Observable<any>;
	public getUserName$: Observable<string> = this.storage
		.getItem(StorageKeys.userName)
		.pipe(distinctUntilChanged());

	@HostListener('window:resize', ['$event']) onResize() {
		this.isMobile = this.breakpoint.isMatched(breakpoints.mobileMax);
	}

	constructor(
		private auth$: AuthService,
		public cartDialog: MatDialog,
		public dialog: MatDialog,
		private storage: StorageService,
		private breakpoint: BreakpointObserver
	) {
		super();

		// Get retailer information
		this.myRetailer$ = this.storage.getItem(StorageKeys.myRetailer).pipe(
			takeUntil(this.unsubscribe),
			map((retailer) => (!!retailer ? retailer.name : this.findRetailer.label))
		);
	}

	get findRetailer() {
		return (!!this.content && this.content['find-retailer']) || null;
	}

	get cart() {
		return this.content?.cart || null;
	}

	get visitor() {
		return this.content?.visitor || null;
	}
	public isFindRetailerDialogOpen = false;

	public openFindRetailerDialog(): void {
		this.isFindRetailerDialogOpen = true;
		this.dialog
			.open(UtilityActionsdialogComponent, {
				data: {},
				panelClass: ['custom-modalbox', 'find-retailer-modal'],
				position: {
					top: '40px',
					right: '0px',
				},
			})
			.afterClosed()
			.subscribe((result) => {
				this.isFindRetailerDialogOpen = false;
			});
	}

	ngOnChanges(changes: SimpleChanges) {
		this.isMobile = this.breakpoint.isMatched(breakpoints.mobileMax);
	}
}
