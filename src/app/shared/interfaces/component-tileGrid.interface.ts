import { Image } from '@bloomreach/spa-sdk';
import { BrLinkCompoundFormatted } from '@core/bloomreach';
import { ImageContent } from './compound-images.interface';

export interface BannerContent {
	alignment: string;
	bannerContent: string;
	bannerLinks: BrLinkCompoundFormatted[];
	color: string;
	id: string;
	imageBg: ImageContent;
	imageBgMobile: ImageContent;
	includeColor: boolean;
	logo: Image;
	overlayBannerCompound?: BannerContent[];
	resourceBundle?: any;
}

export interface SimpleTileContent {
	// template: {
	content: string;
	link: BrLinkCompoundFormatted;
	image?: ImageContent;
	//imageBgMobile: ImageContent;
	// logo: Image;
	//overlayBannerCompound?: BannerContent[];
	// includeColor?:string;
	// };
	// includeColor?:string;
	// bannerLinks?:any;
	// resourceBundle?: any;
}

export interface SimpleBannerPresentation {
	alignment: string;
	color: string;
	id: string;
	includeColor: boolean;
}
