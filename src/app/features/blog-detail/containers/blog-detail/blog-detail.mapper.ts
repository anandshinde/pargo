import {
	getCompoundType,
	getMappedCompound,
} from '@app/shared/mappers/component.mapper';
import { Page } from '@bloomreach/spa-sdk';
import {
	BloomreachCompoundTypes,
	resolveContentValue,
	resolveImageCompound,
	resolveReference,
} from '@core/bloomreach';

const getDate = (timestamp: number) => {
	const date = new Date(timestamp);
	const dateFormat: Intl.DateTimeFormatOptions = {
		month: 'long',
		day: 'numeric',
		year: 'numeric',
	};
	const timeFormat: Intl.DateTimeFormatOptions = {
		hour: 'numeric',
		minute: 'numeric',
	};
	return {
		value:
			date.toLocaleDateString('en-US', dateFormat)
	};
};

const BlogContentMap = (data: any, page: Page) => {
	return data.map((content) => {
		const type = getCompoundType(content);
		if (type === BloomreachCompoundTypes.richText) {
			return getMappedCompound(content, page);
		}

		if (type === BloomreachCompoundTypes.image) {
			return getMappedCompound(content, page);
		}

		if (type === BloomreachCompoundTypes.productImage) {
	
			return getMappedCompound(content, page);
		}

		if (type === BloomreachCompoundTypes.video) {
			return getMappedCompound(content, page);
		}

		if (type === BloomreachCompoundTypes.link) {
			return getMappedCompound(content, page);
		}
		return null;
	});
};

const BlogListMap = (data: any, page: Page): any => {
	return data.map((document) => {
		const blogData = resolveReference(document, page);
		return {
			title: blogData?.title ? blogData?.title : null,
			description: blogData?.shortDescription
				? getMappedCompound(blogData?.shortDescription, page)
				: null,
			image: blogData?.thumbImage
				? resolveImageCompound(blogData?.thumbImage, page)
				: null,
			link: blogData?.blogLink ? getMappedCompound(blogData?.blogLink, page) : null,
			date: blogData?.date ? resolveContentValue(getDate(blogData?.date)) : null,
			productImage: blogData?.shortDescription
				? getMappedCompound(blogData?.shortDescription, page)
				: null,
		};
	});
};

const BlogDetailMap = (data: any, page: Page): any => {
	return {
		title: data?.title ? data?.title : null,
		description: data?.shortDescription
				? getMappedCompound(data?.shortDescription, page)
				: null,
		author: data?.author ? data?.author : null,
		award: data?.award ? data?.award : null,
		date: data?.date ? resolveContentValue(getDate(data?.date)) : null,
		readTime: data?.readTime ? data?.readTime : null,
		socialShare: data?.socialShare !== null ? data?.socialShare : false,
		superHeading: data?.superHeading ? data?.superHeading : null,
		image: data?.thumbImage
			? resolveImageCompound(data?.thumbImage, page)
			: null,
		content: data?.blogContent ? BlogContentMap(data?.blogContent, page) : [],
		blogList: data?.relateddocuments
			? BlogListMap(data?.relateddocuments, page)
			: [],
	};
};

export const BlogDetailMapper = (rawData: any, page: Page): any => {
	return !!rawData ? BlogDetailMap(rawData, page) : null;
};
