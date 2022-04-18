import { Page } from '@bloomreach/spa-sdk';
import { BloomreachCompoundTypes } from '@core/bloomreach';

import {
	faqMapper,
	fourColumnMapper,
	getCompoundType,
	getMappedCompound,
	threeColumnMapper,
	twoColumnMapper,
	tileIconMapper,
	titleMapper,
	quoteMapper,
} from '@shared/mappers/component.mapper';

export const RichContentMapper = (rawData: any, page: Page) => {
	return rawData.contentBlocks.map((content) => {
		const type = getCompoundType(content);

		if (type === BloomreachCompoundTypes.twoColumn) {
			return {
				type: BloomreachCompoundTypes.twoColumn,
				value: twoColumnMapper(content, page),
			};
		}
		if (type === BloomreachCompoundTypes.threeColumn) {
			return {
				type: BloomreachCompoundTypes.threeColumn,
				value: threeColumnMapper(content, page),
			};
		}

		if (type === BloomreachCompoundTypes.fourColumn) {
			return {
				type: BloomreachCompoundTypes.fourColumn,
				value: fourColumnMapper(content, page),
			};
		}
		if (type === BloomreachCompoundTypes.title) {
			return {
				type: BloomreachCompoundTypes.title,
				value: titleMapper(content, page),
			};
		}
		if (type === BloomreachCompoundTypes.quote) {
			return {
				type: BloomreachCompoundTypes.quote,
				value: quoteMapper(content, page),
			};
		}

		if (type === BloomreachCompoundTypes.tileIcon) {
			return {
				type: BloomreachCompoundTypes.tileIcon,
				value: tileIconMapper(content, page),
			};
		}

		if (type === BloomreachCompoundTypes.faq) {
			return {
				type: BloomreachCompoundTypes.faq,
				value: faqMapper({ ...content, tabStyle: 'faq' }, page),
			};
		}
		if (type === BloomreachCompoundTypes.richText) {
			return getMappedCompound(content, page);
		}

		if (type === BloomreachCompoundTypes.image) {
			return getMappedCompound(content, page);
		}

		if (type === BloomreachCompoundTypes.video) {
			return getMappedCompound(content, page);
		}

		if (type === BloomreachCompoundTypes.link) {
			return getMappedCompound(content, page);
		}

		if (type === BloomreachCompoundTypes.iconText) {
			return getMappedCompound(content, page);
		}

		if (type === BloomreachCompoundTypes.tileIcon) {
			return getMappedCompound(content, page);
		}
		if (type === BloomreachCompoundTypes.socialTile) {
			return getMappedCompound(content, page);
		}
	});
};
