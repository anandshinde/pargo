import { BrImageLink } from '@core/bloomreach/bloomreach-image.interface';

export const brxmMapComponentAttributes = (attr: string[], params: any) => {
	if (!attr) {
		return params;
	}
	return attr.reduce((a: any, c: string) => {
		return {
			...a,
			[c]: params[c],
		};
	}, {});
};

export const brxmMapImageUrl = (data: BrImageLink): string => {
	return data.site?.href || '';
};
