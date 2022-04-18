import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PleaseConfigureComponent } from './please-configure.component';

describe('PleaseConfigureComponent', () => {
	let component: PleaseConfigureComponent;
	let fixture: ComponentFixture<PleaseConfigureComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [PleaseConfigureComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(PleaseConfigureComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
