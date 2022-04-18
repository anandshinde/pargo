import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselWrapperComponent } from './carousel-wrapper.component';
import { MockModule } from 'ng-mocks';
import { SwiperModule } from 'ngx-swiper-wrapper';

describe('CarouselWrapperComponent', () => {
	let component: CarouselWrapperComponent;
	let fixture: ComponentFixture<CarouselWrapperComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [CarouselWrapperComponent],
			imports: [MockModule(SwiperModule)],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(CarouselWrapperComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
