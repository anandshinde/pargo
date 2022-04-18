import { Page } from '@bloomreach/spa-sdk';
import {
	BloomreachBanner,
	BloomreachContentList,
	DocumentRef,
	linkMap,
	resolveContentValue,
	resolveImageCompound,
	resolveReference,
	BloomreachComponentTypes,
} from '@core/bloomreach';
import { HorizAlignmentNames } from '@shared/constants';
// import { BannerContent } from '@shared/interfaces';

const bannerMap = (data: DocumentRef | BloomreachBanner, params, page) => {
	if (data === null) {
		return null;
	}
	const bannerData = '$ref' in data ? resolveReference(data, page) : data;
	return {
		content: {
			bannerContent: bannerData?.bannerContent
				? resolveContentValue(bannerData?.bannerContent)
				: null,
			bannerHeadline: bannerData?.bannerHeadline
				? resolveContentValue(bannerData?.bannerHeadline)
				: null,
			bannerLinks: bannerData?.bannerLinks?.length
				? bannerData?.bannerLinks.map((link) => linkMap(link, page))
				: null,
			id: bannerData?.id || null,
			alignment: !!bannerData?.alignment
				? bannerData?.alignment
				: HorizAlignmentNames.center,
			imageBg: resolveImageCompound(bannerData?.imageBg, page),
			imageBgMobile: resolveImageCompound(bannerData?.imageBgMobile, page),
			logo: resolveImageCompound(bannerData?.logo, page),
		},

		presentation: {
			color: bannerData?.color || null,
			includeColor: bannerData?.includeColor || null,
			shape: params?.shape,
			includeRedline: params?.['include-redline'],
			alignment: params?.alignment,
			verticalAlignment: params?.['vertical-alignment'],
			size: params?.size,
		},
	};
};

const bannerWithSlideMap = (
	data: DocumentRef | BloomreachBanner,
	params,
	page
) => {
	const bannerData = '$ref' in data ? resolveReference(data, page) : data;
	let bannerImages = [];
	bannerData?.bannerImage.forEach((banner) => {
		bannerImages.push(resolveImageCompound(banner, page));
	});
	return {
		content: {
			ctaTitle: bannerData?.ctaTitle ? bannerData?.ctaTitle : null,
			description: bannerData?.description
				? resolveContentValue(bannerData?.description)
				: null,
			bannerImages: bannerImages.length ? bannerImages : [],
			id: bannerData?.id || null,
			heading: bannerData?.heading ? bannerData?.heading : null,
			superHeading: bannerData?.superHeading ? bannerData?.superHeading : null,
		},

		presentation: {
			color: bannerData?.color || null,
			includeColor: bannerData?.includeColor || null,
			shape: params?.shape,
			includeRedline: params?.['include-redline'],
			alignment: params?.alignment,
			verticalAlignment: params?.['vertical-alignment'],
			size: params?.size,
		},
	};
};

export const BannerMapper = (
	rawData: BloomreachBanner | BloomreachContentList,
	params: any,
	page: Page,
	bannerType: string
): any => {
	if (rawData?.contentType === BloomreachComponentTypes.contentList) {
		if (rawData.banner.length) {
			return {
				slides: rawData.banner.map((banner: BloomreachBanner) =>
					bannerMap(banner, params, page)
				),
			};
		} else if (rawData.overlayBannerCompound != undefined) {
			return {
				tabs: rawData.overlayBannerCompound.overlayTabs.map(
					(banner: BloomreachBanner) => bannerMap(banner, params, page)
				),
				slides: rawData.overlayBannerCompound.overlaySlides.map(
					(banner: BloomreachBanner) => bannerMap(banner, params, page)
				),
			};
		} else {
			null;
		}
	} else if (bannerType === 'bannerwslides') {
		return {
			slides: bannerWithSlideMap(rawData, params, page),
		};
	} else {
		return {
			slides: [bannerMap(rawData, params, page)],
		};
	}
};
