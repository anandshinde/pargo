interface PositionConfig {
	enableHighAccuracy?: boolean;
	maximumAge?: number;
	timeout?: number;
}

interface Position {
	latitude: number;
	longitude: number;
}

const getCurrentPosition = (config: PositionConfig) => {
	return new Promise((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(
			({ coords: { latitude, longitude } }) => {
				resolve({ latitude, longitude });
			},
			(error) => {
				reject(error);
			},
			config
		);
	});
};

const getZipCodeFromPosition = (position: Position) => {
	const { latitude, longitude } = position;

	return new Promise((resolve, reject) => {
		const location = new google.maps.LatLng(latitude, longitude);
		const geocoder = new google.maps.Geocoder();

		geocoder.geocode({ location }, (response, status) => {
			if (status === google.maps.GeocoderStatus.OK) {
				const [address] = response;
				const { short_name: zip } = address['address_components']
					.reverse()
					.find((item) => item['types'][0] === 'postal_code');

				resolve(zip);
			} else {
				reject(response);
			}
		});
	});
};

export { getCurrentPosition, getZipCodeFromPosition };
