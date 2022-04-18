import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RibbonCompoundComponent } from './ribbon-compound.component';

describe('RibbonCompoundComponent', () => {
	let component: RibbonCompoundComponent;
	let fixture: ComponentFixture<RibbonCompoundComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [RibbonCompoundComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(RibbonCompoundComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
