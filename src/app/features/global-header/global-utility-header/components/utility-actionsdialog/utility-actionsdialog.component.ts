// import { Component, OnInit } from '@angular/core';

import {
	Component,
	OnInit,
	ViewChild,
	ChangeDetectionStrategy,
} from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';

import { MatDialogRef } from '@angular/material/dialog';

import { map, take } from 'rxjs/operators';

import {
	InputTextContentProps,
	InputTextPresentationProps,
} from '@app/shared/interfaces';
import {
	ThemeTypes,
	FindARetailerDialog,
	StorageKeys,
} from '@app/shared/constants';
import { StorageService } from '@core/services/storage.service';

import {
	getCurrentPosition,
	getZipCodeFromPosition,
} from '@shared/utilities/location.utilities';
import { InputTextComponent } from '@shared/components/form-controls/input-text/input-text.component';
import { Eventservice } from '@app/core/services/events.service';
import { ScriptService } from '@core/services';
import { Observable } from 'rxjs';

@Component({
	selector: 'mflooring-utility-actionsdialog',
	templateUrl: './utility-actionsdialog.component.html',
	styleUrls: ['./utility-actionsdialog.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UtilityActionsdialogComponent {
	@ViewChild('retailerSupport') retailerInput: InputTextComponent;

	private mapsIsLoaded$: Observable<any>;
	constructor(
		private router: Router,
		private storage: StorageService,
		public dialogRef: MatDialogRef<UtilityActionsdialogComponent>,
		public eventservice: Eventservice,
		private scriptService: ScriptService
	) {
		this.form = new FormGroup({
			search: new FormControl('', []),
		});

		this.isLocating = false;

		this.storage
			.getItem(StorageKeys.selectedZip)
			.pipe(take(1))
			.subscribe((zip: number) => {
				this.form.patchValue({
					search: zip || '',
				});
			});

		this.mapsIsLoaded$ = this.scriptService
			.loadScript(
				'google',
				'https://maps.googleapis.com/maps/api/js?key=AIzaSyCpvSspDOkr2F3ekbb5yC_w4baAxcLofmQ'
			)
			.pipe(
				take(1),
				map((response) => {
					if (response instanceof Error || !response) {
						return false;
					}
					return response;
				})
			);
	}

	public form: FormGroup;
	public isLocating: Boolean;
	public textContent = FindARetailerDialog;

	get search(): AbstractControl {
		return this.form.get('search');
	}

	get searchContent(): InputTextContentProps {
		return {
			icon: 'close',
			maxlength: '5',
			placeholder: this.textContent.placeholder,
		};
	}

	get searchPresentation(): InputTextPresentationProps {
		return {
			theme: ThemeTypes.light,
			hasIcon: false,
			iconFirst: true,
		};
	}

	public handleInputKeyUp({ key }) {
		if (key === 'Enter') {
			this.closeDialog();
		}
	}

	public validateZipCode(e: KeyboardEvent) {
		return /^[0-9]$/i.test(e.key);
	}

	closeDialog() {
		if (!this.form.value.search) {
			return;
		}
		this.eventservice.searchPerformed({
			searchTerm: this.form.value.search,
			searchTermCorrected: this.form.value.search,
			searchType: 'Retailers',
			fakeProductCollection: [
				{
					fakeProductId: `${this.form.value.search}`,
				},
			],
		});
		this.router
			.navigate(['/shop/find-a-retailer'], {
				queryParams: { zip: this.form.value.search },
			})
			.then(() => {
				this.storage.setItem(StorageKeys.selectedZip, this.form.value.search);
				this.dialogRef.close(this.form.value.search);
			});
	}
	reset() {
		this.form.reset();
	}
	clearRetailerSearchInput() {
		this.reset();
		this.retailerInput.focusInput();
	}
	setCurrentLocation() {
		this.isLocating = true;

		this.mapsIsLoaded$.pipe(take(1)).subscribe((reponse) => {
			if (!!reponse) {
				getCurrentPosition({
					enableHighAccuracy: true,
					timeout: 10000,
					maximumAge: 30000,
				})
					.then(getZipCodeFromPosition)
					.then((zip) => {
						this.isLocating = false;
						this.form.setValue({
							search: zip,
						});
						this.closeDialog();
					})
					.catch(() => {
						this.isLocating = false;
					});
			}
		});
	}
}
