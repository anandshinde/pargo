import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutWrapperComponent } from '@shared/components';
import { SimpleChange } from '@angular/core';

describe('LayoutWrapperComponent', () => {
	let component: LayoutWrapperComponent;
	let fixture: ComponentFixture<LayoutWrapperComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [LayoutWrapperComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(LayoutWrapperComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
