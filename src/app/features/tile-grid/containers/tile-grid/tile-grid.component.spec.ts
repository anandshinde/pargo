import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BloomreachBaseClass } from '@core/bloomreach';
import { TileItemComponent, TileTwoBottomColumnComponent, TileTwoTopColumnComponent } from '../../components';
import { TileGridComponent } from './tile-grid.component';
import { MockModule, MockComponents } from 'ng-mocks';
import { SharedModule } from '@shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';

var contentData: any = {
	"id": "5c968beb-cf2c-4dab-a97e-d22314b27bb1",
	"_meta": {},
	"_links": {
	"site": {
	"href": "/site/mf/discover",
	"type": "internal"
	}
	},
	"name": "discover-tiles",
	"displayName": "Discover Tiles",
	"banner": [],
	"overlayBannerCompound": {
	"name": "brxm:OverlayBannerCompound",
	"displayName": "brxm:OverlayBannerCompound",
	"overlayTabs": [],
	"overlaySlides": [],
	"contentType": "brxm:OverlayBannerCompound"
	},
	"tiles": [
	{
	"name": "brxm:tiles",
	"displayName": "brxm:tiles",
	"link": {
	"name": "brxm:link",
	"displayName": "brxm:link",
	"link": null,
	"iconStyle": null,
	"url": "/discover/trends",
	"iconStroke": null,
	"text": "Explore",
	"icon": null,
	"alignment": null,
	"button": "primary",
	"target": "\"\"",
	"contentType": "brxm:LinkCompound"
	},
	"tileSize": null,
	"tileHeading": null,
	"logoCompound": null,
	"titleStyle": null,
	"image": {
	"name": "brxm:image",
	"displayName": "brxm:image",
	"link": "",
	"title": "",
	"imageDAM": "https://s7d4.scene7.com/is/image/MohawkResidential/LF000961_room_01?scl=3&wid=1400&hei=800&align=1,.2",
	"altText": "",
	"imageBRE": null,
	"contentType": "brxm:ImageCompound"
	},
	"superHeading": "",
	"content": {
	"contentType": "hippostd:html",
	"value": "<h2>Discover Trends</h2>\n\n<p>Searching for modern style inspiration? Look no further.</p>"
	},
	"contentType": "brxm:TileCompound"
	},
	{
	"name": "brxm:tiles",
	"displayName": "brxm:tiles",
	"link": {
	"name": "brxm:link",
	"displayName": "brxm:link",
	"link": null,
	"iconStyle": null,
	"url": "/discover/trends",
	"iconStroke": null,
	"text": "Explore",
	"icon": null,
	"alignment": null,
	"button": "primary",
	"target": "\"\"",
	"contentType": "brxm:LinkCompound"
	},
	"tileSize": null,
	"tileHeading": null,
	"logoCompound": null,
	"titleStyle": null,
	"image": {
	"name": "brxm:image",
	"displayName": "brxm:image",
	"link": "",
	"title": "",
	"imageDAM": "https://s7d4.scene7.com/is/image/MohawkResidential/LF000947_room_03?scl=3",
	"altText": "",
	"imageBRE": null,
	"contentType": "brxm:ImageCompound"
	},
	"superHeading": "",
	"content": {
	"contentType": "hippostd:html",
	"value": "<h2>Visualizer</h2>\n\n<p>Choose from our room scenes, or take a photo of your space to see how floors will look in your home.</p>"
	},
	"contentType": "brxm:TileCompound"
	},
	{
	"name": "brxm:tiles",
	"displayName": "brxm:tiles",
	"link": {
	"name": "brxm:link",
	"displayName": "brxm:link",
	"link": null,
	"iconStyle": null,
	"url": "/discover/trends",
	"iconStroke": null,
	"text": "Explore",
	"icon": null,
	"alignment": null,
	"button": "primary",
	"target": "\"\"",
	"contentType": "brxm:LinkCompound"
	},
	"tileSize": null,
	"tileHeading": null,
	"logoCompound": null,
	"titleStyle": null,
	"image": {
	"name": "brxm:image",
	"displayName": "brxm:image",
	"link": "",
	"title": "",
	"imageDAM": "https://s7d4.scene7.com/is/image/MohawkResidential/LF000973_room_01?scl=1",
	"altText": "",
	"imageBRE": null,
	"contentType": "brxm:ImageCompound"
	},
	"superHeading": "",
	"content": {
	"contentType": "hippostd:html",
	"value": "<h2>Blog</h2>\n\n<p>Find inspiration, get information, and learn what&#8217;s new.</p>"
	},
	"contentType": "brxm:TileCompound"
	}
	],
	"localeString": "en",
	"contentType": "brxm:ContentList"
	};
const componentMock: any = {
	getModels: () => ({
		document: {
			"$ref": "/content/u5c968bebcf2c4daba97ed22314b27bb1"
		},
		// configuration: { $ref: '/content/u72ddfdf3487a462487823dcd9a20246c' },
	}),
	getParameters: (): any => ({
		// configuration:
		// 	'/content/documents/administration/labels/mohawk-group/mohawkgroup-banner',
		"template": "grid2topcolumn",
		"flipped": true,
		"document": "content-list/discover-tiles"
	}),
	getName: () => 'single-column',

	// }
};

const pageMockData: any = {
	getContent: (): any => ({
		model: {
			"id": "5c968beb-cf2c-4dab-a97e-d22314b27bb1",
"_meta": {},
"_links": {
"site": {
"href": "/site/mf/discover",
"type": "internal"
}
},
"name": "discover-tiles",
"displayName": "Discover Tiles",
"banner": [],
"overlayBannerCompound": {
"name": "brxm:OverlayBannerCompound",
"displayName": "brxm:OverlayBannerCompound",
"overlayTabs": [],
"overlaySlides": [],
"contentType": "brxm:OverlayBannerCompound"
},
"tiles": [
{
"name": "brxm:tiles",
"displayName": "brxm:tiles",
"link": {
"name": "brxm:link",
"displayName": "brxm:link",
"link": null,
"iconStyle": null,
"url": "/discover/trends",
"iconStroke": null,
"text": "Explore",
"icon": null,
"alignment": null,
"button": "primary",
"target": "\"\"",
"contentType": "brxm:LinkCompound"
},
"tileSize": null,
"tileHeading": null,
"logoCompound": null,
"titleStyle": null,
"image": {
"name": "brxm:image",
"displayName": "brxm:image",
"link": "",
"title": "",
"imageDAM": "https://s7d4.scene7.com/is/image/MohawkResidential/LF000961_room_01?scl=3&wid=1400&hei=800&align=1,.2",
"altText": "",
"imageBRE": null,
"contentType": "brxm:ImageCompound"
},
"superHeading": "",
"content": {
"contentType": "hippostd:html",
"value": "<h2>Discover Trends</h2>\n\n<p>Searching for modern style inspiration? Look no further.</p>"
},
"contentType": "brxm:TileCompound"
},
{
"name": "brxm:tiles",
"displayName": "brxm:tiles",
"link": {
"name": "brxm:link",
"displayName": "brxm:link",
"link": null,
"iconStyle": null,
"url": "/discover/trends",
"iconStroke": null,
"text": "Explore",
"icon": null,
"alignment": null,
"button": "primary",
"target": "\"\"",
"contentType": "brxm:LinkCompound"
},
"tileSize": null,
"tileHeading": null,
"logoCompound": null,
"titleStyle": null,
"image": {
"name": "brxm:image",
"displayName": "brxm:image",
"link": "",
"title": "",
"imageDAM": "https://s7d4.scene7.com/is/image/MohawkResidential/LF000947_room_03?scl=3",
"altText": "",
"imageBRE": null,
"contentType": "brxm:ImageCompound"
},
"superHeading": "",
"content": {
"contentType": "hippostd:html",
"value": "<h2>Visualizer</h2>\n\n<p>Choose from our room scenes, or take a photo of your space to see how floors will look in your home.</p>"
},
"contentType": "brxm:TileCompound"
},
{
"name": "brxm:tiles",
"displayName": "brxm:tiles",
"link": {
"name": "brxm:link",
"displayName": "brxm:link",
"link": null,
"iconStyle": null,
"url": "/discover/trends",
"iconStroke": null,
"text": "Explore",
"icon": null,
"alignment": null,
"button": "primary",
"target": "\"\"",
"contentType": "brxm:LinkCompound"
},
"tileSize": null,
"tileHeading": null,
"logoCompound": null,
"titleStyle": null,
"image": {
"name": "brxm:image",
"displayName": "brxm:image",
"link": "",
"title": "",
"imageDAM": "https://s7d4.scene7.com/is/image/MohawkResidential/LF000973_room_01?scl=1",
"altText": "",
"imageBRE": null,
"contentType": "brxm:ImageCompound"
},
"superHeading": "",
"content": {
"contentType": "hippostd:html",
"value": "<h2>Blog</h2>\n\n<p>Find inspiration, get information, and learn what&#8217;s new.</p>"
},
"contentType": "brxm:TileCompound"
}
],
"localeString": "en",
"contentType": "brxm:ContentList"
},
		linkFactory: {
			mapping: {},
		},
		meta: [],
		getData: (): any => contentData,
	}),
	isPreview: (): any => false,
};
describe('TileGridComponent', () => {
	let component: TileGridComponent;
	let fixture: ComponentFixture<TileGridComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [
				TileGridComponent,
				MockComponents(TileItemComponent,TileTwoBottomColumnComponent,TileTwoTopColumnComponent),
			],
			providers: [BloomreachBaseClass],
			imports: [MockModule(SharedModule), RouterTestingModule],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(TileGridComponent);
		component = fixture.componentInstance;
		component.page = pageMockData;
		component.component = componentMock;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
		it(
		'It should render the flipped class',
		waitForAsync(() => {
			const compiled = fixture.debugElement.nativeElement;
			expect(compiled.querySelector('.flipped')).toBeTruthy();
		})
	);
	it(
		'should not render the toggle items',
		waitForAsync(() => {
			const compiled = fixture.debugElement.nativeElement;
			expect(compiled.querySelector('.show-more-button')).toBeFalsy();
		})
	);
	
});
