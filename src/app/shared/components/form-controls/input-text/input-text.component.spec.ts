import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputTextComponent } from './input-text.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

const mockFormInput = new FormControl('');

const mockContent = {
	formControl: mockFormInput,
	placeholder: 'placeholder',
	icon: null,
};

describe('InputTextComponent', () => {
	let component: InputTextComponent;
	let fixture: ComponentFixture<InputTextComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [InputTextComponent],
			imports: [ReactiveFormsModule],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(InputTextComponent);
		component = fixture.componentInstance;

		component.content = mockContent;

		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
