import { BrLink, BrRichText } from '@core/bloomreach/bloomreach.interface';
import { BrImageComponent } from '@core/bloomreach/bloomreach-image.interface';

export interface BloomreachBanner {
	alignment: string;
	bannerContent: BrRichText;
	bannerHeadline: null;
	color: string;
	contentType: 'brxm:bannerdocument';
	displayName: string;
	headlineColor: string;
	id: string;
	logo: BrImageComponent;
	imageBg: BrImageComponent;
	imageBgMobile: BrImageComponent;
	includeColor: boolean;
	overlayTabs?: BloomreachBanner[];
	overlaySlides?: BloomreachBanner[];
	shape?: string;
	includeRedline?: boolean;
}
