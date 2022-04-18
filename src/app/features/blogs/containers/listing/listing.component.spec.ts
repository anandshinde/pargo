import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ListingComponent } from './listing.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Component } from '@angular/compiler/src/core';
import { BloomreachBaseClass } from '@app/core/bloomreach';
import { SharedModule } from '@shared/shared.module';
import { MockComponents, MockModule } from 'ng-mocks';

const componentMock: any = {
	getModels: () => ({
		document: {
			$ref: '/content/u2c5be95d184f4134bc1b78952c378643',
		},
		configuration: { $ref: '/content/u72ddfdf3487a462487823dcd9a20246c' },
	}),
	getParameters: (): any => ({
		alignment: 'left',
		configuration:
			'/content/documents/administration/labels/mohawk-flooring/mflooring-listing',
		document: 'content-list/mflooring-listing-test',
		'include-redline': false,
		shape: 'none',
		template: 'mflooring-listing',
		'vertical-alignment': 'center',
	}),
	getName: () => 'mflooring-listing',

	// }
} as Component;
describe('ListingComponent', () => {
	let component: ListingComponent;
	let fixture: ComponentFixture<ListingComponent>;
	const mockData = [
		{
			image: {
				contentType: 'brxm:ImageCompound',
				altText: '',
				link: '',
				title: '',
				imageBRE: null,
				imageDAMUrl:
					'https://s7d4.scene7.com/is/image/MohawkResidential/Design-services-5?scl=1',
			},
			shortDescription:
				'<p>Lorem ipsum dolor sit amen, ser do eiusmod tempar tomar amr pothchola sit.Lorem ipsum dolor sit amen,</p>',
			title: 'Blog 1',
			link: {
				presentation: {
					buttonType: 'link',
					textAlign: null,
					iconStroke: null,
					iconPosition: null,
				},
				content: {
					link: null,
					target: '""',
					text: 'Read  More >',
					url: '/discover/blog/recent-blogs/blog1',
				},
			},
			date: 1628822160000,
			articleType: '',
		},
		{
			image: {
				contentType: 'brxm:ImageCompound',
				altText: '',
				link: '',
				title: '',
				imageBRE: null,
				imageDAMUrl:
					'https://s7d4.scene7.com/is/image/MohawkResidential/LF000951_room_02?scl=6&wid=1200&hei=850&align=.9,.6',
			},
			shortDescription:
				'<p>Lorem ipsum dolor sit amen, ser do eiusmod tempar tomar amr pothc hola sit.Lorem ipsum dolor sit amen, ser do eiusmod tempar tomar amr pothchola sit.tempar tomar amr pothchola sit.Lorem ipsum dolor sit amen, ser do eiusmod tempar tomar amr pothchola sit.Lorem ipsum dolor sit amen. chola sit.Lorem ipsum dolor sit amen, ser do eiusmod tempar tomar amr pothchola sit.tempar tomar amr pothc.sit.Lorem ipsum dolor sit amen, ser do eiusm</p>',
			title: 'Blog 2',
			link: {
				presentation: {
					buttonType: 'link',
					textAlign: null,
					iconStroke: null,
					iconPosition: null,
				},
				content: {
					link: null,
					target: '"_blank"',
					text: 'Read  More >',
					url: '/discover/blog/recent-blogs/blog2',
				},
			},
			date: 1628822100000,
			articleType: 'design',
		},
		{
			image: {
				contentType: 'brxm:ImageCompound',
				altText: '',
				link: '',
				title: '',
				imageBRE: null,
				imageDAMUrl:
					'https://s7d4.scene7.com/is/image/MohawkResidential/LF000951_room_02?scl=6&wid=1200&hei=850&align=.9,.6',
			},
			shortDescription:
				'<p>Lorem ipsum dolor sit amen, ser do eiusmod tempar tomar amr pothchola sit.Lorem ipsum dolor sit amen,</p>',
			title: 'Blog 3',
			link: {
				presentation: {
					buttonType: 'link',
					textAlign: null,
					iconStroke: null,
					iconPosition: null,
				},
				content: {
					link: null,
					target: '"_blank"',
					text: 'Read  More >',
					url: '/discover/blog/recent-blogs/blog3',
				},
			},
			date: 1628822040000,
			articleType: 'advice',
		},
		{
			image: {
				contentType: 'brxm:ImageCompound',
				altText: '',
				link: '',
				title: '',
				imageBRE: null,
				imageDAMUrl:
					'https://s7d4.scene7.com/is/image/MohawkResidential/LF000951_room_02?scl=6&wid=1200&hei=850&align=.9,.6',
			},
			shortDescription:
				'<p>Lorem ipsum dolor sit amen, ser do eiusmod tempar tomar amr pothchola sit.Lorem ipsum dolor sit amen,</p>',
			title: 'Blog 4',
			link: {
				presentation: {
					buttonType: 'primary',
					textAlign: null,
					iconStroke: null,
					iconPosition: null,
				},
				content: {
					link: null,
					target: '"_blank"',
					text: 'Read  More >',
					url: '/discover/blog/recent-blogs/blog4',
				},
			},
			date: 1628821980000,
			articleType: 'design',
		},
		{
			image: {
				contentType: 'brxm:ImageCompound',
				altText: '',
				link: '',
				title: '',
				imageBRE: null,
				imageDAMUrl:
					'https://s7d4.scene7.com/is/image/MohawkResidential/LF000951_room_02?scl=6&wid=1200&hei=850&align=.9,.6',
			},
			shortDescription:
				'<p>Lorem ipsum dolor sit amen, ser do eiusmod tempar tomar amr pothchola sit.Lorem ipsum dolor sit amen,</p>',
			title: 'Blog 5',
			link: {
				presentation: {
					buttonType: 'primary',
					textAlign: null,
					iconStroke: null,
					iconPosition: null,
				},
				content: {
					link: null,
					target: '"_blank"',
					text: 'Read  More >',
					url: '/discover/blog/recent-blogs/blog5',
				},
			},
			date: 1628821920000,
			articleType: 'design',
		},
		{
			image: {
				contentType: 'brxm:ImageCompound',
				altText: '',
				link: '',
				title: '',
				imageBRE: null,
				imageDAMUrl:
					'https://s7d4.scene7.com/is/image/MohawkResidential/LF000951_room_02?scl=6&wid=1200&hei=850&align=.9,.6',
			},
			shortDescription:
				'<p>Lorem ipsum dolor sit amen, ser do eiusmod tempar tomar amr pothc hola sit.Lorem ipsum dolor sit amen, ser do eiusmod tempar tomar amr pothchola sit.tempar tomar amr pothchola sit.Lorem ipsum dolor sit amen, ser do eiusmod tempar tomar amr pothchola sit.Lorem ipsum dolor sit amen. chola sit.Lorem ipsum dolor sit amen, ser do eiusmod tempar tomar amr pothchola sit.tempar tomar amr pothc.sit.Lorem ipsum dolor sit amen, ser do eiusm</p>',
			title: 'Blog 6',
			link: {
				presentation: {
					buttonType: 'link',
					textAlign: null,
					iconStroke: null,
					iconPosition: null,
				},
				content: {
					link: null,
					target: '"_blank"',
					text: 'Read  More >',
					url: '/discover/blog/recent-blogs/blog6',
				},
			},
			date: 1628821860000,
			articleType: 'design',
		},
	];

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ListingComponent],
			imports: [MockModule(SharedModule)],
			providers: [BloomreachBaseClass],
			schemas: [NO_ERRORS_SCHEMA],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ListingComponent);
		component = fixture.componentInstance;
		component.component = componentMock;
		component.data = mockData;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
	it(
		'should render the Main Card ',
		waitForAsync(() => {
			const compiled = fixture.debugElement.nativeElement;
			expect(compiled.querySelector('.blogs')).toBeTruthy();
		})
	);
	it(
		'should render the Tabs ',
		waitForAsync(() => {
			const compiled = fixture.debugElement.nativeElement;
			expect(compiled.querySelector('.blogs_tabs')).toBeTruthy();
		})
	);
	it(
		'should render the Head ',
		waitForAsync(() => {
			const compiled = fixture.debugElement.nativeElement;
			expect(compiled.querySelector('.head')).toBeTruthy();
		})
	);
	it(
		'should render the Box Shadow ',
		waitForAsync(() => {
			const compiled = fixture.debugElement.nativeElement;
			expect(compiled.querySelector('.box-shadow')).toBeTruthy();
		})
	);
	it(
		'should render the Blog Card-list ',
		waitForAsync(() => {
			const compiled = fixture.debugElement.nativeElement;
			expect(compiled.querySelector('.blog-card-list')).toBeTruthy();
		})
	);
	it(
		'should render the Show More Button',
		waitForAsync(() => {
			const compiled = fixture.debugElement.nativeElement;
			expect(compiled.querySelector('.show-more-button')).toBeTruthy();
		})
	);
});
