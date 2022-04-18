import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { IconTextCompoundComponent } from './icon-text-compound.component';
import { MockComponents } from 'ng-mocks';
import { ImageCompoundComponent, RichTextComponent } from '@shared/components';

describe('IconTextCompoundComponent', () => {
	let component: IconTextCompoundComponent;
	let fixture: ComponentFixture<IconTextCompoundComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [
				IconTextCompoundComponent,
				MockComponents(RichTextComponent, ImageCompoundComponent),
			],
			imports: [RouterTestingModule],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(IconTextCompoundComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
