import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PdfCompoundComponent } from './pdf-compound.component';

describe('PdfCompoundComponent', () => {
	let component: PdfCompoundComponent;
	let fixture: ComponentFixture<PdfCompoundComponent>;
	const contentMock = {
		displayName: '',
		description: '',
		pdf: {
			$ref: '',
		},
		name: '',
		target: '',
		url: '',
	};

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [PdfCompoundComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(PdfCompoundComponent);
		component = fixture.componentInstance;
		component.content = contentMock;

		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
