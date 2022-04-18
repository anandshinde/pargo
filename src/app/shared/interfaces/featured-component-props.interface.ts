import {
	FaqCompoundContentProps,
	FaqCompoundPresentationProps,
	ImageCompoundContentProps,
	RadioButtonContentProps,
} from './simple-component-props.interface';

import {
	DocumentRef,
	BrLink,
	ImageModel,
	LinkCompound,
} from './bloomreach.interface';

import { HorizAlignment } from '@shared/constants';

import { VisualizerProductData } from './visualizer.interface';
import { Observable } from 'rxjs';

export interface BannerProps {
	productIcons?: ImageModel[];
	id?: string;
	bannerContent?: string;
	bannerLinks?: LinkCompound[];
	banner?: BannerProps[];
	tiles?: any[];
	color?: string;
	imageBg?: ImageModel;
	imageBgMobile?: ImageModel;
	includeColor?: boolean;
	logo?: ImageModel;
	title?: string;
	alignment?: HorizAlignment;
}
export interface BannerContentInterface extends BannerProps {
	banners?: BannerProps[];
}

export interface TileGridProps {
	index?: number;
	content?: string;
	image?: {
		altText?: string;
		link?: string;
		src?: string;
		title?: string;
	};
	link?: BrLink;
}

export interface TabbedTabProps {
	index?: number;
	label?: string;
	iconContent?: ImageCompoundContentProps;
	faq?: {
		content?: FaqCompoundContentProps[];
		presentation?: FaqCompoundPresentationProps;
	};
}

export interface PdfCompound {
	displayName?: string;
	description?: string;
	pdf?: DocumentRef;
	name?: string;
	target?: string;
	url?: string;
}
export interface GalleryFormExpansionProps {
	category: string;
	formControlName: string;
	options: RadioButtonContentProps[];
}

export interface GalleryFormExpansionPresentation {
	panelHeaderHeight?: string;
	orientation?: string;
}

export interface GalleryFormSelectProps {
	category: string;
	formControlName: string;
	options: RadioButtonContentProps[];
}

export interface GalleryFiltersProps {
	filterLabel: string;
}
export interface CategoryProps {
	index?: number;
	category?: string;
	icon?: ImageCompoundContentProps;
	categoryOptions?: any[];
	categorySelect?: boolean;
}
export interface CategoryItemProps {
	index?: number;
	text?: string;
	background?: ImageModel;
}

export interface RetailerFilterProps {
	value: string;
	label: string;
	count: number;
}

export interface RetailerFilters {
	all: RetailerFilterProps;
	homedepot: RetailerFilterProps;
	lowes: RetailerFilterProps;
	independent: RetailerFilterProps;
}

export interface RetailerRating {
	reviewCount: number;
	avgRating: number;
	baseUrl: string;
}

export interface RetailerAppoinmentDetails {
	message: string;
	success: boolean;
}

export interface RetailerQuoteDetails {
	retailerQuote: object;
}

export interface RetailerReviewerProps {
	firstName: string;
	lastName: string;
	nickName: string;
	thumbnailUrl: string;
	emailId: {};
	facebookId: {};
	city: {};
	state: {};
	customerId: {};
}
export interface RetailerReviewProps {
	reviewId: string;
	rating: number;
	Rating: number;
	comments: string;
	Comments: string;
	title: {};
	reviewer: RetailerReviewerProps;
	reviewUrl: string;
	sourceType: string;
	reviewDate: string;
	response: {};
	responseDate: {};
	featured: number;
	businessId: string;
	uniqueReviewUrl: string;
	businessName: string;
	businessType: string;
	tags: {};
	status: string;
}

export interface RetailerOperatingHours {
	dayOfWeek: string;
	hours: {
		open: string;
		close: string;
	};
	OpenDay: string;
	CloseDay: string;
}

export interface RetailerOffers {
	offerID: string;
	offerName: string;
	storeType: string;
}

export interface Retailer {
	description: string;
	logoUrl: string;
	facebookUrl: string;
	storeWebsiteUrl: string;
	twitterUrl: string;
	flickrUrl: string;
	youTubeUrl: string;
	blogUrl: string;
	pinterestUrl: string;
	instagramUrl: string;
	houzzUrl: string;
	googlePlusUrl: string;
	metaDescription: string;
	metaKeywords: string;
	pageTitle: string;
	reviews: RetailerReviewProps[];
	reviewSiteUri: string;
	dealerID: number;
	dealerNumber: string;
	shipto: string;
	storeName: string;
	address1: string;
	address2: string;
	address3: string;
	city: string;
	state: string;
	zip: string;
	phone: string;
	affiliation: string;
	affiliationCode: string;
	fiveStar: string;
	platinum: string;
	saleParticipating: string;
	karastanSaleParticipating: string;
	saleIsActive: string;
	latitude: number;
	longitude: number;
	dealerUrl: string;
	storeUrl: string;
	dealerEmail: string;
	distance: number;
	clickToCallPhone: string;
	dealerOfferings: string[];
	operatingHours: RetailerOperatingHours[];
	offers: RetailerOffers[];
	weeklyHours: RetailerOperatingHours[];
	premier: string;
	birdeyebusinessid: number;
	edgeSelect: true;
	edgePremier: true;
	averageRating: number;
	reviewCount: number;
	mohawkConsumerFinance: true;
	karastanConsumerFinance: true;
	birdEyeUrl?: string;
	directions?: string;
	marker?: string;
	currentHours?: any;
	independent?: any;
	collections?: any;
}

export interface RetailerResponse {
	DealerType: string;
	Zip: string;
	Limit: string;
	Offset: string;
	Errors: string;
	Miles: number;
	Sale: string;
	Dealers: Retailer[];
}

/// PRODUCTS

// Variant interface from response
export interface ProductVariantResponse {
	bullet_description1: string[];
	bullet_description2: string[];
	bullet_description3: string[];
	collection_name: string[];
	color_family: string[];
	feature: string[];
	finish: string[];
	installation_level: string[];
	item_number: string[];
	look_visual: string[];
	manufacturer_product_url: string[];
	pdp_url?: string;
	plank_length: string[];
	plank_width: string[];
	product_description: string[];
	retailer: string[];
	room_scene: string[];
	shade: string[];
	sku_color: string;
	sku_price: number;
	sku_swatch_images: string[];
	sku_thumb_images: string[];
	skuid: string;
	sq_ft_per_carton: string[];
	status: string[];
	variant_availability: string[];
	visualizer_img1: string[];
	visualizer_img2: string[];
	visualizer_img3: string[];
	visualizer_img4: string[];
	visualizer_img5: string[];
	visualizer_img6: string[];
	visualizer_img7: string[];
	visualizer_img8: string[];
	visualizer_img9: string[];
	visualizer_img10: string[];
	wood: string[];
}
// Product interface from response
export interface ProductResponse {
	ac_rating: string;
	actual_hickness: string;
	brand: string;
	collection_name: string;
	color_family: string;
	composition: string;
	edge_treatment: string;
	manufacturer_product_url: string;
	pid: string;
	plan_locking_system: string;
	plank_length: string;
	product_description: string;
	product_type: string;
	retailer: string;
	room_scene: string;
	skuid: string;
	sq_ft_per_carton: string;
	title: string;
	underlayment: string;
	variant_availability: string;
	variants: ProductVariantResponse[];
	wood: string;
}

export interface ProductSearchResponse {
	category_map: any;
	did_you_mean: any;
	facet_counts: any;
	response: {
		docs: ProductResponse[];
		numFound: number;
		start: number;
	};
}

export interface PLPVariant {
	collection_name: string[];
	feature: string[];
	finish: string[];
	install_method: string[];
	installation_level: string[];
	item_number: string[];
	look_visual: string[];
	manufacturer_product_url: string[];
	product_description: string[];
	sku_color: string;
	sku_swatch_images: string[];
	sku_thumb_images: string[];
	skuid: string;
	status: string[];
	shade: string[];
	pdp_url: string;
	room_scene: any[];
	swatches: any[];
	room: any[];
}

export interface PLPProduct {
	products?: any[];
	brand?: string;
	collection_logo?: string;
	collection_name?: string[];
	composition?: string;
	description?: string;
	feature?: any[];
	finish?: string[];
	installation?: string;
	installation_level?: string[];
	item_number: string[];
	look_visual?: string[];
	manufacturer_product_url?: string[];
	pdp_url?: string;
	pid?: string;
	plan_locking_system?: string;
	price?: string;
	product_description?: string[];
	product_family?: string;
	product_type?: string;
	room_scene?: string[];
	shade?: string[];
	skuid?: string;
	sku_color?: string;
	sku_swatch_images?: string[];
	status?: string[];
	thumb_image?: string;
	title?: string;
	type?: string;
	variants?: PLPVariant[];
}

export interface PLPProductVariant {
	sku_swatch_images: string[];
	sku_thumb_images: string[];
	skuid: string;
	product_description: string;
}

export interface PLPProductVariant {
	sku_swatch_images: string[];
	sku_thumb_images: string[];
	skuid: string;
	product_description: string;
	// look_visual: string;
}

export interface ProductVariant {
	sku_swatch_images: string[];
	sku_thumb_images: string[];
	skuid: string;
	sku_color: string;
	plank_width: number;
	plank_length: number;
	visualizer_image1?: string;
	visualizer_image2?: string;
	visualizer_image3?: string;
	visualizer_image4?: string;
	visualizer_image5?: string;
	visualizer_image6?: string;
	visualizer_image7?: string;
	visualizer_image8?: string;
	visualizer_image9?: string;
	visualizer_image10?: string;
	visualizer_data: VisualizerProductData;
	look_visual: string;
}

export interface PDPAsset {
	url: string;
	mimeType: string;
	name: string;
}

export interface PDPSwatchItem {
	title: string;
	item_number: string;
	sku_color: string;
	manufacturer_product_url: string;
	sku_swatch_images: string;
	isSelected?: boolean;
}

export interface PDPAssets {
	roomscene: PDPAsset[];
	caremaintenance: PDPAsset[];
	installation: PDPAsset[];
	swatch: PDPAsset[];
}

export interface PDPVariant {
	ac_rating?: string;
	actual_hickness?: string;
	asset_resource_descriptor?: string[];
	asset_resource_dynamic_media_url?: string[];
	asset_resource_mime_type?: string[];
	asset_resource_name?: string[];
	asset_active?: string[];
	brand?: string;
	color_family?: string[];
	collectionKey: string;
	swatches?: PDPSwatchItem[];
	edge_treatment?: string;
	feature: string[];
	install_method?: string[];
	installation_level?: string[];
	item_number?: string[];
	look_visual?: string[];
	manufacturer_product_url?: string[];
	plank_length?: string[];
	plank_width?: string[];
	product_description?: string[];
	product_family?: string;
	product_type?: string;
	product_url?: string[];
	retailer?: string[];
	room_scene?: string[];
	shade?: string[];
	sku_color: string;
	sku_ids?: string[];
	sku_price?: number;
	sku_sale_price: number;
	sku_swatch_images?: string[];
	sku_thumb_images?: string[];
	skuid: string;
	sq_ft_per_carton?: string[];
	status?: string[];
	thumb_image?: string;
	title?: string;
	underlayment?: string;
	variant_availability?: string[];
	visualizer_img1?: string[];
	visualizer_img2?: string[];
	visualizer_img3?: string[];
	visualizer_img4?: string[];
	visualizer_img5?: string[];
	visualizer_img6?: string[];
	visualizer_img7?: string[];
	visualizer_img8?: string[];
	visualizer_img9?: string[];
	visualizer_img10?: string[];
	wood?: string[];
	visualizer_data: VisualizerProductData;
}

export interface PDPProduct {
	ac_rating?: string;
	actual_hickness?: string;
	brand?: string;
	color_family?: string;
	composition?: string;
	collection_name?: string;
	edge_treatment?: string;
	look_visual?: string;
	manufacturer_product_url?: string;
	pid?: string;
	plank?: string;
	plank_length?: string;
	plank_width?: string;
	price?: number;
	price_range?: number[];
	product_description?: string;
	product_family?: string;
	product_type?: string;
	retailer?: string;
	room_scene?: string;
	sale_price?: number;
	sale_price_range?: number[];
	skuid?: string;
	sq_ft_per_carton?: string;
	thumb_image?: string;
	title?: string;
	underlayment?: string;
	variant_availability?: string;
	visualizer_data?: VisualizerProductData;
}

export interface PDPProductResponse extends PDPProduct {
	variants: PDPVariant[];
}

export interface StoredPPDProduct {
	[key: string]: PDPVariant;
}

export interface PDPGeneralInfoProps {
	brand?: string;
	bullet_description1: string[];
	bullet_description2: string[];
	bullet_description3: string[];
	collectionKey?: string;
	collection_logo?: string;
	collection_name?: string[];
	feature?: any[];
	feature_icons?: any[];
	item_number?: string[];
	manufacturer_product_url?: string[];
	pid?: string[];
	product_description?: string[];
	product_type?: string;
	product_url?: string[];
	retailer?: string[];
	sku_price?: string[];
	sku_color?: string[];
	sku_ids?: string[];
	skuid?: string;
	status?: string[];
	title?: string;
	variant_availability?: string[];
}

export interface PDPDetail {
	assets: PDPAssets;
	swatches: PDPSwatchItem[];
	specs: ProductCategoryProps[];
	install: ProductCategoryProps[];
	general: PDPGeneralInfoProps | null;
	imageViewer: {
		room_scene: string[];
	};
}

export interface ProductDetail {
	brand: string;
	description: string;
	pid: string;
	price: number;
	sale_price: number;
	skuid: string;
	thumb_image: string;
	title: string;
	url: string;
	actual_hickness: string;
	variants: ProductVariant[];
	reviews: any[];
}

export interface ProductDetailResponse {
	category_map: any;
	did_you_mean: any;
	facet_counts: any;
	response: {
		docs: ProductResponse[];
		numFound: number;
		start: number;
	};
}

export interface AutoSuggestResponse {
	queryContext: {
		originalQuery: string;
	};
	suggestionGroups: [
		{
			searchSuggestions: Product[];
		}
	];
}

export interface Product {
	salePrice: number;
	price: number;
	description: string;
	title: string;
	url: string;
	brand: string;
	pid: string;
	image: string;
	collection_name?: string;
}

export interface VisualizerProductResponse {
	response: PDPProduct[];
	facet_counts: string;
}

export interface ProductFilters {
	color: ProductFilterProps;
	collection: ProductFilterProps;
	model: ProductFilterProps;
	type: ProductFilterProps;
}

export interface ProductFilterProps {
	count: number;
	name: string;
}

export interface RetailerCouponDetails {
	retailerCoupon: object;
}

export interface ProductFacetProps {
	label: string;
	facet: string;
	type?: string[];
	category: string;
	value: any;
}

export interface ProductCategoryProps {
	key?: string;
	label: string;
	category: string;
	content: any;
	items: ProductFacetProps[];
}

export interface CollectionProductProps {
	ac_rating: string;
	actual_hickness: string;
	brand: string;
	collection_logo: string;
	collection_name: string[];
	color_family: string[];
	composition: string;
	feature: string[];
	finish: string[];
	installation_level: string[];
	item_number: string[];
	look_visual: string[];
	manufacturer_product_url: string[];
	pdp_url: string;
	pid: string;
	plan_locking_system: string;
	plank_length: string[];
	plank_width: string[];
	product_description: string[];
	product_type: string;
	retailer: string[];
	room_scene: string[];
	shade: string[];
	sku_color: string;
	sku_price: 5;
	sku_swatch_images: string[];
	sku_thumb_images: string[];
	skuid: string;
	sq_ft_per_carton: string[];
	status: string[];
	title: string;
	underlayment: string;
	variant_availability: string[];
	visualizer_img1: string[];
	visualizer_img2: string[];
	visualizer_img3: string[];
	visualizer_img4: string[];
	visualizer_img5: string[];
	visualizer_img6: string[];
	visualizer_img7: string[];
	visualizer_img8: string[];
	visualizer_img9: string[];
	visualizer_img10: string[];
	wood: string[];
}

export interface CollectionProps {
	key: string;
	logo: string;
	products: CollectionProductProps[];
	featureIcons: any[];
}

export interface StoredCollectionProps {
	key: string;
	logo: string;
	products: string[];
}

export interface LocationCS {
	Address: string;
	DistanceMeters: string;
	GooglePlaceId: string;
	Latitude: number;
	LocationId: number;
	Longitude: number;
	PhoneNumber: number;
	RetailerId: string;
	RetailerLocationAddress: string;
	RetailerLocationCity: string;
	RetailerLocationName: string;
	RetailerLocationPostalCode: string;
	RetailerLogoUrl: string;
	RetailerName: string;
	Realtimeprice?: any;
	availability?: any;
}

export interface RealTimeRate {
	availability: string;
	stockin: string;
}
export interface ChannelSiteRetailerStockPrices {
	IsDefault: boolean;
	LastUpdatedAt: string;
	Price: number;
	Stock: string;
	StockLevel: string | number;
}

export interface ChannelSightRetailerSupportedLanguages {
	CountryCode: string;
	CultureCode: string;
	LanguageName: string;
}

export interface ChannelSiteRetailerProduct {
	AdhocDataAttributes: any[];
	ClickThruUrl: string;
	FriendlyName: string;
	IsLocalized: boolean;
	LocationId: number;
	MatchId: string;
	OtherURLs: null;
	RetailerActive: boolean;
	RetailerAddress: string;
	RetailerCountry: string;
	RetailerCurrency: string;
	RetailerCurrencySeparator: string;
	RetailerCurrencySymbol: string;
	RetailerCurrencyThousandsSeparator: string;
	RetailerGroupId: string;
	RetailerId: string;
	RetailerLogoUrl: string;
	RetailerMetaData: any[];
	RetailerName: string;
	RetailerProductDescription: string;
	RetailerProductName: string;
	RetailerSite: string;
	StockPrices: ChannelSiteRetailerStockPrices[];
	SupportedLanguages: ChannelSightRetailerSupportedLanguages[];
}

export interface ChannelSiteFeedResponse {
	Brand: string;
	Categories: any[];
	Id: string;
	LocalizedDescriptions: any[];
	MainImageAltText: string;
	MainImageUrl: string;
	ManufacturerId: string;
	ManufacturerImages: any[];
	ManufacturerName: string;
	MetaData: any;
	ProductDescription: null;
	ProductId: string;
	ProductIdentifiers: string[];
	ProductName: string;
	ProductUrl: string;
	RetailerProducts: ChannelSiteRetailerProduct[];
	RetailerLogo?: string;
	MailingAddress?: {
		address: string;
		city: string;
		state: string;
		zip: number;
	};
}

export interface ChannelSightRetailerInfo {
	Independent: boolean;
	FriendlyName: string;
	UtterlyOutOfStock: boolean;
	ProductRetailerMatch: boolean;
	Price: number;
	RetailerAddress: {
		address: string;
		city: string;
		state: string;
		zip: string;
	};
	Ratings: {
		reviewCount: number;
		reviewRating: number;
	};
	ProductRetailerLogo?: string;
	RetailerLogoUrl: string;
	RetailerCurrencySymbol: string;
	Stock: string;
	StockLevel: string;
}

export interface ChannelSightProductFeed {
	ResourceBundleText?: any;
	SelectedRetailer: boolean;
	ProductRetailer: string;
	FriendlyName: string;
	MailingAddress: {
		address: string;
		city: string;
		state: string;
		zip: string;
	};
	ProductRetailerMatch: boolean;
	Ratings: {
		reviewCount: number;
		reviewRating: number;
	};
	RetailerLogoUrl: string;
	UtterlyOutOfStock: boolean;
	IndependentProduct: boolean;
	IndependentRetailer: boolean;
}
