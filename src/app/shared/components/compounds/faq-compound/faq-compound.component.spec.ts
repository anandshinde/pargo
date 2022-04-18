import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
	FaqCompoundContentProps,
	FaqCompoundPresentationProps,
} from '@app/shared/interfaces';
import { FaqCompoundComponent } from './faq-compound.component';
import { MockComponents, MockModule } from 'ng-mocks';
import {
	MatExpansionPanel,
	MatExpansionPanelHeader,
} from '@angular/material/expansion';
import { SharedModule } from '@shared/shared.module';

describe('FaqCompoundComponent', () => {
	let component: FaqCompoundComponent;
	let fixture: ComponentFixture<FaqCompoundComponent>;
	const contentMock: FaqCompoundContentProps = {
		index: 0,
		hideCaret: false,
		title: {
			color: 'blue',
			content: {
				richText: '<p>What is Lorem Ipsum?</p>',
			},
			presentation: {
				type: 'faq',
			},
		},
		collapsed: [
			{
				content: [
					{
						richText: '<p>mock text</p>',
					},
				],
				presentation: {
					type: 'faq',
				},
			},
		],
	};
	const presentationMock: FaqCompoundPresentationProps = { type: 'accordion' };

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [
				FaqCompoundComponent,
				MockComponents(MatExpansionPanel, MatExpansionPanelHeader),
			],
			imports: [MockModule(SharedModule)],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(FaqCompoundComponent);
		component = fixture.componentInstance;
		component.content = contentMock;
		component.presentation = presentationMock;

		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
