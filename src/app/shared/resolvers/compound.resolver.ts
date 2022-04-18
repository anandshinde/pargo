import { BrImage, BrPdf, ImageModel } from '@shared/interfaces';
import { Component, Page, Reference } from '@bloomreach/spa-sdk';

export const resolveImage = (image: BrImage) => {
	const { size, height, width, _links } = image;
	return {
		size,
		height,
		width,
		url: _links.site.href,
	};
};

export const resolveImageCompound = (data: any, page: any): ImageModel => {
	const imageData = {
		altText: data.altText,
		link: data.link,
		title: data.title,
	};

	const ref = data.$ref ? data : data.imageBRE;

	if (!!data.imageDAM) {
		return {
			...imageData,
			original: {
				url: data.imageDAM,
			},
		};
	}

	const image = ref ? page?.getContent(ref)?.getData() : null;

	return !!image
		? {
				...imageData,
				original: resolveImage(image.original),
		  }
		: null;
};

export const resolveContentValue = (data: { value: string }) => {
	return data?.value;
};

export const resolveReference = ({ rawVal, page }): any => {
	const content = rawVal ? page?.getContent(rawVal) : undefined;
	return content ? content.getData() : undefined;
};

export const linkMap = (data, page) => {
	const raw = data.$ref ? resolveReference({ rawVal: data, page }) : data;
	return {
		button: raw.button,
		link: raw.link ? linkMap(raw.link, page) : null,
		target: raw.target,
		text: raw.text,
		url: raw.url,
		alignment: raw.alignment,
	};
};

export const resolvePdfCompound = (data, page) => {
	const ref = data.$ref ? data : data.pdf;
	const pdf = ref ? page?.getContent(ref)?.getData() : null;

	return resolvePdf(pdf);
};

export const resolvePdf = (pdf: BrPdf) => {
	return {
		name: pdf?.name,
		fileName: pdf?.displayName,
		url: pdf?._links?.site?.href,
		description: pdf?.description,
		displayName: pdf?.displayName,
	};
};

export const resolveVideoCompound = (data) => {
	return {
		url: data?.damVideo,
		transcript: data?.transcript,
	};
};

export const resolveSqFtCalc = (data) => {
	return {
		showCalculator: data?.sqftcalc,
	};
};

export const resolveResourceBundleArray = (data: any[], page) => {
	return data.reduce((a, bundle) => {
		const bundleData = page.getContent(bundle).getData();
		return {
			...a,
			...bundleData.keys.reduce(
				(a, c, i) => ({
					...a,
					[c]: bundleData.messages[i],
				}),
				{}
			),
		};
	}, {});
};

export const resolveItemsInPagination = (data: Component, page: Page) => {
	const items: Reference[] = data.getModels()?.pagination?.items;
	return items.reduce((a, c) => {
		const d = page.getContent(c).getData();
		const key = d.collectionName;
		return [...a, d];
	}, []);
};
