export const GlobalMainHeaderMapper = (rawData) => ({
	logo: {
		alt: rawData['mflooring.logo.alt'] || 'mflooring Logo',
	},
	search: {
		icon: rawData['mflooring.search-icon'] || 'search',
	},
	hamburger: {
		icon: rawData['mflooring.hamburger-icon'] || 'hamburger',
	},
	close: {
		icon: rawData['mflooring.close-icon'] || 'close',
	},
});
