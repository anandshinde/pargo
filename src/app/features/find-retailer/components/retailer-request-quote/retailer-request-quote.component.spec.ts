import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailerRequestQuoteComponent } from './retailer-request-quote.component';
import { RouterTestingModule } from '@angular/router/testing';
import { BloomreachBaseClass } from '@app/core/bloomreach';
import { MatDialogModule } from '@angular/material/dialog';
import { NO_ERRORS_SCHEMA } from '@angular/compiler/src/core';
describe('RetailerRequestQuoteComponent', () => {
  let component: RetailerRequestQuoteComponent;
  let fixture: ComponentFixture<RetailerRequestQuoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetailerRequestQuoteComponent, BloomreachBaseClass ],
      imports: [RouterTestingModule, MatDialogModule, NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RetailerRequestQuoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('form invalid when empty', () => {
		component.firstName.setValue('');
		component.lastName.setValue('');
		component.mailingList.setValue('');
		component.phoneNumber.setValue('');
		component.email.setValue('');
    component.purchaseMonth.setValue('');
		expect(component.eventservice).toBeFalsy();
	  });
    it('name field validity', () => {
      const name = component.firstName;
      expect(name.valid).toBeFalsy();
  
      name.setValue('');
      expect(name.hasError('required')).toBeTruthy();
  
    });
    it('lastName field validity', () => {
      const lastName = component.lastName;
      expect(lastName.valid).toBeFalsy();
  
      lastName.setValue('');
      expect(lastName.hasError('required')).toBeTruthy();
  
    });
    it('email field validity', () => {
      const email = component.email;
      expect(email.valid).toBeFalsy();
  
      email.setValue('');
      expect(email.hasError('required')).toBeTruthy();
  
    });
    it('form should be valid', () => {
      component.firstName.setValue('sasd');
      component.lastName.setValue('sadasd@asd.com');
      component.email.setValue('sadasd@asd.com');
      component.phoneNumber.setValue('132456789');;
      expect(component.eventservice).toBeTruthy();
    });
});
