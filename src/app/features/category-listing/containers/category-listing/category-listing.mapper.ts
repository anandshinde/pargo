import { resolveReference } from '@app/core/bloomreach';
import { Page } from '@bloomreach/spa-sdk';

const categoryListMap = (data: any, params, page) => {
	const bannerData = '$ref' in data ? resolveReference(data, page) : data;
return bannerData;
}
export const CategoryListingMapper = (
	rawData: any,
	params: any,
	page: Page,
): any => {
    return categoryListMap(rawData, params, page)
};