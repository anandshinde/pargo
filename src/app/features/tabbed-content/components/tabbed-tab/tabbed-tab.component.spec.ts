import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabbedTabComponent } from './tabbed-tab.component';
import { MockComponents, MockModule } from 'ng-mocks';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { FaqCompoundComponent } from '@shared/components/compounds';
import { SimpleComponent } from '@app/shared/base-classes';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('TabbedTabComponent', () => {
	let component: TabbedTabComponent;
	let fixture: ComponentFixture<TabbedTabComponent>;
	let mockData:any = [
		{
			"index": 0,
			"label": "Tab # 1",
			"iconContent": {
				"desktop": {
					"altText": "",
					"link": "https://mohawk.scene7.com/is/image/MohawkResidential/CleanCare%20-%20Assets%20(2)",
					"title": "Title Sample",
					"original": {
						"url": "https://mohawk.scene7.com/is/image/MohawkResidential/CleanCare%20-%20Assets%20(2)"
					}
				}
			},
			"faq": [
				{
					"content": {
						"hideCaret": false,
						"title": {
							"color": "dark",
							"content": {
								"richText": "<p>Lorem Ipsum</p>"
							},
							"panel": "Lorem Ipsum",
							"alignment": null,
							"presentation": {
								"component": "accordion-title"
							}
						},
						"collapsed": [
							{
								"type": "hippostd:html",
								"value": {
									"content": {
										"richText": "<p>This is the answer to the first content</p>"
									},
									"presentation": {
										"theme": "light"
									}
								}
							}
						]
					},
					"presentation": {
						"type": "accordion"
					}
				},
				{
					"content": {
						"hideCaret": false,
						"title": {
							"color": "dark",
							"content": {
								"richText": "<p>Demo DEmo</p>"
							},
							"panel": "Demo DEmo",
							"alignment": null,
							"presentation": {
								"component": "accordion-title"
							}
						},
						"collapsed": [
							{
								"type": "hippostd:html",
								"value": {
									"content": {
										"richText": "<p>Check this reason two of the second tab</p>"
									},
									"presentation": {
										"theme": "light"
									}
								}
							}
						]
					},
					"presentation": {
						"type": "accordion"
					}
				},
				{
					"content": {
						"hideCaret": false,
						"title": {
							"color": "dark",
							"content": {
								"richText": "<p>THis is one questionsss</p>"
							},
							"panel": "THis is one questionsss",
							"alignment": null,
							"presentation": {
								"component": "accordion-title"
							}
						},
						"collapsed": [
							{
								"type": "hippostd:html",
								"value": {
									"content": {
										"richText": "<p>This is the answererere</p>"
									},
									"presentation": {
										"theme": "light"
									}
								}
							}
						]
					},
					"presentation": {
						"type": "accordion"
					}
				}
			]
		},
		{
			"index": 1,
			"label": "Tab 2",
			"iconContent": {
				"desktop": {
					"altText": "",
					"link": "https://mohawk.scene7.com/is/image/MohawkResidential/CleanCare%20-%20Assets%20(2)",
					"title": "",
					"original": {
						"url": "https://mohawk.scene7.com/is/image/MohawkResidential/CleanCare%20-%20Assets%20(2)"
					}
				}
			},
			"faq": [
				{
					"content": {
						"hideCaret": false,
						"title": {
							"color": "dark",
							"content": {
								"richText": "<p>This is Question 2</p>"
							},
							"panel": "This is Question 2",
							"alignment": null,
							"presentation": {
								"type": "accordion"
							}
						},
						"collapsed": [
							{
								"type": "hippostd:html",
								"value": {
									"content": {
										"richText": "<p>This is the answer</p>"
									},
									"presentation": {
										"theme": "light"
									}
								}
							}
						]
					},
					"presentation": {
						"type": "accordion"
					}
				}
			]
		},
		{
			"index": 2,
			"label": "Tab #3",
			"iconContent": {
				"desktop": {
					"altText": "",
					"link": "https://mohawk.scene7.com/is/image/MohawkResidential/CleanCare%20-%20Assets%20(2)",
					"title": "asdasda",
					"original": {
						"url": "https://mohawk.scene7.com/is/image/MohawkResidential/CleanCare%20-%20Assets%20(2)"
					}
				}
			},
			"faq": [
				{
					"content": {
						"hideCaret": false,
						"title": {
							"color": "dark",
							"content": {
								"richText": "<p>This is the third tab questions</p>"
							},
							"panel": "This is the third tab questions",
							"alignment": null,
							"presentation": {
								"type": "accordion"
							}
						},
						"collapsed": [
							{
								"type": "hippostd:html",
								"value": {
									"content": {
										"richText": "<p>This is a third answerere</p>"
									},
									"presentation": {
										"theme": "light"
									}
								}
							}
						]
					},
					"presentation": {
						"type": "accordion"
					}
				}
			]
		},
		{
			"index": 3,
			"label": "Tab 4",
			"iconContent": {
				"desktop": {
					"altText": "",
					"link": "https://mohawk.scene7.com/is/image/MohawkResidential/CleanCare%20-%20Assets%20(2)",
					"title": "asdasda",
					"original": {
						"url": "https://mohawk.scene7.com/is/image/MohawkResidential/CleanCare%20-%20Assets%20(2)"
					}
				}
			},
			"faq": [
				{
					"content": {
						"hideCaret": false,
						"title": {
							"color": "dark",
							"content": {
								"richText": "<p>this is the 4th Tabs</p>"
							},
							"panel": "this is the 4th Tabs",
							"alignment": null,
							"presentation": {
								"type": "accordion"
							}
						},
						"collapsed": [
							{
								"type": "hippostd:html",
								"value": {
									"content": {
										"richText": "<p>This si the fourth&#160;</p>"
									},
									"presentation": {
										"theme": "light"
									}
								}
							}
						]
					},
					"presentation": {
						"type": "accordion"
					}
				}
			]
		}
	];

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [
				TabbedTabComponent,
				MockComponents(FaqCompoundComponent, MatTab, MatTabGroup),
			],
			imports: [],
			providers: [SimpleComponent],
      		schemas: [ NO_ERRORS_SCHEMA ]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(TabbedTabComponent);
		component = fixture.componentInstance;
		component.content = mockData;
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('Should return "index" attribute after #trackBy', () => {
		const mockObject = { index: 1 };
		const compiled = fixture.debugElement.nativeElement;
		expect(component.trackBy(0, mockObject)).toBe(1);
	});

	it('Should return the Tab index according to the content', () => {
		const mockTab = [];
		let tab = mockData.filter((tabs) => {
			return tabs.label.toLowerCase() === undefined;
		});
		expect(tab.length === mockTab.length).toBeTruthy();
	});

});
