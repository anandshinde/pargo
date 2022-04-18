import { Page } from '@bloomreach/spa-sdk';

import { RichTextTypes, CompoundTypes } from '@app/shared/constants';
import { resolveImageCompound } from '@app/shared/resolvers/compound.resolver';
import { faqMapper, richTextMapper } from '@shared/resolvers/component.mapper';

export const TabbedContentMapper = (rawData: any, page: Page) => {
	return {
		top: TopMapper(rawData),
		tabsContent: rawData.tabContent.map((tab: any, index: number) => ({
			index,
			label: tab?.tabLabel,
			iconContent: tab?.tabIcon
				? {
						desktop: resolveImageCompound(tab?.tabIcon, page),
				  }
				: null,
			faq: tab.tabDetailContent?.faq.map((item) => {
				return faqMapper({ ...item, tabStyle: tab.tabStyle }, page);
			}),
		})),
	};
};

const TopMapper = (rawData: any) => {
	return {
		content: rawData?.groupContent
			? richTextMapper(rawData?.groupContent)
			: null,
		presentation: {
			heightLimit: '110px',
			type: RichTextTypes.faq,
		},
	};
};

export const SearchFilter = (rawData: any, searchparams: string) => {
	// search for string in topContent faqs
	const tabsContent = rawData.tabsContent.map((tabContent) => {
		const filteredContent = tabContent.faq?.filter((content) =>
			searchcontent(content, searchparams)
		);
		tabContent.faq = filteredContent.length ? filteredContent : tabContent.faq;
		return tabContent;
	});
	return {
		...rawData,
		tabsContent,
	};
};

const searchcontent = (tab: any, searchparams: string) => {
	const { title, collapsed } = tab.content;

	if (
		!!title.content &&
		matchSearchParams(title?.content?.richText, searchparams)
	) {
		return true;
	}

	if (collapsed.length === 0) {
		return false;
	}

	return !!collapsed.filter((content) =>
		componentTypeFilter(content.type, content.value, searchparams)
	).length;
};

const componentTypeFilter = (
	type: string,
	value: any,
	searchparams: string
) => {
	switch (type) {
		case CompoundTypes.richText:
			return matchSearchParams(value.content.richText, searchparams);
		case CompoundTypes.twoColumn:
			return ![...value.leftColumn, ...value.rightColumn]
				.map((content) =>
					componentTypeFilter(content.type, content.value, searchparams)
				)
				.every((v) => v === false);
		case CompoundTypes.threeColumn:
			return ![...value.leftColumn, ...value.rightColumn, ...value.middleColumn]
				.map((content) =>
					componentTypeFilter(content.type, content.value, searchparams)
				)
				.every((v) => v === false);
		case CompoundTypes.sqftCalculator:
		default:
			return false;
	}
};

const matchSearchParams = (haystack: string, needle: string) =>
	haystack?.toLowerCase().indexOf(needle?.toLowerCase()) !== -1;
