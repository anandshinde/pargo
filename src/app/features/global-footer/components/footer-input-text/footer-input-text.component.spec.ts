import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { FooterInputTextComponent } from './footer-input-text.component';

describe('FooterInputTextComponent', () => {
	let component: FooterInputTextComponent;
	let fixture: ComponentFixture<FooterInputTextComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [FooterInputTextComponent],
			imports: [RouterTestingModule],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(FooterInputTextComponent);
		component = fixture.componentInstance;
		component.label = 'FIND A RETAILER';
		component.id = 'zipcode';
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
	it('should display zip code name as FIND A RETAILER', () => {
		const zipcodeLabel: any = fixture.debugElement.query(
			By.css('#zipcode_label')
		);
		fixture.detectChanges();
		expect(zipcodeLabel.nativeNode.innerText).toEqual('FIND A RETAILER');
	});
	it('should render zip code find input', () => {
		const zipcode: any = fixture.debugElement.query(By.css('#zipcode'));
		fixture.detectChanges();
		expect(zipcode.nativeNode.localName).toEqual('input');
	});
	it('should render Search button with Search label', () => {
		const zipcodeButton: any = fixture.debugElement.query(
			By.css('#submitButton')
		);
		fixture.detectChanges();
		expect(zipcodeButton.nativeNode.localName).toEqual('button');
		expect(zipcodeButton.nativeNode.innerText).toEqual('Search');
	});
});
