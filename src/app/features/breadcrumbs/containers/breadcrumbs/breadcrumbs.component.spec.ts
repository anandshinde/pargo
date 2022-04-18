import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BloomreachComponent } from '@app/shared/base-classes';
import { SharedModule } from '@app/shared/shared.module';
import { Component } from '@bloomreach/spa-sdk';
import { MockComponents, MockModule } from 'ng-mocks';
import { of } from 'rxjs';
import { BreadcrumbsComponent } from './breadcrumbs.component';

describe('BreadcrumbsComponent', () => {
	let component: BreadcrumbsComponent;
	let fixture: ComponentFixture<BreadcrumbsComponent>;
	const contentMock = {
		breadcrumbs: [
			{
				index: 0,
				label: 'Cat',
				iconContent: {
					desktop: {
						size: 79243,
						height: 667,
						width: 1000,
						url: 'http://localhost:8080/site/binaries/content/gallery/pe-en-us/icons/marko-blazevic-zbvvurj71vu-unsplash.jpg',
					},
					mobile: {
						size: 79243,
						height: 667,
						width: 1000,
						url: 'http://localhost:8080/site/binaries/content/gallery/pe-en-us/icons/marko-blazevic-zbvvurj71vu-unsplash.jpg',
					},
				},
				faq: {
					content: [
						{
							index: 0,
							hideCaret: false,
							title: {
								color: 'blue',
								content: {
									richText: '<p>What is Lorem Ipsum?</p>',
								},
								presentation: {
									theme: 'faq',
								},
							},
							collapsed: {
								content: [
									{
										richText: '<p>Lorem Ipsum is simply dummy text of </p>',
									},
								],
								presentation: {
									theme: 'faq',
								},
							},
						},
						{
							index: 1,
							hideCaret: false,
							title: {
								color: 'dark',
								content: {
									richText: '<h2>Where does it come from?</h2>',
								},
								presentation: {
									theme: 'faq',
								},
							},
							collapsed: {
								content: [
									{
										richText:
											'<p>Contrary to popular belief, Lorem Ipsum is not simply random text.</p>',
									},
								],
								presentation: {
									theme: 'faq',
								},
							},
						},
					],
					presentation: {
						theme: 'accordion',
					},
				},
			},
			{
				index: 1,
				label: 'Dog',
				iconContent: {
					desktop: {
						size: 180529,
						height: 750,
						width: 1000,
						url: 'http://localhost:8080/site/binaries/content/gallery/pe-en-us/icons/alexandru-rotariu-o_qteygvwjq-unsplash.jpg',
					},
					mobile: {
						size: 180529,
						height: 750,
						width: 1000,
						url: 'http://localhost:8080/site/binaries/content/gallery/pe-en-us/icons/alexandru-rotariu-o_qteygvwjq-unsplash.jpg',
					},
				},
				faq: {
					content: [
						{
							index: 0,
							hideCaret: true,
							title: {
								color: 'dark',
								content: {
									richText: '<p>Why do we use it?</p>',
								},
								presentation: {
									theme: 'faq',
								},
							},
							collapsed: {
								content: [
									{
										richText:
											'<p>It is a long established fact that a reader</p>',
									},
								],
								presentation: {
									theme: 'faq',
								},
							},
						},
						{
							index: 1,
							hideCaret: true,
							title: {
								color: 'dark',
								content: {
									richText: '<p>Where can I get some?</p>',
								},
								presentation: {
									theme: 'faq',
								},
							},
							collapsed: {
								content: [
									{
										richText:
											'<p>There are many variations of passages of Lorem Ipsum available</p>',
									},
								],
								presentation: {
									theme: 'faq',
								},
							},
						},
					],
					presentation: {
						theme: 'faq',
					},
				},
			},
			{
				index: 2,
				label: 'catt',
				iconContent: {
					desktop: {
						size: 145936,
						height: 1000,
						width: 750,
						url: 'http://localhost:8080/site/binaries/content/gallery/pe-en-us/icons/edgar-nkc772r_qog-unsplash.jpg',
					},
					mobile: {
						size: 145936,
						height: 1000,
						width: 750,
						url: 'http://localhost:8080/site/binaries/content/gallery/pe-en-us/icons/edgar-nkc772r_qog-unsplash.jpg',
					},
				},
				faq: {
					content: [
						{
							index: 0,
							hideCaret: false,
							title: {
								color: 'blue',
								content: {
									richText: '<p>The standard Lorem Ipsum passage</p>',
								},
								presentation: {
									theme: 'faq',
								},
							},
							collapsed: {
								content: [],
								presentation: {
									theme: 'faq',
								},
							},
						},
					],
					presentation: {
						theme: 'faq',
					},
				},
			},
		],
	};
	const componentMock = {
		getParameters: (): any => ({
			'include-breadcrumbs': true,
		}),
	} as Component;
	const fakeActivatedRoute: any = {
		queryParams: of({
			title:'Home page',
			crumbs:contentMock
		})
	}
	
	// {
	// 	// snapshot: { data: {  }, }
	// 	snapshot: {
	// 		queryParams: {
	// 			title: 'test',
	// 		},
	// 	},
	// };
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [BreadcrumbsComponent],
			imports: [
				MockModule(SharedModule),
				RouterTestingModule,
				ReactiveFormsModule,
				RouterModule,
			],
			providers: [
				{ provide: ActivatedRoute, useValue: fakeActivatedRoute },
			],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(BreadcrumbsComponent);
		component = fixture.componentInstance;
		component.component = componentMock;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
