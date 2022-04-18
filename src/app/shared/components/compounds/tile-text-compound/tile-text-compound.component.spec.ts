import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TileTextCompoundComponent } from './tile-text-compound.component';

describe('TileTextCompoundComponent', () => {
	let component: TileTextCompoundComponent;
	let fixture: ComponentFixture<TileTextCompoundComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [TileTextCompoundComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(TileTextCompoundComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
