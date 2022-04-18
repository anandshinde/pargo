import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainExpansionPanelDesktopComponent } from './main-expansion-panel-desktop.component';
import { MockComponents, MockModule } from 'ng-mocks';
import {
	MatExpansionPanel,
	MatExpansionPanelHeader,
} from '@angular/material/expansion';
import { SharedModule } from '@shared/shared.module';

describe('MainExpansionPanelComponent', () => {
	let component: MainExpansionPanelDesktopComponent;
	let fixture: ComponentFixture<MainExpansionPanelDesktopComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [
				MainExpansionPanelDesktopComponent,
				MockComponents(MatExpansionPanel, MatExpansionPanelHeader),
			],
			imports: [MockModule(SharedModule)],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(MainExpansionPanelDesktopComponent);
		component = fixture.componentInstance;
		spyOn(component.closeMenu, 'emit');

		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('Should emit "closeMenu" after #onCloseMenu', () => {
		component.onCloseMenu();

		expect(component.closeMenu.emit).toHaveBeenCalledWith(jasmine.anything());
	});

	it('Should return "name" attribute after #trackBy', () => {
		const mockObject = { name: 'mockName' };

		expect(component.trackBy(0, mockObject)).toBe('mockName');
	});
});
