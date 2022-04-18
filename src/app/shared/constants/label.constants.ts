export enum StaticLabels {
	server_exception = 'Server Exception. Please try again',
	success_message = 'Changes Saved',
	email = 'Email',
	submit = ' SUBMIT',
}

export const FindARetailerDialog = {
	placeholder: 'Enter Zip Code',
	submit: 'Search',
	instructions: 'Search for all retailers in your ZIP code',
	geolocatorLabel: 'Use Current Location',
};

export const FindARetailerFilters = {
	all: {
		value: 'all',
		label: 'View All',
		count: 0,
	},
	independent: {
		value: 'independent',
		label: 'Independent',
		count: 0,
	},
	homedepot: {
		value: 'homedepot',
		label: 'The Home Depot',
		count: 0,
	},
	lowes: {
		value: 'lowes',
		label: 'Lowes',
		count: 0,
	},
};

export const FindARetailerFiltersEdge = {
	nearestlocation: {
		value: 'nearestlocation',
		label: 'Nearest Location',
		count: 0,
	},
	featuredretailers: {
		value: 'featuredretailers',
		label: 'Featured Retailers',
		count: 0,
	}
};

export const monthsOfYear = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
];
export const daysOfWeek = [
	'Sunday',
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday',
];

export const ProductDetailTabs = {
	collection: 'The Collection',
	reviews: 'Customer Reviews',
	specs: 'Specifications',
	warranty: 'Warranty and Install',
	visualizer: 'Visualize It',
};

export const ProductDetailReviewFilters = {
	ratingFromHighest: 'Highest to Lowest Rating',
	ratingFromLowest: 'Lowest to Highest Rating',
	timeFromHighest: 'Most Recent',
};

export const CartDialog = {
	add: 'Sample Added',
	title: 'Sample Bag',
	navigate: 'View Cart',
	product: 'Samples',
	total: 'Total',
	viewProduct: 'View Samples',
};

export const RetailerDetails = {
	selected: 'My Retailer',
	unselected: 'Make This My Retailer',
};
