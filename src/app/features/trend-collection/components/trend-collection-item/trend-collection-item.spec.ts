import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TrendCollectionItemComponent } from './trend-collection-item.component';
import { MockModule } from 'ng-mocks';
import { SharedModule } from '@shared/shared.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('TrendCollectionItemComponent', () => {
	let component: TrendCollectionItemComponent;
	let fixture: ComponentFixture<TrendCollectionItemComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [TrendCollectionItemComponent],
			schemas: [ NO_ERRORS_SCHEMA ],
			imports: [MockModule(SharedModule)],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(TrendCollectionItemComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
	it('should render the trend collection images ', waitForAsync(() => {
		fixture = TestBed.createComponent(TrendCollectionItemComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
		const compiled = fixture.debugElement.nativeElement;
		expect(compiled.querySelector('.trend-collection__image')).toBeTruthy();
	  }));
	  it('should render the trend collection link ', waitForAsync(() => {
		fixture = TestBed.createComponent(TrendCollectionItemComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
		const compiled = fixture.debugElement.nativeElement;
		expect(compiled.querySelector('.trend-collection__link')).toBeTruthy();
	  }));
});
