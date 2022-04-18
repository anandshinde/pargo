import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RadioButtonComponent } from './radio-button.component';
import {
	AbstractControl,
	FormControl,
	ReactiveFormsModule,
} from '@angular/forms';
import { MockComponents, MockModule } from 'ng-mocks';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';

const mockFormInput: AbstractControl = new FormControl('');

const mockContent = [
	{
		label: 'radio',
		value: '',
	},
];

describe('RadioButtonComponent', () => {
	let component: RadioButtonComponent;
	let fixture: ComponentFixture<RadioButtonComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [
				RadioButtonComponent,
				MockComponents(MatRadioButton, MatRadioGroup),
			],
			imports: [ReactiveFormsModule],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(RadioButtonComponent);
		component = fixture.componentInstance;

		component.control = mockFormInput;
		component.content = mockContent;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('Should #trackBy return "value" parameter', () => {
		const elMock = { value: 2 };
		const indexMock = 1;

		expect(component.trackBy(indexMock, elMock)).toBe(2);
	});
});
