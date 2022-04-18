// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const baseCmsUrl = 'https://staging-cmsapi.mohawkind.com/site';

export const environment = {
	production: false,
	brxmBase: baseCmsUrl,
	cmsBaseUrl: baseCmsUrl + '/mf',
	spaBaseUrl: '',
	apiBaseUrl: '${base_url_pending}/api/v1',
	seachApiBaseUrl: 'https://staging-core.dxpapi.com/api/v1/core/',
	mohawkgroupApiBaseURL: 'https://api.mohawkgroup.com/api/v1',
	mohawkflooringApiBaseURL: '${base_url_pending}/mohawkflooring/api/v1',
	googleApiKey: 'AIzaSyAmNbIp69cLdNF4icAxOHq0_YP3eonRQoI',
	brsmBaseUrl: 'https://staging-core.dxpapi.com/api/v1/core',
	searchParams: {
		account_id: '6458',
		auth_key: '7btuechtrabxo429',
		domain_key: 'mohawk_mohawkflooring',
		br_br_uid_2Uid2: 'uid=3845851455278:v=11.8:ts=1593476694088:hc=1384',
		request_id: '8084974705362',
	},
	productApiBaseURL:
		'https://staging-core.dxpapi.com/api/v1/core/?account_id=6458&auth_key=7btuechtrabxo429&url=www.bloomique.com',
	autosuggestApi:
		'https://staging-suggest.dxpapi.com/api/v2/suggest/?account_id=6458&auth_key=7btuechtrabxo429&domain_key=mohawk_mohawkflooring',
	adobeDataLayerURL:
		'//assets.adobedtm.com/13496781d41f/b9bd22ab52ce/launch-96184724ee09-development.min.js',
	cartURL: 'https://localhost:9002/rest/v2/mohawkflooring/users/',
	locationURL:
		'https://api.channelsight.com/api/1.30/location?key=0933d91b-caa7-4f3d-8f70-3164a64776f3&assetId=1164&pid=',
	productFeedURL:
		'https://api.channelsight.com/api/1.30/feed?key=0933d91b-caa7-4f3d-8f70-3164a64776f3&assetId=1160&pid=',
	realTimeURL:
		'https://api.channelsight.com/api/1.30/realtimelookup?key=0933d91b-caa7-4f3d-8f70-3164a64776f3&pid=',
	birdeyeReviewURL: 'https://api.birdeye.com/resources/v1/review/businessId/',
	birdeyeApiKey: 'KdnkaKp1WpfMHRhUgQc5AcbwjYebHqO9',
	birdeyeApiKey2: 'vjifUcoOgEVttC37AjVoOBvow7S0Ml4d',
	birdeyeApiKey3: 'PwvCwoFKt54Ht2ZzIN8XHmVRmNNQ5MZz',
	bazaarVoice: {
		baseURL: 'https://stg.api.bazaarvoice.com/data',
		passkey: 'caL24KEEQaqBE0WNBJYdelQNLBGbSutSSXyYqs9dtzw9U',
		fingerprint: '10.230.200.4',
		// PassKey: caqhGXLjgQKqX1Q9sfRLI3rdbR6KghTQKRXiV1vxhjAnY for http://api.bazaarvoice.com/data
	},
	onDemand: {
		baseUrl:
			'https://api.cjjsup9vs1-mohawkcar1-s1-public.model-t.cc.commerce.ondemand.com',
		apiUser: '/services/v2/mohawkflooring/users/',
		apiAuth: '/authorizationserver/oauth/token',
		apiForgotPwd: '/services/v2/mohawkflooring/forgottenpasswordtokens?userId=',
		apiResetPwd: '/services/v2/mohawkflooring/resetpassword',
		apiVerifyEmail: '/api/v1/authentication/validate/',
		clientId: 'mohawkflooring',
		secret: 'Mohawk@123',
		type: 'client_credentials',
		grant_types: {
			client: 'client_credentials',
			refresh: 'refresh_token',
			password: 'password',
		},
	},
	visualizerTokenEndpoint: '/api/v1/authentication/visualizer/',
	stripeKey: 'pk_test_AEQmBJ5Qcm6tHdW7joybsmZe',
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
