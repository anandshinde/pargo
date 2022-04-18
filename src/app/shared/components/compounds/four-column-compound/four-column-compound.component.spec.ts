import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FourColumnCompoundComponent } from './four-column-compound.component';

describe('FourColumnCompoundComponent', () => {
	let component: FourColumnCompoundComponent;
	let fixture: ComponentFixture<FourColumnCompoundComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [FourColumnCompoundComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(FourColumnCompoundComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
