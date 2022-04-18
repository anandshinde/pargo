// BLOOMREACH COMPONENTS

// Component Names
export enum BloomreachComponentNames {
	banner = 'dynamic-banner',
	recentContent = 'dynamic-recent-content',
	mainMenu = 'dynamic-main-menu',
	footerMenu = 'dynamic-footer-menu',
	pageMetadata = 'dynamic-page-metadata',
	tabbedContent = 'dynamic-tabbed-content',
	richContent = 'dynamic-rich-content',
	utilityMenu = 'dynamic-utility-menu',
	tileGrid = 'dynamic-tilegrid',
	imageGallery = 'dynamic-image-gallery',
	trendCollection = 'dynamic-trend-collection',
	floorFinder = 'dynamic-floor-finder',
	createAccount = 'dynamic-create-account',
	login = 'dynamic-login',
	findRetailer = 'dynamic-retailer-search-results',
	forgotPassword = 'dynamic-forgot-password',
	myAccount = 'dynamic-my-account',
	breadcrumbs = 'dynamic-breadcrumbs',
	productDetail = 'dynamic-product-detail',
	productListing = 'dynamic-product-listing',
	retailerDetail = 'dynamic-retailer-detail',
	productSearchResults = 'dynamic-product-search-results',
	visualizer = 'dynamic-visualizer',
	contactUs = 'dynamic-contact-us',
	myCart = 'dynamic-my-cart',
	checkout = 'dynamic-checkout',
	cardComponent = 'dynamic-card-component',
	featuredContent = 'dynamic-featured-content',
	contactUsForm = 'dynamic-contact-us-form',
	pdfListing = 'dynamic-pdf-listing',
}

// Component Names
export enum BloomreachComponentTypes {
	contentList = 'brxm:ContentList',
	banner = 'brxm:bannerdocument',
}

// BLOOMREACH COMPOUND TYPES

export enum BloomreachCompoundTypes {
	image = 'brxm:ImageCompound',
	faq = 'brxm:FAQCompound',
	richText = 'hippostd:html',
	link = 'brxm:LinkCompound',
	iconText = 'brxm:IconTextCompound',
	pdfDownload = 'brxm:PDFDownloadCompound',
	twoColumn = 'brxm:TwoColumnCompound',
	title = 'brxm:TitleCompound',
	quote = 'brxm:QuoteCompound',
	threeColumn = 'brxm:ThreeColumnCompound',
	fourColumn = 'brxm:FourColumnCompound',
	video = 'brxm:VideoCompound',
	sqftCalculator = 'brxm:SqFtCalculatorCompound',
	tileText = 'brxm:TileTextCompound',
	ctaRibbon = 'brxm:CTARibbonCompound',
	tileIcon = 'brxm:TileIconCompound',
	socialTile = 'brxm:SocialTile',
	pdfItem = 'brxm:PDFItemCompound',
	pdfVariation = 'brxm:PDFVariationCompound',
	imageCarousel = 'brxm:ImageCarousel',
	productImage = 'brxm:ProductImageCompound',
}

export enum BloomreachContentTypes {
	image = 'hippogallery:image',
}

/** BRXM COMPONENT ATTRIBUTES
 *
 * @summary these are the attributes associated with each component from BloomreachComponentTypes.
 *  These should all match what is provided from the CMS. Please update accordingly
 *
 */

export const ComponentAttributeMap = {
	[BloomreachComponentNames.banner]: [
		'alignment',
		'include-redline',
		'shape',
		'template',
		'vertical-alignment',
		'size',
	],
	[BloomreachComponentNames.recentContent]: [
		'heading',
		'pageSize',
		'scope',
		'template',
		'greybackground',
	],
	[BloomreachComponentNames.tileGrid]: ['template', 'flipped'],
	[BloomreachComponentNames.pageMetadata]: [
		'canonical-url',
		'description',
		'image',
		'include-in-sitemap',
		'meta-description',
		'meta-keywords',
		'meta-title',
		'no-follow',
		'no-index',
		'title',
	],
	[BloomreachComponentNames.mainMenu]: ['menu'],
};
