// tslint:disable-next-line: cyclomatic-complexity
import { urlIsExternal } from '@shared/utilities/regex.utilities';

export const GlobalFooterMapper = (rawData) => {
	const urlOrClass = (string, fallback) => {
		const isUrl = urlIsExternal(string);
		return {
			imgUrl: isUrl ? string : null,
			classname: isUrl || !string ? fallback : string,
		};
	};

	return {
		logo: {
			altText: rawData['mflooring.logo.alt'] || 'mflooring Logo',
		},
		copyright: rawData['mflooring.copyright'] || '',
		privacyPolicy: {
			label: rawData['mflooring.privacy-policy.label'] || '',
			url: rawData['mflooring.privacy-policy.url'] || '',
		},
		search: {
			logo: rawData['mflooring.search.class-name'] || 'search',
		},
		socialMedia: {
			instagram: {
				...urlOrClass(rawData['mflooring.instagram.class-name'], 'instagram'),
				url: rawData['mflooring.instagram.url'] || '',
				order: Number(rawData['mflooring.instagram.icon-order']) || 3,
				imgUrl: rawData['mflooring.instagram.imgUrl'] || '',
			},
			facebook: {
				...urlOrClass(rawData['mflooring.facebook.class-name'], 'facebook'),
				url: rawData['mflooring.facebook.url'] || '',
				order: Number(rawData['mflooring.facebook.icon-order']) || 1,
				imgUrl: rawData['mflooring.facebook.imgUrl'] || '',
			},
			twitter: {
				...urlOrClass(rawData['mflooring.twitter.class-name'], 'twitter'),
				url: rawData['mflooring.twitter.url'] || '',
				order: Number(rawData['mflooring.twitter.icon-order']) || 2,
				imgUrl: rawData['mflooring.twitter.imgUrl'] || '',
			},
			youtube: {
				...urlOrClass(rawData['mflooring.youtube.class-name'], 'youtube'),
				url: rawData['mflooring.youtube.url'] || '',
				order: Number(rawData['mflooring.youtube.icon-order']) || 4,
				imgUrl: rawData['mflooring.youtube.imgUrl'] || '',
			},
			// pinterest: {
			// 	...urlOrClass(rawData['mflooring.pinterest.class-name'], 'pinterest'),
			// 	url: rawData['mflooring.pinterest.url'] || '',
			// 	order: Number(rawData['mflooring.pinterest.icon-order']) || 5,
			// 	imgUrl: rawData['mflooring.pinterest.imgUrl'] || '',
			// },
			// houzz: {
			// 	...urlOrClass(rawData['mflooring.houzz.class-name'], 'houzz'),
			// 	url: rawData['mflooring.houzz.url'] || '',
			// 	order: Number(rawData['mflooring.houzz.icon-order']) || 6,
			// 	imgUrl: rawData['mflooring.houzz.imgUrl'] || '',
			// },
		},
	};
};
