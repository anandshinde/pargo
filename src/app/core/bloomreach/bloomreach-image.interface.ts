import { DocumentRef } from '@core/bloomreach/bloomreach.interface';

export interface BrImageLink {
	site: {
		href: string;
		type: 'resource';
	};
}

export interface BrImage {
	height: number;
	width: number;
	mimeType: string;
	contentType: 'hippogallery:image';
	size: string;
	_links: BrImageLink;
}

export interface BrImageDocument {
	id?: string;
	name?: string;
	description?: string;
	contentType: 'brxm:imageset';
	original: BrImage;
	thumbnail: BrImage;
}

export interface BrImageComponent {
	altText: string;
	contentType: 'brxm:ImageCompound';
	imageBRE: DocumentRef;
	imageDAM: string;
	link: string;
	title: string;
}
