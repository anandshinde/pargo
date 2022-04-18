import { FindARetailerFilters } from '@shared/constants/label.constants';


export const getHourPlusMeridian = (time) => {
	if (!time) {
		return 'Closed';
	}

	const split = time.toString().split(':');
	const [hrs, mins] = split;
	const mer = hrs > 11 ? 'PM' : 'AM';

	return `${hrs % 12}${!!mins ? ':' + mins : ''} ${mer}`;
};

export const getHoursOfOperation = (retailer, datePipe) => {
	const date = new Date().toDateString();
	const data =
		retailer.operatingHours.filter((day) => {
			return day.dayOfWeek === datePipe.transform(date, 'EEEE');
		})[0] || null;

	if (!data) {
		return null;
	}


	
	const currentMinute = new Date().getMinutes();

	const openHour = parseInt(data.hours.open?.split(':')[0], 10);
	const openMinute = parseInt(data.hours.open?.split(':')[1], 10);

	const closeHour = parseInt(data.hours.close?.split(':')[0], 10);
	const closeMinute = parseInt(data.hours.close?.split(':')[1], 10);

	
	return {
		status: 'Closed',
		from: !!data.hours.open ? getHourPlusMeridian(data.hours.open) : null,
		to: !!data.hours.open ? getHourPlusMeridian(data.hours.close) : null,
	};
};



export const isIndependentRetailer = (retailer) => {
	if (!retailer) {
		return null;
	}

	const { affiliation } = retailer;

	// remove Home Depot and Lowes
	return (
		!!affiliation &&
		affiliation !== FindARetailerFilters.homedepot.value &&
		affiliation !== FindARetailerFilters.lowes.value
	);
};

export const getRetailerInfo = (retailer) => {
	if (!retailer) {
		return null;
	}

	return (
		retailer.dealerID +
		'/' +
		retailer.storeName.replace(/ /g, '-').replace(/'/g, '')
	);
};

export const getRetailerInfoURL = (retailer, window) => {
	if (!retailer) {
		return null;
	}

	const {
		location: { pathname },
	} = window;
	return `${pathname}/${getRetailerInfo(retailer)}`;
};

export const getDisplayPhone = (value) => {
	const phone = value.replace(/[()\-\s]/g, '');
	return `${phone.slice(1, 4)}-${phone.slice(4, 7)}-${phone.slice(7)}`;
};

export const separateRetailerEmails = (emails: string) => {
	if (!emails) {
		return;
	}
	const dealerEmails = emails?.split(';');

	if (dealerEmails && dealerEmails[0] === '') {
		return [];
	} else {
		return dealerEmails;
	}
};

export const getAlternateRetailer = (retailer, type): any => {
	const affiliation = retailer.affiliation.replace(/\s/g, '').toLowerCase();
	return type.replace(/\s/g, '').toLowerCase() === 'lowes'
		? affiliation === 'homedepot'
		: affiliation === 'lowes';
};
