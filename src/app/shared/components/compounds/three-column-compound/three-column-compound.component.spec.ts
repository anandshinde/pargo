import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeColumnCompoundComponent } from './three-column-compound.component';

describe('ThreeColumnCompoundComponent', () => {
	let component: ThreeColumnCompoundComponent;
	let fixture: ComponentFixture<ThreeColumnCompoundComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ThreeColumnCompoundComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ThreeColumnCompoundComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
