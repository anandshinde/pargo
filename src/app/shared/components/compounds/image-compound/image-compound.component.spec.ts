import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageCompoundComponent } from './image-compound.component';

describe('ImageCompoundComponent', () => {
	let component: ImageCompoundComponent;
	let fixture: ComponentFixture<ImageCompoundComponent>;
	const contentMock = {
		desktop: {
			altText: 'Alt text',
			link: '',
			title: 'Title',
			original: {
				size: 180529,
				height: 750,
				width: 1000,
				url: 'http://localhost:8080/site/binaries/content/gallery/pe-en-us/image-gallery/alexandru-rotariu-o_qteygvwjq-unsplash.jpg',
			},
		},
		mobile: {
			altText: 'Alt text',
			link: '',
			title: 'Title',
			original: {
				size: 180529,
				height: 750,
				width: 1000,
				url: 'http://localhost:8080/site/binaries/content/gallery/pe-en-us/image-gallery/alexandru-rotariu-o_qteygvwjq-unsplash.jpg',
			},
		},
	};

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ImageCompoundComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ImageCompoundComponent);
		component = fixture.componentInstance;
		// component.content = contentMock;

		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
