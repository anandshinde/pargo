// import { TwoColumnCompoundContentProps } from '@shared/interfaces';
import { ThemeTypes } from '@app/shared/constants/layout.constants';
import { LayoutWrapperProps, RichTextProps } from '@app/shared/interfaces';
import { Page } from '@bloomreach/spa-sdk';
// import { getMappedCompound } from '@shared/component.mapper';
import { getMappedCompound } from '@app/shared/mappers/component.mapper';
import { resolveReference } from '@app/core/bloomreach';

export const TrendCollectionMapper = (
	rawData: any,
	page: Page
): [
	{
		trendIntroduction: RichTextProps;
		featureCollectionImage: LayoutWrapperProps;
		featureCollectionOverlay: RichTextProps;
		trendCollectionItems: any;
	}
] => {
	if (!rawData) {
		return null;
	}
	const rawTrendItems = [];
	if (rawData?.trendItems) {
		rawData.trendItems.map((item: any) => {
			// bannerMap(banner, params, page)
			const trendData = '$ref' in item ? resolveReference(item, page) : item;
			rawTrendItems.push(trendData);
		});
	}

	const rawTrendCollection = rawData?.trendItems ? rawTrendItems : [rawData];
	let trendCollection: any = [];
	rawTrendCollection.map((trendItem: any) => {
		const trendIntroduction = {
			...getMappedCompound(trendItem?.trendIntroductionContent, page).value,
			presentation: {
				theme: ThemeTypes.light,
				component: 'trend-intro-overlay',
			},
		};
		const featureCollectionImage = () => {
			const { image } = getMappedCompound(
				trendItem?.featuredCollectionImage,
				page
			).value?.content;
			const imageDAMUrl = !!image.imageDAMUrl
				? image.imageDAMUrl
				: image?.imageBRE?.original?._links?.site?.href;
			delete image?.imageBRE;
			return {
				content: {
					image: { ...image, ...{ imageDAMUrl: imageDAMUrl } },
					imageMobile: { ...image, ...{ imageDAMUrl: imageDAMUrl } },
				},
				presentation: {
					isInset: true,
					theme: ThemeTypes.light,
				},
			};
		};

		const featureCollectionOverlay = {
			...getMappedCompound(trendItem?.featuredCollectionContent, page).value,
			presentation: {
				theme: ThemeTypes.dark,
				component: 'trend-collection-overlay',
			},
		};
		//TrendCollectionContent
		const trendCollectionContent =
			trendItem?.trendCollectionItems?.map((item) => {
				return constructTwoColumnData(item, page);
			}) || [];

		const trendCollectionItems = {
			leftColumn: trendCollectionContent[0] || null,
			rightColumn: trendCollectionContent[1] || null,
		};
		trendCollection.push({
			trendIntroduction,
			featureCollectionImage: featureCollectionImage(),
			featureCollectionOverlay,
			trendCollectionItems,
		});
	});
	return trendCollection;
};

const constructTwoColumnData = (
	data: any,
	page: Page
): { image: any; logo: any; link: any } => {
	const { trendImage, collectionLogo, shopProductCTA } = data;
	const collectionImg = (): { content: any; presentation: any } => {
		const { content, presentation } = getMappedCompound(trendImage, page).value;

		return {
			content,
			presentation: {
				...presentation,
				theme: ThemeTypes.dark,
			},
		};
	};
	const collectionLogoImage = () => {
		const { content, presentation } = getMappedCompound(
			collectionLogo,
			page
		).value;

		return {
			content,
			presentation: {
				...presentation,
				theme: ThemeTypes.dark,
			},
		};
	};
	const shopTrendLink = (): { content: any; presentation: any } => {
		const { content, presentation } = getMappedCompound(
			shopProductCTA,
			page
		).value;

		return {
			content,
			presentation: {
				...presentation,
				theme: ThemeTypes.dark,
			},
		};
	};

	return {
		image: collectionImg(),
		logo: collectionLogoImage(),
		link: shopTrendLink(),
	};
};
