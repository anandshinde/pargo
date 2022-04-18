export const GlobalUtilityHeaderMapper = (rawData) => ({
	'find-retailer': {
		label: rawData['link.find-a-retailer.label'] || '',
		icon: rawData['link.find-a-retailer.icon'] || '',
	},
	visitor: {
		icon: rawData['link.visitor.icon'] || '',
	},
	cart: {
		icon: rawData['link.cart.icon'] || '',
	},
});
