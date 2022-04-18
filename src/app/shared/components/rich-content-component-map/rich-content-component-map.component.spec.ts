import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RichContentComponentMapComponent } from './rich-content-component-map.component';
import { MockModule } from 'ng-mocks';
import { SharedModule } from '@shared/shared.module';

describe('RichContentComponentMapComponent', () => {
	let component: RichContentComponentMapComponent;
	let fixture: ComponentFixture<RichContentComponentMapComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [RichContentComponentMapComponent],
			imports: [MockModule(SharedModule)],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(RichContentComponentMapComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
