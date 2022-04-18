import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SqfootCompoundComponent } from './sqfoot-compound.component';
import { FormsModule } from '@angular/forms';

describe('SqfootCompoundComponent', () => {
	let component: SqfootCompoundComponent;
	let fixture: ComponentFixture<SqfootCompoundComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [SqfootCompoundComponent],
			imports: [FormsModule],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(SqfootCompoundComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
