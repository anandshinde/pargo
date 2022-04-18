import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TileItemWFindRetailerComponent } from './tile-item-w-findretailer.component';

describe('TileItemWFindRetailerComponent', () => {
	let component: TileItemWFindRetailerComponent;
	let fixture: ComponentFixture<TileItemWFindRetailerComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [TileItemWFindRetailerComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(TileItemWFindRetailerComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
