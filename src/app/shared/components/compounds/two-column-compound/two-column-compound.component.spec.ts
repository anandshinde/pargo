import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ThemeTypes } from '@app/shared/constants';
import { TwoColumnCompoundComponent } from './two-column-compound.component';

describe('TwoColumnCompoundComponent', () => {
	let component: TwoColumnCompoundComponent;
	let fixture: ComponentFixture<TwoColumnCompoundComponent>;
	const presentationMock = {
		theme: ThemeTypes.light,
		ratio: '5050',
		border: false,
	};

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [TwoColumnCompoundComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(TwoColumnCompoundComponent);
		component = fixture.componentInstance;
		component.presentation = presentationMock;

		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
