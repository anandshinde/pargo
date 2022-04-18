import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from '@app/shared/shared.module';
import { MockComponents, MockModule } from 'ng-mocks';
import { ExpansionMenuMobileComponent } from './expansion-menu-mobile.component';
import {
	MatExpansionPanel,
	MatExpansionPanelHeader,
} from '@angular/material/expansion';

describe('ExpansionMenuMobileComponent', () => {
	let component: ExpansionMenuMobileComponent;
	let fixture: ComponentFixture<ExpansionMenuMobileComponent>;
	const itemsMock = [
		{
			depth: 0,
			repositoryBased: false,
			properties: {
				'hst:externallink': 'https://google.com',
				'hst:repobased': false,
			},
			name: 'Example 002.1',
			childMenuItems: [],
			parameters: {},
			_links: {
				site: {
					href: 'https://google.com',
					type: 'external',
				},
			},
		},
	];

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [
				ExpansionMenuMobileComponent,
				MockComponents(MatExpansionPanel, MatExpansionPanelHeader),
			],
			imports: [MockModule(SharedModule)],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ExpansionMenuMobileComponent);
		component = fixture.componentInstance;
		component.items = itemsMock;

		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('Should #hasChildren show if an item has an Item', () => {
		const itemMock = itemsMock[0];

		expect(component.hasChildren(itemMock)).toBeFalsy();
	});

	it('Should return "name" attribute after #trackBy', () => {
		const mockObject = { name: 'mockName' };

		expect(component.trackBy(0, mockObject)).toBe('mockName');
	});
});
