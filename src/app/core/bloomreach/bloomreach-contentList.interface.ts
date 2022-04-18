import { BloomreachBanner } from './bloomreach-banner.interface';

export interface BloomreachContentList {
	banner: BloomreachBanner[];
	contentType: 'brxm:ContentList';
	name: string;
	overlayBannerCompound?: BloomreachBanner;
	tiles: any[];
	overlayTabs?: BloomreachBanner[];
	overlaySlides?: BloomreachBanner[];
	shape?: string;
	alignment?: string;
	includeRedline?: boolean;
}
