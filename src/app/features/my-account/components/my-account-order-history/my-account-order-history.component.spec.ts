import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAccountOrderHistoryComponent } from './my-account-order-history.component';

describe('MyAccountFavoritiesComponent', () => {
	let component: MyAccountOrderHistoryComponent;
	let fixture: ComponentFixture<MyAccountOrderHistoryComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [MyAccountOrderHistoryComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(MyAccountOrderHistoryComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
