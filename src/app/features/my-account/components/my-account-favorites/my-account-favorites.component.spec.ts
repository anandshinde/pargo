import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAccountFavoritesComponent } from './my-account-favorites.component';

describe('MyAccountFavoritiesComponent', () => {
	let component: MyAccountFavoritesComponent;
	let fixture: ComponentFixture<MyAccountFavoritesComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [MyAccountFavoritesComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(MyAccountFavoritesComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
