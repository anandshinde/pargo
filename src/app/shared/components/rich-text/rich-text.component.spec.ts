import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RichTextComponent } from '@shared/components';
import { MockPipe } from 'ng-mocks';
import { SafePipe } from '@shared/pipes';

describe('RichTextComponent', () => {
	let component: RichTextComponent;
	let fixture: ComponentFixture<RichTextComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [RichTextComponent, MockPipe(SafePipe)],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(RichTextComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('Should change "isContentExpanded" value after #expandContent', () => {
		expect(component.isContentExpanded).toBeUndefined();

		component.expandContent(null);

		expect(component.isContentExpanded).toBeFalsy();
	});
});
