export enum mflooringIconPaths {
	pageMetaDataLogo = '/site/binaries/content/gallery/pe-en-us/icons/mflooring.png',
}

export const PageMetaDataTitleDefault = 'Mflooring';

export const PageMetaDataDefaults = {
	keywords: PageMetaDataTitleDefault,
	description: PageMetaDataTitleDefault,
	'og:title': PageMetaDataTitleDefault,
	'og:description': PageMetaDataTitleDefault,
	'twitter:image': mflooringIconPaths.pageMetaDataLogo,
	'og:image': mflooringIconPaths.pageMetaDataLogo,
};

export enum breakpoints {
	mobileMax = '(max-width: 810px)',
}

export enum Colors {
	greyLight = '#eeeeee',
	greyMedium = '#cccdce',
	brownLight = '#423939',
	brownMedium = '$color-brown-light-rgb',
	teal = '$color-teal',
	black = '#000000',
	white = '#fff',
	red = '#ff0000',
	green = '#64D875',
}

export enum ContainerWidth {
	content = 960,
}

export enum ThemeTypes {
	light = 'light',
	dark = 'dark',
}

export enum BasicSizes {
	small = 'small',
	medium = 'medium',
	large = 'large',
}

export enum FaqTypes {
	faq = 'faq',
	accordion = 'accordion',
}

export enum RichTextTypes {
	faq = 'faq',
}

export enum ButtonTypes {
	primary = 'primary',
	secondary = 'secondary',
	link = 'link',
}

export enum ButtonWidth {
	normal = 'normal',
	full = 'full',
}

export enum ButtonAction {
	link = 'link',
	submit = 'submit',
}

export enum BannerVariants {
	single = 'singleBanner',
	carousel = 'carouselBanner',
	randomized = 'randomizedBanner',
}

export enum HorizAlignment {
	left = 'left',
	center = 'center',
	right = 'right',
}

export enum VertAlignment {
	top = 'top',
	center = 'center',
	bottom = 'bottom',
}

export enum CompoundTypes {
	image = 'brxm:ImageCompound',
	faq = 'brxm:FAQCompound',
	richText = 'hippostd:html',
	link = 'brxm:LinkCompound',
	iconText = 'brxm:IconTextCompound',
	pdfDownload = 'brxm:PDFDownloadCompound',
	twoColumn = 'brxm:TwoColumnCompound',
	threeColumn = 'brxm:ThreeColumnCompound',
	fourColumn = 'brxm:FourColumnCompound',
	video = 'brxm:VideoCompound',
	sqftCalculator = 'brxm:SqFtCalculatorCompound',
	tileText = 'brxm:TileTextCompound',
	ctaRibbon = 'brxm:CTARibbonCompound',
}

export enum ButtonAlignment {
	left = 'left',
	center = 'center',
	right = 'right',
}

export enum LinkTargetTypes {
	blank = '_blank',
	self = '_self',
}

export enum InputTextTypes {
	tabbedContent = 'tabbed-content',
	form = 'form',
}
export const TwoColumnRatios = {
	5050: 'fifty-fifty',
	4060: 'forty-sixty',
	6040: 'sixty-forty',
};

export const CartPosition = {
	top: 40,
	right: 2,
};

export enum BreakpointValues {
	mobileMax = '(max-width: 810px)',
	mobileMin = '(min-width: 811px)',
}

export enum BreakpointNumbers {
	mobile = 811,
	desktop = 992,
}

export enum ContainerWidthValues {
	content = 960,
}

export enum BaseColorValues {
	greyLight = '#909090',
	greyDark = '#2e2a24',
	redDark = '#c8102e',
	black = '#000000',
	white = '#fff',
	error = '#ff0000',
	success = '#64D875',
}

export enum LinkTargetValues {
	blank = '_blank',
	self = '_self',
}

export enum BaseColorNames {
	grey = 'grey',
	red = 'red',
	white = 'white',
	black = 'black',
}

export enum FillNames {
	solid = 'solid',
	outline = 'outline',
}

export enum ThemeNames {
	light = 'light',
	dark = 'dark',
}

export enum BaseSizeNames {
	xsmall = 'xsmall',
	small = 'small',
	medium = 'medium',
	large = 'large',
	xlarge = 'xlarge',
}

export enum HorizAlignmentNames {
	left = 'left',
	center = 'center',
	right = 'right',
}

export enum VertAlignmentNames {
	top = 'top',
	middle = 'middle',
	bottom = 'bottom',
}

export enum ContentPositionNames {
	top = 'top',
	right = 'right',
	bottom = 'bottom',
	left = 'left',
	center = 'center',
}

export enum LogoSizes {
	verysmall = '20px',
	small = '25px',
	medium = '35px',
	large = '45px',
	xlarge = '75px',
}
