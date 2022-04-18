import { ProductFacetProps } from '@shared/interfaces';

export const processUrlForShopAndDetail = (url, queryString = null) => {
	if (!url) {
		return null;
	}
	try {
		const string = new URL(url);
		const qs = (!!queryString && encodeURI(queryString)) || null;
		const path = string.pathname
			.split('/')
			.map((p, i, array) =>
				i === array.length - 2 ? `detail/${p.toUpperCase()}` : p
			);
		return `/shop${path.join('/')}${qs ? '?title=' + qs : ''}`;
	} catch (e) {
		return null;
	}
};

export const mapResponseDataToProduct = (
	props: ProductFacetProps[],
	data
): any[] => {
	return props.map((prop) => {
		return {
			...prop,
			value: data[prop.facet],
		};
	});
};

export const reduceResponseDataToProduct = (
	props: ProductFacetProps[],
	data
): any => {
	return props.reduce((res, prop) => {
		return {
			...res,
			[prop.facet]: data[prop.facet],
		};
	}, {});
};

export const getCollectionName = (name: string): string => {
	const removeSpaces = name?.replace(/[\s+]/g, '');
	return name?.includes('mflooring')
		? removeSpaces.split('mflooring')[1].toLowerCase()
		: removeSpaces;
};
