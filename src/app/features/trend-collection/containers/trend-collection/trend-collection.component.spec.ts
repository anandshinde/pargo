import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BloomreachBaseClass } from '@core/bloomreach';
import { TrendCollectionItemComponent } from '../../components';
import { TrendCollectionComponent } from './trend-collection.component';
import { MockModule, MockComponents } from 'ng-mocks';
import { SharedModule } from '@shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';

var contentData: any = {
		id: '524e6674-e5f0-4ffc-9b12-8a0e42fc54fd',
		_meta: {},
		_links: {
			site: {
				href: '/site/mf/discover/trends/trend-collection',
				type: 'internal',
			},
		},
		name: 'trends-sample-1',
		displayName: 'Trends-sample-1',
		featuredCollectionContent: {
			contentType: 'hippostd:html',
			value:
				'<h2>Room Example #1</h2>\n\n<p>Lorem Ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod t empor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco</p>',
		},
		trendCollectionItems: [
			{
				name: 'brxm:trendCollectionItems',
				displayName: 'brxm:trendCollectionItems',
				trendImage: {
					name: 'brxm:trendImage',
					displayName: 'brxm:trendImage',
					link: '',
					title: '',
					imageDAM:
						'https://mohawk.scene7.com/is/image/MohawkResidential/LUH25-65_swatch_01?wid=400&hei=400&fit=crop,1&fmt=png8-alpha&op_sharpen=1',
					altText: '',
					imageBRE: null,
					contentType: 'brxm:ImageCompound',
				},
				shopProductCTA: {
					name: 'brxm:shopProductCTA',
					displayName: 'brxm:shopProductCTA',
					link: null,
					alignment: null,
					url: '',
					button: 'primary',
					text: 'SHOP COLOR',
					icon: null,
					iconStroke: null,
					iconStyle: null,
					target: null,
					contentType: 'brxm:LinkCompound',
				},
				productSkuPath: '',
				collectionLogo: {
					name: 'brxm:collectionLogo',
					displayName: 'brxm:collectionLogo',
					link: '',
					title: '',
					imageDAM:
						'https://s7d4.scene7.com/is/image/MohawkResidential/PergoMaxHardwood?op_sharpen=1&wid=400',
					altText: '',
					imageBRE: null,
					contentType: 'brxm:ImageCompound',
				},
				contentType: 'brxm:TrendCollectionItemCompound',
			},
			{
				name: 'brxm:trendCollectionItems',
				displayName: 'brxm:trendCollectionItems',
				trendImage: {
					name: 'brxm:trendImage',
					displayName: 'brxm:trendImage',
					link: '',
					title: '',
					imageDAM:
						'https://mohawk.scene7.com/is/image/MohawkResidential/PUO45-11_swatch_01?wid=400&hei=400&fit=crop,1&fmt=png8-alpha&op_sharpen=1',
					altText: '',
					imageBRE: null,
					contentType: 'brxm:ImageCompound',
				},
				shopProductCTA: {
					name: 'brxm:shopProductCTA',
					displayName: 'brxm:shopProductCTA',
					link: null,
					alignment: null,
					url: '',
					button: 'primary',
					text: 'SHOP Color',
					icon: null,
					iconStroke: null,
					iconStyle: null,
					target: null,
					contentType: 'brxm:LinkCompound',
				},
				productSkuPath: '',
				collectionLogo: {
					name: 'brxm:collectionLogo',
					displayName: 'brxm:collectionLogo',
					link: '',
					title: '',
					imageDAM:
						'https://s7d4.scene7.com/is/image/MohawkResidential/pergo_logo_portfoliowetprotect?sharpen=1&wid=400',
					altText: '',
					imageBRE: null,
					contentType: 'brxm:ImageCompound',
				},
				contentType: 'brxm:TrendCollectionItemCompound',
			},
		],
		trendIntroductionContent: {
			contentType: 'hippostd:html',
			value: '',
		},
		featuredCollectionImage: {
			name: 'brxm:featuredCollectionImage',
			displayName: 'brxm:featuredCollectionImage',
			link: '',
			title: '',
			imageDAM:
				'https://s7d4.scene7.com/is/image/MohawkResidential/LF000949_room_01?scl=2',
			altText: '',
			imageBRE: null,
			contentType: 'brxm:ImageCompound',
		},
		localeString: 'en',
		contentType: 'brxm:TrendCollection',
	},
	overlayTrendCollectionCompound: {
		name: 'trend-collection-1';
		displayName: 'Trend-collection-1';
		trendItems: [
			{
				$ref: '/content/ucadf752da57b4b438cc3f24a4e28db79';
			},
			{
				$ref: '/content/u7057a58544ce4b08a3a8f6ea0ee0f7de';
			},
			{
				$ref: '/content/u9460504dcbbd4267bef93c34fc30d339';
			},
			{
				$ref: '/content/ua95908ac55d242eb9b082903274c21a6';
			}
		];
		banner: [];
		localeString: 'en';
		contentType: 'brxm:ContentList';
	};
const componentMock: any = {
	getModels: () => ({
		document: {
			$ref: '/content/u524e6674e5f04ffc9b128a0e42fc54fd',
		},
	}),
	getParameters: (): any => ({
		document: 'trend-collection/trend-collection-lists/trend-collection-1',
		'include-redline': false,
		shape: 'none',
		template: 'single-column',
		'vertical-alignment': 'center',
	}),
	getName: () => 'single-column',

	// }
};

const pageMockData: any = {
	getContent: (): any => ({
		model: {
			id: '524e6674-e5f0-4ffc-9b12-8a0e42fc54fd',
			_meta: {},
			_links: {
				site: {
					href: '/site/mf/discover/trends/trend-collection',
					type: 'internal',
				},
			},
			name: 'trends-sample-1',
			displayName: 'Trends-sample-1',
			featuredCollectionContent: {
				contentType: 'hippostd:html',
				value:
					'<h2>Room Example #1</h2>\n\n<p>Lorem Ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod t empor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco</p>',
			},
			trendCollectionItems: [
				{
					name: 'brxm:trendCollectionItems',
					displayName: 'brxm:trendCollectionItems',
					trendImage: {
						name: 'brxm:trendImage',
						displayName: 'brxm:trendImage',
						link: '',
						title: '',
						imageDAM:
							'https://mohawk.scene7.com/is/image/MohawkResidential/LUH25-65_swatch_01?wid=400&hei=400&fit=crop,1&fmt=png8-alpha&op_sharpen=1',
						altText: '',
						imageBRE: null,
						contentType: 'brxm:ImageCompound',
					},
					shopProductCTA: {
						name: 'brxm:shopProductCTA',
						displayName: 'brxm:shopProductCTA',
						link: null,
						alignment: null,
						url: '',
						button: 'primary',
						text: 'SHOP COLOR',
						icon: null,
						iconStroke: null,
						iconStyle: null,
						target: null,
						contentType: 'brxm:LinkCompound',
					},
					productSkuPath: '',
					collectionLogo: {
						name: 'brxm:collectionLogo',
						displayName: 'brxm:collectionLogo',
						link: '',
						title: '',
						imageDAM:
							'https://s7d4.scene7.com/is/image/MohawkResidential/PergoMaxHardwood?op_sharpen=1&wid=400',
						altText: '',
						imageBRE: null,
						contentType: 'brxm:ImageCompound',
					},
					contentType: 'brxm:TrendCollectionItemCompound',
				},
				{
					name: 'brxm:trendCollectionItems',
					displayName: 'brxm:trendCollectionItems',
					trendImage: {
						name: 'brxm:trendImage',
						displayName: 'brxm:trendImage',
						link: '',
						title: '',
						imageDAM:
							'https://mohawk.scene7.com/is/image/MohawkResidential/PUO45-11_swatch_01?wid=400&hei=400&fit=crop,1&fmt=png8-alpha&op_sharpen=1',
						altText: '',
						imageBRE: null,
						contentType: 'brxm:ImageCompound',
					},
					shopProductCTA: {
						name: 'brxm:shopProductCTA',
						displayName: 'brxm:shopProductCTA',
						link: null,
						alignment: null,
						url: '',
						button: 'primary',
						text: 'SHOP Color',
						icon: null,
						iconStroke: null,
						iconStyle: null,
						target: null,
						contentType: 'brxm:LinkCompound',
					},
					productSkuPath: '',
					collectionLogo: {
						name: 'brxm:collectionLogo',
						displayName: 'brxm:collectionLogo',
						link: '',
						title: '',
						imageDAM:
							'https://s7d4.scene7.com/is/image/MohawkResidential/pergo_logo_portfoliowetprotect?sharpen=1&wid=400',
						altText: '',
						imageBRE: null,
						contentType: 'brxm:ImageCompound',
					},
					contentType: 'brxm:TrendCollectionItemCompound',
				},
			],
			trendIntroductionContent: {
				contentType: 'hippostd:html',
				value: '',
			},
			featuredCollectionImage: {
				name: 'brxm:featuredCollectionImage',
				displayName: 'brxm:featuredCollectionImage',
				link: '',
				title: '',
				imageDAM:
					'https://s7d4.scene7.com/is/image/MohawkResidential/LF000949_room_01?scl=2',
				altText: '',
				imageBRE: null,
				contentType: 'brxm:ImageCompound',
			},
			localeString: 'en',
			contentType: 'brxm:TrendCollection',
		},
		overlayTrendCollectionCompound: {
			name: 'trend-collection-1',
			displayName: 'Trend-collection-1',
			trendItems: [
				{
					$ref: '/content/ucadf752da57b4b438cc3f24a4e28db79',
				},
				{
					$ref: '/content/u7057a58544ce4b08a3a8f6ea0ee0f7de',
				},
				{
					$ref: '/content/u9460504dcbbd4267bef93c34fc30d339',
				},
				{
					$ref: '/content/ua95908ac55d242eb9b082903274c21a6',
				},
			],
			banner: [],
			localeString: 'en',
			contentType: 'brxm:ContentList',
		},
		linkFactory: {
			mapping: {},
		},
		meta: [],
		getData: (): any => contentData,
	}),
	isPreview: (): any => false,
};
describe('TrendCollectionComponent', () => {
	let component: TrendCollectionComponent;
	let fixture: ComponentFixture<TrendCollectionComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [
				TrendCollectionComponent,
				MockComponents(TrendCollectionItemComponent),
			],
			providers: [BloomreachBaseClass],
			imports: [MockModule(SharedModule), RouterTestingModule],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(TrendCollectionComponent);
		component = fixture.componentInstance;
		component.page = pageMockData;
		component.component = componentMock;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
	it(
		'should render the trend items',
		waitForAsync(() => {
			const compiled = fixture.debugElement.nativeElement;
			expect(compiled.querySelector('.trend-collection__trend')).toBeTruthy();
		})
	);
	it(
		'should render the tiles',
		waitForAsync(() => {
			const compiled = fixture.debugElement.nativeElement;
			expect(compiled.querySelector('.trend-collection__tile')).toBeTruthy();
		})
	);
	it(
		'should render the main left content',
		waitForAsync(() => {
			const compiled = fixture.debugElement.nativeElement;
			expect(compiled.querySelector('.trend-collection__overlay')).toBeTruthy();
		})
	);
	it(
		'should render the right content',
		waitForAsync(() => {
			const compiled = fixture.debugElement.nativeElement;
			expect(
				compiled.querySelector('.trend-collection__collection')
			).toBeTruthy();
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
