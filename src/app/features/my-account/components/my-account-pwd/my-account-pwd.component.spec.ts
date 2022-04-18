import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAccountPwdComponent } from './my-account-pwd.component';

describe('MyAccountPwdComponent', () => {
	let component: MyAccountPwdComponent;
	let fixture: ComponentFixture<MyAccountPwdComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [MyAccountPwdComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(MyAccountPwdComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
