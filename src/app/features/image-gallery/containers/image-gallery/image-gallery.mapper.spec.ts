import {
	ImageGalleryCategoriesMapper,
	ImageGalleryChipsMapper,
	ImageGalleryFiltersMapper,
} from './image-gallery.mapper';

describe('ImageGalleryMapper', () => {
	it('#ImageGalleryChipsMapper should generate Chip Values', () => {
		const formValuesMock = {
			floorColor: null,
			floorLook: null,
			floorType: null,
			roomType: 'room2',
			style: null,
			chips: [],
		};
		const galleryResourceBundleDataMock = {
			floorType: {
				label: 'Flooring Type',
				list: {
					floorType1: 'Floor Type 1',
					floorType2: 'Floor Type 2',
					floorType3: 'FloorType 3',
					floorType4: 'Floor Type 4',
				},
			},
			roomType: {
				label: 'Room',
				list: {
					room1: 'Room 1',
					room2: 'Room 2',
					room3: 'Room 3',
					room4: 'Room 4',
				},
			},
			floorLook: {
				label: 'Floor Look',
				list: {
					floorLook1: 'Floor Look 1',
					floorLook2: 'Floor Look 2',
					floorLook3: 'FloorLook 3',
					floorLook4: 'Floor Look 4',
				},
			},
			floorColor: {
				label: 'Floor Color',
				list: {
					floorColor1: 'Floor Color 1',
					floorColor2: 'Floor Color2',
					floorColor3: 'Floor Color 3',
					floorColor4: 'Floor Color 4',
				},
			},
			style: {
				label: 'Style',
				list: {
					style1: 'Style 1',
					style2: 'Style 2',
					style3: 'Style 3',
					style4: 'Style 4',
				},
			},
		};
		const responseMock = [
			{ value: 'room2', display: 'Room 2', category: 'roomType' },
		];

		expect(
			ImageGalleryChipsMapper(formValuesMock, galleryResourceBundleDataMock)
		).toEqual(responseMock);
	});

	it('#ImageGalleryFiltersMapper should return filters control value', () => {
		const galleryCategoriesDataMock = {
			roomType: ['room1', 'room2', 'room3'],
			floorType: ['floorType1', 'floorType2', 'floorType3'],
			floorLook: ['floorLook1', 'floorLook2', 'floorLook3'],
			floorColor: ['floorColor1', 'floorColor2', 'floorColor3'],
			style: ['style1', 'style2', 'style3'],
		};
		const galleryResourceBundleDataMock = {
			floorType: {
				label: 'Flooring Type',
				list: {
					floorType1: 'Floor Type 1',
					floorType2: 'Floor Type 2',
					floorType3: 'FloorType 3',
					floorType4: 'Floor Type 4',
				},
			},
			roomType: {
				label: 'Room',
				list: {
					room1: 'Room 1',
					room2: 'Room 2',
					room3: 'Room 3',
					room4: 'Room 4',
				},
			},
			floorLook: {
				label: 'Floor Look',
				list: {
					floorLook1: 'Floor Look 1',
					floorLook2: 'Floor Look 2',
					floorLook3: 'FloorLook 3',
					floorLook4: 'Floor Look 4',
				},
			},
			floorColor: {
				label: 'Floor Color',
				list: {
					floorColor1: 'Floor Color 1',
					floorColor2: 'Floor Color2',
					floorColor3: 'Floor Color 3',
					floorColor4: 'Floor Color 4',
				},
			},
			style: {
				label: 'Style',
				list: {
					style1: 'Style 1',
					style2: 'Style 2',
					style3: 'Style 3',
					style4: 'Style 4',
				},
			},
		};
		const responseMock = [
			{
				category: 'Room',
				formControlName: 'roomType',
				options: [
					{ value: 'room1', label: 'Room 1' },
					{ value: 'room2', label: 'Room 2' },
					{ value: 'room3', label: 'Room 3' },
				],
			},
			{
				category: 'Flooring Type',
				formControlName: 'floorType',
				options: [
					{ value: 'floorType1', label: 'Floor Type 1' },
					{ value: 'floorType2', label: 'Floor Type 2' },
					{ value: 'floorType3', label: 'FloorType 3' },
				],
			},
			{
				category: 'Floor Look',
				formControlName: 'floorLook',
				options: [
					{ value: 'floorLook1', label: 'Floor Look 1' },
					{ value: 'floorLook2', label: 'Floor Look 2' },
					{ value: 'floorLook3', label: 'FloorLook 3' },
				],
			},
			{
				category: 'Floor Color',
				formControlName: 'floorColor',
				options: [
					{ value: 'floorColor1', label: 'Floor Color 1' },
					{ value: 'floorColor2', label: 'Floor Color2' },
					{ value: 'floorColor3', label: 'Floor Color 3' },
				],
			},
			{
				category: 'Style',
				formControlName: 'style',
				options: [
					{ value: 'style1', label: 'Style 1' },
					{ value: 'style2', label: 'Style 2' },
					{ value: 'style3', label: 'Style 3' },
				],
			},
		];

		expect(
			ImageGalleryFiltersMapper(
				galleryCategoriesDataMock,
				galleryResourceBundleDataMock
			)
		).toEqual(responseMock);
	});

	it('#ImageGalleryCategoriesMapper should return categories with existing image categories', () => {
		const galleryDataMock = [
			{
				order: 1,
				sku: '123456',
				color: 'Red',
				name: 'Product 0001',
				cta: {
					content: {
						button: 'primary',
						link: null,
						target: '""',
						text: 'Buy me!',
						url: 'https://google.com',
					},
					presentation: { buttonType: 'primary' },
				},
				image: {
					content: {
						desktop: {
							altText: 'Alt text',
							link: '',
							title: 'Title',
							original: {
								size: 180529,
								height: 750,
								width: 1000,
								url:
									'http://localhost:8080/123/alexandru-rotariu-o_qteygvwjq-unsplash.jpg',
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
								url:
									'http://localhost:8080/123/alexandru-rotariu-o_qteygvwjq-unsplash.jpg',
							},
						},
					},
					presentation: { theme: 'light' },
				},
				filters: {
					roomType: 'room1',
					floorType: 'floorType1',
					floorLook: 'floorLook1',
					floorColor: 'floorColor1',
					style: 'style1',
				},
			},
			{
				order: 2,
				sku: '123456777',
				color: 'Purple',
				name: 'Hi Guinea Pig',
				cta: {
					content: {
						button: 'secondary',
						link: null,
						target: '""',
						text: 'Hello!',
						url: 'https://yahoo.es',
					},
					presentation: { buttonType: 'secondary' },
				},
				image: {
					content: {
						desktop: {
							altText: 'Guinea Pig',
							link: '',
							title: 'Guinea Title',
							original: {
								size: 97347,
								height: 667,
								width: 1000,
								url:
									'http://localhost:8080/321/bonnie-kittle-mucxe_wdure-unsplash.jpg',
							},
						},
						mobile: {
							altText: 'Guinea Pig',
							link: '',
							title: 'Guinea Title',
							original: {
								size: 97347,
								height: 667,
								width: 1000,
								url:
									'http://localhost:8080/123/bonnie-kittle-mucxe_wdure-unsplash.jpg',
							},
						},
					},
					presentation: { theme: 'light' },
				},
				filters: {
					roomType: 'room2',
					floorType: 'floorType2',
					floorLook: 'floorLook2',
					floorColor: 'floorColor2',
					style: 'style2',
				},
			},
			{
				order: 3,
				sku: '54321',
				color: 'ergfhnrther',
				name: '45366523',
				cta: {
					content: {
						button: 'primary',
						link: null,
						target: '""',
						text: 'ohohohoho',
						url: 'https://elcomercio.pe',
					},
					presentation: { buttonType: 'primary' },
				},
				image: {
					content: {
						desktop: {
							altText: 'rewgrthtrh',
							link: '',
							title: 'gerghregrewgfewr',
							original: {
								size: 154136,
								height: 588,
								width: 1000,
								url:
									'http://localhost:8080/333/krista-mangulsone-9gz3wfhr65u-unsplash.jpg',
							},
						},
						mobile: {
							altText: 'rewgrthtrh',
							link: '',
							title: 'gerghregrewgfewr',
							original: {
								size: 154136,
								height: 588,
								width: 1000,
								url:
									'http://localhost:8080/333/krista-mangulsone-9gz3wfhr65u-unsplash.jpg',
							},
						},
					},
					presentation: { theme: 'light' },
				},
				filters: {
					roomType: 'room1',
					floorType: 'floorType2',
					floorLook: 'floorLook2',
					floorColor: 'floorColor1',
					style: 'style1',
				},
			},
			{
				order: 4,
				sku: '6754321',
				color: 'ddeddede',
				name: '234346fgbdfvg',
				cta: {
					content: {
						button: 'primary',
						link: null,
						target: '""',
						text: 'iuoiiiu',
						url: '',
					},
					presentation: { buttonType: 'primary' },
				},
				image: {
					content: {
						desktop: {
							altText: '65543berfber',
							link: '',
							title: 'ergtrjhrefewwwe',
							original: {
								size: 79243,
								height: 667,
								width: 1000,
								url:
									'http://localhost:8080/123/marko-blazevic-zbvvurj71vu-unsplash.jpg',
							},
						},
						mobile: {
							altText: '65543berfber',
							link: '',
							title: 'ergtrjhrefewwwe',
							original: {
								size: 79243,
								height: 667,
								width: 1000,
								url:
									'http://localhost:8080/3333/marko-blazevic-zbvvurj71vu-unsplash.jpg',
							},
						},
					},
					presentation: { theme: 'light' },
				},
				filters: {
					roomType: 'room1',
					floorType: 'floorType1',
					floorLook: 'floorLook2',
					floorColor: 'floorColor2',
					style: 'style3',
				},
			},
			{
				order: 5,
				sku: 'abc324324',
				color: 'wedfwegtrhrtgewdf',
				name: '54657wevdsfvedfv',
				cta: {
					content: {
						button: 'primary',
						link: null,
						target: '""',
						text: 'vcovcovoovovo',
						url: 'https://peru.com',
					},
					presentation: { buttonType: 'primary' },
				},
				image: {
					content: {
						desktop: {
							altText: 'tyjuyefewf',
							link: '',
							title: 'regretrer',
							original: {
								size: 102861,
								height: 667,
								width: 1000,
								url:
									'http://localhost:8080/2222/paul-hanaoka-w2dss-zap4u-unsplash.jpg',
							},
						},
						mobile: {
							altText: 'tyjuyefewf',
							link: '',
							title: 'regretrer',
							original: {
								size: 102861,
								height: 667,
								width: 1000,
								url:
									'http://localhost:8080/1111/paul-hanaoka-w2dss-zap4u-unsplash.jpg',
							},
						},
					},
					presentation: { theme: 'light' },
				},
				filters: {
					roomType: 'room2',
					floorType: 'floorType2',
					floorLook: 'floorLook2',
					floorColor: 'floorColor2',
					style: 'style3',
				},
			},
			{
				order: 6,
				sku: '0878678',
				color: 'sdfsdfsdfsd',
				name: 'bnbnbnbnvvb',
				cta: {
					content: {
						button: 'primary',
						link: null,
						target: '""',
						text: 'Hohohohohoddd',
						url: 'https://peru21.pe',
					},
					presentation: { buttonType: 'primary' },
				},
				image: {
					content: {
						desktop: {
							altText: 'uykyhthythtyr',
							link: '',
							title: 'retyyeertet',
							original: {
								size: 158081,
								height: 666,
								width: 1000,
								url:
									'http://localhost:8080/444/sid-balachandran-_9a-3no5kje-unsplash.jpg',
							},
						},
						mobile: {
							altText: 'uykyhthythtyr',
							link: '',
							title: 'retyyeertet',
							original: {
								size: 158081,
								height: 666,
								width: 1000,
								url:
									'http://localhost:8080/12343/sid-balachandran-_9a-3no5kje-unsplash.jpg',
							},
						},
					},
					presentation: { theme: 'light' },
				},
				filters: {
					roomType: 'room3',
					floorType: 'floorType3',
					floorLook: 'floorLook3',
					floorColor: 'floorColor3',
					style: 'style3',
				},
			},
		];
		const responseMock = {
			roomType: ['room1', 'room2', 'room3'],
			floorType: ['floorType1', 'floorType2', 'floorType3'],
			floorLook: ['floorLook1', 'floorLook2', 'floorLook3'],
			floorColor: ['floorColor1', 'floorColor2', 'floorColor3'],
			style: ['style1', 'style2', 'style3'],
		};

		expect(ImageGalleryCategoriesMapper(galleryDataMock)).toEqual(responseMock);
	});
});
