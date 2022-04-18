import { BrPdf, DocumentRef } from './bloomreach.interface';
import { BrImageComponent } from './bloomreach-image.interface';
import { Component, Page, Reference, Content } from '@bloomreach/spa-sdk';
import { BrLinkCompound, BrLinkCompoundFormatted } from './bloomreach-link.interface';


export const resolveImageCompound = (
	data: BrImageComponent,
	page: Page
): any => {
	if (!data) {
		return null;
	}

	const imageBRE: any = !!data.imageBRE
		? page?.getContent<Content>(data.imageBRE)?.getData<any>()
		: null;

	return {
		contentType: 'brxm:ImageCompound',
		altText: data.altText,
		link: data.link,
		title: data.title,
		imageBRE,
		imageDAMUrl: data.imageDAM,
	};
};
export const linkMap = (data, page): BrLinkCompoundFormatted => {
	const raw: BrLinkCompound = data.$ref ? resolveReference(data, page) : data;
	return {
		presentation: {
			buttonType: raw.button,
			textAlign: raw.alignment,
			iconStroke: raw.iconStroke,
			iconPosition: raw.icon,
		},
		content: {
			link: raw.link,
			target: raw.target,
			text: raw.text,
			url: raw.url,
		},
	};
};

export const resolveContentValue = (data: { value: string }) => {
	return !!data ? data?.value : '';
};

export const resolveReference = (ref: DocumentRef, page: Page): any => {
	return !!ref ? page?.getContent<Content>(ref)?.getData() : undefined;
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
		description: resolveContentValue(data?.description),
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