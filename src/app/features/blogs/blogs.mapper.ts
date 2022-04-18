import {
	linkMap,
	resolveContentValue,
	resolveImageCompound,
} from '@core/bloomreach';
import { Page } from '@bloomreach/spa-sdk';

const BlogsMap = (data: any, page: Page): any => {
	return {
        // ...data
        
		image: data?.thumbImage
			? resolveImageCompound(data?.thumbImage, page)
			: null,
		shortDescription: data?.shortDescription
			? resolveContentValue(data?.shortDescription)
			: null,
		title: data?.title,
		link: data?.blogLink ? linkMap(data.blogLink, page) : null,
		socialShare: data?.socialShare,
		date: data?.date,
		articleType: data.articleType,
	};
};

export const BlogsMapper = (rawData: any, page: Page): any => {
	return rawData?.length
		? rawData.map((blog: any) => BlogsMap(blog, page))
		: null;
};