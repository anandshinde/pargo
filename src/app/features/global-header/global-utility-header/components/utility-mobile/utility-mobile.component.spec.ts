import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '@app/shared/shared.module';
import { MenuItemComponent } from '@shared/components';
import { MockComponents, MockModule } from 'ng-mocks';
import { UtilityMobileComponent } from './utility-mobile.component';

describe('UtilityMobileComponent', () => {
	let component: UtilityMobileComponent;
	let fixture: ComponentFixture<UtilityMobileComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [UtilityMobileComponent, MockComponents(MenuItemComponent)],
			imports: [MockModule(SharedModule), RouterTestingModule],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(UtilityMobileComponent);
		component = fixture.componentInstance;
		spyOn(component.closeMenu, 'emit');
		spyOn(component.openMenu, 'emit');

		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('Should emit "closeMenu" after #onCloseMenu', () => {
		component.onCloseMenu();

		expect(component.closeMenu.emit).toHaveBeenCalledWith(null);
	});

	it('Should emit "openMenu" after #onOpenMenu', () => {
		const indexMock = 1;
		component.onOpenMenu(indexMock);

		expect(component.openMenu.emit).toHaveBeenCalledWith(indexMock);
	});
});
