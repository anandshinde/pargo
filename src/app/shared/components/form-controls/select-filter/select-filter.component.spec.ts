import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatMenuModule } from '@angular/material/menu';
import { SelectFilterComponent } from './select-filter.component';

describe('SelectFilterComponent', () => {
	let component: SelectFilterComponent;
	let fixture: ComponentFixture<SelectFilterComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [SelectFilterComponent],
			imports: [MatMenuModule],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(SelectFilterComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('Should #openSelect changes "isSelectOpened" value to "true"', () => {
		component.openSelect();

		expect(component.isSelectOpened).toBeTruthy();
	});

	it('Should #closeSelect changes "isSelectOpened" value to "false"', () => {
		component.closeSelect();

		expect(component.isSelectOpened).toBeFalsy();
	});
});
