import { BrImageDocument, DocumentRef } from '@core/bloomreach';

export interface BloomreachImageCompound {
	altText: string;
	contentType: 'brxm:ImageCompound';
	displayName: string;
	imageBRE: DocumentRef;
	imageDAM: string;
	link: string;
	name: string;
	title: string;
}
export interface ImageCompoundContent {
	image: ImageContent;
	imageMobile?: ImageContent;
}

export interface ImageContent {
	contentType?: 'brxm:ImageCompound';
	altText?: string;
	title?: string;
	link?: string;
	imageBRE?: BrImageDocument;
	imageDAMUrl?: string;
	imageDAM?: string;
	original?:any
}

export interface ImageCompoundContent {
	image: ImageContent;
	imageMobile?: ImageContent;
}

export interface ImageCompoundPresentation {
	breakpoint: string;
}

export interface ImageCompoundImage {
	altText: string;
	title: string;
	link: string;
	desktop: string;
	mobile: string;
}

export interface Image {
	size?: number;
	width?: number;
	height?: number;
	url: string;
}

export interface ImageModel {
	altText?: string;
	link?: string;
	original?: Image;
	title?: string;
}
