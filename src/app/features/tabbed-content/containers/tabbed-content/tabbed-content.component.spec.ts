import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BloomreachComponent } from '@app/shared/base-classes';
import { SharedModule } from '@app/shared/shared.module';
import { MockBuilder, MockModule } from 'ng-mocks';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { TabbedContentComponent } from './tabbed-content.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TabbedContentMapper, SearchFilter } from './tabbed-content.mapper';
const contentMock = {
	top: {
		content: null,
		presentation: {
			heightLimit: '110px',
			type: 'faq',
		},
	},
	tabsContent: [
		{
			index: 0,
			label: 'Tab # 1',
			iconContent: {
				desktop: {
					altText: '',
					link: 'https://mohawk.scene7.com/is/image/MohawkResidential/CleanCare%20-%20Assets%20(2)',
					title: 'Title Sample',
					original: {
						url: 'https://mohawk.scene7.com/is/image/MohawkResidential/CleanCare%20-%20Assets%20(2)',
					},
				},
			},
			faq: [
				{
					content: {
						hideCaret: false,
						title: {
							color: 'dark',
							content: {
								richText: '<p>Lorem Ipsum</p>',
							},
							panel: 'Lorem Ipsum',
							alignment: null,
							presentation: {
								component: 'accordion-title',
							},
						},
						collapsed: [
							{
								type: 'hippostd:html',
								value: {
									content: {
										richText: '<p>This is the answer to the first content</p>',
									},
									presentation: {
										theme: 'light',
									},
								},
							},
						],
					},
					presentation: {
						type: 'accordion',
					},
				},
				{
					content: {
						hideCaret: false,
						title: {
							color: 'dark',
							content: {
								richText: '<p>Demo DEmo</p>',
							},
							panel: 'Demo DEmo',
							alignment: null,
							presentation: {
								component: 'accordion-title',
							},
						},
						collapsed: [
							{
								type: 'hippostd:html',
								value: {
									content: {
										richText: '<p>Check this reason two of the second tab</p>',
									},
									presentation: {
										theme: 'light',
									},
								},
							},
						],
					},
					presentation: {
						type: 'accordion',
					},
				},
				{
					content: {
						hideCaret: false,
						title: {
							color: 'dark',
							content: {
								richText: '<p>THis is one questionsss</p>',
							},
							panel: 'THis is one questionsss',
							alignment: null,
							presentation: {
								component: 'accordion-title',
							},
						},
						collapsed: [
							{
								type: 'hippostd:html',
								value: {
									content: {
										richText: '<p>This is the answererere</p>',
									},
									presentation: {
										theme: 'light',
									},
								},
							},
						],
					},
					presentation: {
						type: 'accordion',
					},
				},
			],
		},
		{
			index: 1,
			label: 'Tab 2',
			iconContent: {
				desktop: {
					altText: '',
					link: 'https://mohawk.scene7.com/is/image/MohawkResidential/CleanCare%20-%20Assets%20(2)',
					title: '',
					original: {
						url: 'https://mohawk.scene7.com/is/image/MohawkResidential/CleanCare%20-%20Assets%20(2)',
					},
				},
			},
			faq: [
				{
					content: {
						hideCaret: false,
						title: {
							color: 'dark',
							content: {
								richText: '<p>This is Question 2</p>',
							},
							panel: 'This is Question 2',
							alignment: null,
							presentation: {
								type: 'accordion',
							},
						},
						collapsed: [
							{
								type: 'hippostd:html',
								value: {
									content: {
										richText: '<p>This is the answer</p>',
									},
									presentation: {
										theme: 'light',
									},
								},
							},
						],
					},
					presentation: {
						type: 'accordion',
					},
				},
			],
		},
		{
			index: 2,
			label: 'Tab #3',
			iconContent: {
				desktop: {
					altText: '',
					link: 'https://mohawk.scene7.com/is/image/MohawkResidential/CleanCare%20-%20Assets%20(2)',
					title: 'asdasda',
					original: {
						url: 'https://mohawk.scene7.com/is/image/MohawkResidential/CleanCare%20-%20Assets%20(2)',
					},
				},
			},
			faq: [
				{
					content: {
						hideCaret: false,
						title: {
							color: 'dark',
							content: {
								richText: '<p>This is the third tab questions</p>',
							},
							panel: 'This is the third tab questions',
							alignment: null,
							presentation: {
								type: 'accordion',
							},
						},
						collapsed: [
							{
								type: 'hippostd:html',
								value: {
									content: {
										richText: '<p>This is a third answerere</p>',
									},
									presentation: {
										theme: 'light',
									},
								},
							},
						],
					},
					presentation: {
						type: 'accordion',
					},
				},
			],
		},
		{
			index: 3,
			label: 'Tab 4',
			iconContent: {
				desktop: {
					altText: '',
					link: 'https://mohawk.scene7.com/is/image/MohawkResidential/CleanCare%20-%20Assets%20(2)',
					title: 'asdasda',
					original: {
						url: 'https://mohawk.scene7.com/is/image/MohawkResidential/CleanCare%20-%20Assets%20(2)',
					},
				},
			},
			faq: [
				{
					content: {
						hideCaret: false,
						title: {
							color: 'dark',
							content: {
								richText: '<p>this is the 4th Tabs</p>',
							},
							panel: 'this is the 4th Tabs',
							alignment: null,
							presentation: {
								type: 'accordion',
							},
						},
						collapsed: [
							{
								type: 'hippostd:html',
								value: {
									content: {
										richText: '<p>This si the fourth&#160;</p>',
									},
									presentation: {
										theme: 'light',
									},
								},
							},
						],
					},
					presentation: {
						type: 'accordion',
					},
				},
			],
		},
	],
};
const rawData = {
	id: 'c26c21f7-601c-480e-ab6b-ce5de4f890c8',
	_meta: {},
	_links: {
		site: {
			href: '/site/mf',
			type: 'internal',
		},
	},
	name: 'tabbedcontent-1',
	displayName: 'TabbedContent-1',
	tabContent: [
		{
			name: 'brxm:tabContent',
			displayName: 'brxm:tabContent',
			tabDetailContent: {
				name: 'brxm:tabDetailContent',
				displayName: 'brxm:tabDetailContent',
				faq: [
					{
						name: 'brxm:faq',
						displayName: 'brxm:faq',
						color: 'dark',
						answerCollapsedContent: [
							{
								contentType: 'hippostd:html',
								value: '<p>This is the answer to the first content</p>',
							},
						],
						alignment: null,
						questionIcon: null,
						faqStyle: null,
						caret: true,
						iconContent: null,
						content: {
							contentType: 'hippostd:html',
							value: '<p>Lorem Ipsum</p>',
						},
						contentType: 'brxm:FAQCompound',
					},
					{
						name: 'brxm:faq',
						displayName: 'brxm:faq',
						color: 'dark',
						answerCollapsedContent: [
							{
								contentType: 'hippostd:html',
								value: '<p>Check this reason two of the second tab</p>',
							},
						],
						alignment: null,
						questionIcon: null,
						faqStyle: null,
						caret: true,
						iconContent: null,
						content: {
							contentType: 'hippostd:html',
							value: '<p>Demo DEmo</p>',
						},
						contentType: 'brxm:FAQCompound',
					},
					{
						name: 'brxm:faq',
						displayName: 'brxm:faq',
						color: null,
						answerCollapsedContent: [
							{
								contentType: 'hippostd:html',
								value: '<p>This is the answererere</p>',
							},
						],
						alignment: null,
						questionIcon: {
							name: 'brxm:questionIcon',
							displayName: 'brxm:questionIcon',
							imageDAM: '',
							altText: '',
							imageBRE: null,
							title: 'Third Questions',
							link: '',
							contentType: 'brxm:ImageCompound',
						},
						faqStyle: null,
						caret: true,
						iconContent: null,
						content: {
							contentType: 'hippostd:html',
							value: '<p>THis is one questionsss</p>',
						},
						contentType: 'brxm:FAQCompound',
					},
				],
				contentType: 'brxm:TabDetailContentCompound',
			},
			tabLabel: 'Tab # 1',
			tabStyle: 'accordion',
			tabIcon: {
				name: 'brxm:tabIcon',
				displayName: 'brxm:tabIcon',
				imageDAM:
					'https://mohawk.scene7.com/is/image/MohawkResidential/CleanCare%20-%20Assets%20(2)',
				altText: '',
				imageBRE: null,
				title: 'Title Sample',
				link: 'https://mohawk.scene7.com/is/image/MohawkResidential/CleanCare%20-%20Assets%20(2)',
				contentType: 'brxm:ImageCompound',
			},
			contentType: 'brxm:TabCompound',
		},
		{
			name: 'brxm:tabContent',
			displayName: 'brxm:tabContent',
			tabDetailContent: {
				name: 'brxm:tabDetailContent',
				displayName: 'brxm:tabDetailContent',
				faq: [
					{
						name: 'brxm:faq',
						displayName: 'brxm:faq',
						color: null,
						answerCollapsedContent: [
							{
								contentType: 'hippostd:html',
								value: '<p>This is the answer</p>',
							},
						],
						alignment: null,
						questionIcon: null,
						faqStyle: null,
						caret: true,
						iconContent: null,
						content: {
							contentType: 'hippostd:html',
							value: '<p>This is Question 2</p>',
						},
						contentType: 'brxm:FAQCompound',
					},
				],
				contentType: 'brxm:TabDetailContentCompound',
			},
			tabLabel: 'Tab 2',
			tabStyle: 'accordion',
			tabIcon: {
				name: 'brxm:tabIcon',
				displayName: 'brxm:tabIcon',
				imageDAM:
					'https://mohawk.scene7.com/is/image/MohawkResidential/CleanCare%20-%20Assets%20(2)',
				altText: '',
				imageBRE: null,
				title: '',
				link: 'https://mohawk.scene7.com/is/image/MohawkResidential/CleanCare%20-%20Assets%20(2)',
				contentType: 'brxm:ImageCompound',
			},
			contentType: 'brxm:TabCompound',
		},
		{
			name: 'brxm:tabContent',
			displayName: 'brxm:tabContent',
			tabDetailContent: {
				name: 'brxm:tabDetailContent',
				displayName: 'brxm:tabDetailContent',
				faq: [
					{
						name: 'brxm:faq',
						displayName: 'brxm:faq',
						color: null,
						answerCollapsedContent: [
							{
								contentType: 'hippostd:html',
								value: '<p>This is a third answerere</p>',
							},
						],
						alignment: null,
						questionIcon: null,
						faqStyle: null,
						caret: true,
						iconContent: null,
						content: {
							contentType: 'hippostd:html',
							value: '<p>This is the third tab questions</p>',
						},
						contentType: 'brxm:FAQCompound',
					},
				],
				contentType: 'brxm:TabDetailContentCompound',
			},
			tabLabel: 'Tab #3',
			tabStyle: 'accordion',
			tabIcon: {
				name: 'brxm:tabIcon',
				displayName: 'brxm:tabIcon',
				imageDAM:
					'https://mohawk.scene7.com/is/image/MohawkResidential/CleanCare%20-%20Assets%20(2)',
				altText: '',
				imageBRE: null,
				title: 'asdasda',
				link: 'https://mohawk.scene7.com/is/image/MohawkResidential/CleanCare%20-%20Assets%20(2)',
				contentType: 'brxm:ImageCompound',
			},
			contentType: 'brxm:TabCompound',
		},
		{
			name: 'brxm:tabContent',
			displayName: 'brxm:tabContent',
			tabDetailContent: {
				name: 'brxm:tabDetailContent',
				displayName: 'brxm:tabDetailContent',
				faq: [
					{
						name: 'brxm:faq',
						displayName: 'brxm:faq',
						color: null,
						answerCollapsedContent: [
							{
								contentType: 'hippostd:html',
								value: '<p>This si the fourth&#160;</p>',
							},
						],
						alignment: null,
						questionIcon: null,
						faqStyle: null,
						caret: true,
						iconContent: null,
						content: {
							contentType: 'hippostd:html',
							value: '<p>this is the 4th Tabs</p>',
						},
						contentType: 'brxm:FAQCompound',
					},
				],
				contentType: 'brxm:TabDetailContentCompound',
			},
			tabLabel: 'Tab 4',
			tabStyle: 'accordion',
			tabIcon: {
				name: 'brxm:tabIcon',
				displayName: 'brxm:tabIcon',
				imageDAM:
					'https://mohawk.scene7.com/is/image/MohawkResidential/CleanCare%20-%20Assets%20(2)',
				altText: '',
				imageBRE: null,
				title: 'asdasda',
				link: 'https://mohawk.scene7.com/is/image/MohawkResidential/CleanCare%20-%20Assets%20(2)',
				contentType: 'brxm:ImageCompound',
			},
			contentType: 'brxm:TabCompound',
		},
	],
	groupContent: {
		contentType: 'hippostd:html',
		value: '',
	},
	localeString: 'en',
	contentType: 'brxm:TabbedContent',
};
const componentMock: any = {
	getModels: () => ({
		document: {
			$ref: '/content/u92b6b23f06ff406e931c60e1554afead',
		},
	}),
	getParameters: (): any => ({
		'include-content-search': true,
		document: 'tabbed-contents/clean--care-faqs',
	}),
	getName: () => 'single-column',
};
const fakeActivatedRoute: any = {
	queryParams: of({
		title: 'Home page',
		crumbs: contentMock,
	}),
	fragment: of({
		title: 'Home page',
		crumbs: contentMock,
	}),
};

const topPresenation = {
	heightLimit: '110px',
	type: 'faq',
};

describe('TabbedContentComponent', () => {
	let component: TabbedContentComponent;
	let fixture: ComponentFixture<TabbedContentComponent>;
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [TabbedContentComponent],
			imports: [
				MockModule(SharedModule),
				RouterTestingModule,
				ReactiveFormsModule,
				RouterModule,
			],
			providers: [{ provide: ActivatedRoute, useValue: fakeActivatedRoute }],
			schemas: [NO_ERRORS_SCHEMA],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(TabbedContentComponent);
		component = fixture.componentInstance;
		component.component = componentMock;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it(
		'should format the data for content correctly for the Tabs',
		waitForAsync(() => {
			const formattedData = TabbedContentMapper(rawData, null);
			const index = Math.floor(
				Math.random() * formattedData.tabsContent.length
			);
			const valuesOfMappedData = Object.keys(formattedData.tabsContent[index]);
			const valuesOfMockedData = Object.keys(contentMock.tabsContent[index]);

			expect(
				JSON.stringify(valuesOfMappedData) ===
					JSON.stringify(valuesOfMockedData)
			).toBeTruthy();
		})
	);

	it(
		'should return the top presentation Keys',
		waitForAsync(() => {
			const valuesOfMappedData = Object.keys(contentMock?.top?.presentation);
			const valuesOfMockedData = Object.keys(topPresenation);
			expect(
				JSON.stringify(valuesOfMappedData) ===
					JSON.stringify(valuesOfMockedData)
			).toBeTruthy();
		})
	);

	it(
		'should return the top presentation values',
		waitForAsync(() => {
			const valuesOfMappedData = Object.values(contentMock?.top?.presentation);
			const valuesOfMockedData = Object.values(topPresenation);
			expect(
				JSON.stringify(valuesOfMappedData) ===
					JSON.stringify(valuesOfMockedData)
			).toBeTruthy();
		})
	);
	it(
		'Should make sure',
		waitForAsync(() => {
			expect(component.hasSearchBar === true);
		})
	);
});
