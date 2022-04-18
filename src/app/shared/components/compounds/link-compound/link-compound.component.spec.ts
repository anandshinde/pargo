import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
	ButtonTypes,
	ThemeTypes,
	ButtonAlignment,
} from '@app/shared/constants';
import { LinkCompoundComponent } from '@shared/components';

describe('LinkCompoundComponent', () => {
	let component: LinkCompoundComponent;
	let fixture: ComponentFixture<LinkCompoundComponent>;
	const contentMock = {
		button: ButtonTypes.primary,
		link: null,
		target: '_blank',
		text: 'Display Text',
		url: 'https://yahoo.es',
	};
	const presentationMock = {
		buttonType: ButtonTypes.primary,
		theme: ThemeTypes.dark,
		alignment: ButtonAlignment.left,
	};

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [LinkCompoundComponent],
			imports: [RouterTestingModule],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(LinkCompoundComponent);
		component = fixture.componentInstance;
		component.content = contentMock;
		component.presentation = presentationMock;

		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
