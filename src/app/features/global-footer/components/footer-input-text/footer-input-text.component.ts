import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { StorageService } from '@app/core/services';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageKeys } from '@app/shared/constants';

@Component({
	selector: 'mflooring-footer-input-text',
	templateUrl: './footer-input-text.component.html',
	styleUrls: ['./footer-input-text.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterInputTextComponent {
	@Input() control: AbstractControl;
	@Input() label: string;
	@Input() placeholder: string;
	@Input() id: string;
	@Input() footerData: any;
	public zipCode: number;
	constructor(private router: Router, private storage: StorageService) {}

	validateInput(event) {
		var ASCIICode = event.which ? event.which : event.keyCode;
		if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57)) return false;
		return true;
	}

	findRetailer() {
		if (!this.zipCode) {
			return;
		}
		this.router
			.navigate(['/shop/find-a-retailer'], {
				queryParams: { zip: this.zipCode },
			})
			.then(() => {
				this.storage.setItem(StorageKeys.selectedZip, this.zipCode);
			});
	}
}
