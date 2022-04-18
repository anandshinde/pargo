import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { Router, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { UtilityActionsdialogComponent } from './utility-actionsdialog.component';

describe('UtilityActionsdialogComponent', () => {
	let component: UtilityActionsdialogComponent;
	let fixture: ComponentFixture<UtilityActionsdialogComponent>;
	const routerMock = {
		navigate: jasmine.createSpy('navigate')
	}
	const textContentMock:any = {
		instructions:'Find a Retailer',
		submit:'Search',
		placeholder:'enter zip'
	}
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [UtilityActionsdialogComponent],
			imports: [RouterTestingModule, RouterModule,MatDialogModule],
			providers: [{provide:Router, useValue:routerMock},{
				provide: MatDialogRef,
				useValue: [],
			},
			{
				provide: MAT_DIALOG_DATA,
				useValue: [],
			},],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(UtilityActionsdialogComponent);
		component = fixture.componentInstance;
		component.textContent = textContentMock;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
	it('Should display Find a Retailer', () => {
		const inputLabel:any = fixture.debugElement.query(
			By.css('#inputLabel')
		);
		fixture.detectChanges();
		expect(inputLabel.nativeNode.innerText).toEqual('Find a Retailer');
	});
	it('Should render text input', () => {
		const input:any = fixture.debugElement.query(
			By.css('#input')
		);
		fixture.detectChanges();
		expect(input.nativeNode.localName).toEqual('mflooring-input-text');
	});
	it('Should render link compound', () => {
		const input:any = fixture.debugElement.query(
			By.css('#linkCompound')
		);
		fixture.detectChanges();
		expect(input.nativeNode.localName).toEqual('mflooring-link-compound');
	});
});
