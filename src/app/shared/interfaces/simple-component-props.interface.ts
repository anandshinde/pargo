import { SwiperOptions } from 'swiper';

import { HorizAlignment, ThemeTypes } from '@shared/constants';

import { Page } from '@bloomreach/spa-sdk';
import {
	ButtonAlignment,
	ButtonType,
	ButtonWidth,
	ButtonSize,
	ThemeType,
	FaqType,
	InputTextType,
	RichTextType,
	SizeType,
	HorizontalAlignmentType,
	VerticalAlignmentType,
	ImagePositionType,
	VideoWidthType,
	TitleColorType,
} from './general.interface';

import { Retailer, Product } from './featured-component-props.interface';

import {
	LinkCompound,
	ImageModel,
	DocumentContent,
	ImageProps,
} from './bloomreach.interface';
import { ImageContent } from './compound-images.interface';

// INTERFACES

// Layout Wrapper
export interface LayoutWrapperPresentationProps {
	theme?: ThemeType;
	isInset?: boolean;
	stackMobile?: boolean;
	isWideAspect?: boolean;
	alignment?: HorizAlignment;
}

export interface LayoutWrapperContentProps {
	mobileImage?: ImageModel;
	desktopImage?: ImageModel;
	backgroundColor?: string;
	imageBg?:ImageContent;
	imageMobile?:ImageContent;
}

export interface LayoutWrapperProps {
	content: LayoutWrapperContentProps;
	presentation: LayoutWrapperPresentationProps;
}
// mflooring Logo ===========================================
export interface LogoPresentationProps {
	theme?: ThemeType;
}

export interface LogoContentProps {
	altText?: string;
}

// Rich Text ===========================================
export interface RichTextPresentationProps {
	theme?: ThemeType;
	component?: string;
	type?: RichTextType;
	heightLimit?: string;
}

export interface RichTextContentProps {
	richText?: string;
}

export interface RichTextProps {
	content?: RichTextContentProps;
	presentation?: RichTextPresentationProps;
}

// Link Compound ===========================================
export interface LinkCompoundPresentationProps {
	theme?: ThemeType;
	buttonType?: ButtonType;
	buttonWidth?: ButtonWidth;
	buttonSize?: ButtonSize;
	buttonAction?: string;
	alignment?: ButtonAlignment;
	noWrap?: boolean;
	hasArrow?: boolean;
	isDisabled?: boolean;
}

export interface LinkCompoundContentProps extends LinkCompound {}

// Image Compound ===========================================
export interface ImageCompoundPresentationProps {
	theme?: ThemeType;
	size?: 'initial' | 'square' | 'fill';
	isBackground?: boolean;
}

export interface ImageCompoundContentProps {
	desktop?: ImageModel;
	mobile?: ImageModel;
}

// Carousel Wrapper ===========================================
export interface CarouselWrapperContentProps {
	config?: SwiperOptions;
}

export interface CarouselWrapperPresentationProps {
	config: SwiperOptions;
	bulletSize?: SizeType;
	stackMobile?: boolean;
	theme?: ThemeType;
	navigation?: boolean;
}

// Footer ===========================================
export interface FooterCopyrightPresentationProps {
	theme?: ThemeType;
}

export interface FooterCopyrightContentProps {
	copyright?: string;
	privacyPolicy?: {
		label: string;
		url: string;
	};
	socialMedia?:any
}

// Simple Banner ===========================================
export interface SimpleBannerPresentationProps {
	theme?: ThemeType;
	inset?: boolean;
	stackMobile?: boolean;
	alignment?: HorizAlignment;
}

// Form Input: text ===========================================
export interface InputTextContentProps {
	placeholder?: string;
	icon?: string;
	name?: string;
	label?: string;
	type?: string;
	maxlength?: string;
}

export interface InputTextPresentationProps {
	theme?: ThemeType;
	hasIcon?: boolean;
	iconFirst?: boolean;
	type?: InputTextType;
}

// FAQ Compound ===========================================
export interface FaqCompoundContentProps {
	index?: number;
	hideCaret?: boolean;
	title?: {
		color?: TitleColorType;
		content?: RichTextContentProps;
		panel?: string;
		presentation?: RichTextPresentationProps;
		alignment?: HorizontalAlignmentType;
	};
	collapsed?: any[];
	// TODO: Should contain any type of content
	// collapsed?: {
	// 	content?: RichTextContentProps[];
	// 	presentation?: RichTextPresentationProps;
	// };
}

export interface FaqCompoundPresentationProps {
	theme?: ThemeType;
	type?: FaqType;
}

// Video Compound ===========================================
export interface VideoCompoundContentProps {
	url: string;
	transcript: string;
}

export interface VideoCompoundPresentationProps {
	isInset: boolean;
	position: HorizontalAlignmentType;
	width?: VideoWidthType;
	theme?: ThemeType;
	type?: 'single';
}

// Two Column Compound ===========================================
export interface TwoColumnCompoundContentProps {
	index?: number;
	leftColumn?: any[];
	rightColumn?: any[];
	name?: string;
}

export interface TwoColumnCompoundPresentationProps {
	theme?: ThemeType;
	ratio?: string;
	vertAlign?: VerticalAlignmentType;
	vertMargin?: SizeType;
	border?: boolean;
}

// Pdf Compound ===========================================
export interface PdfCompoundPresentationProps {
	theme: ThemeType;
}

// IconText Compound ===========================================
export interface IconTextCompoundPresentationProps {
	imagePosition?: ImagePositionType;
	theme?: ThemeType;
}

export interface IconTextCompoundContentProps {
	text?: RichTextContentProps;
	displayName?: string;
	image?: ImageCompoundContentProps;
	name?: string;
}

// Three Column Compound ===========================================
export interface ThreeColumnCompoundContentProps {
	leftColumn?: any[];
	middleColumn?: any[];
	rightColumn?: any[];
	title?: string;
	description?: string;
}

export interface ThreeColumnCompoundPresentationProps {
	theme?: ThemeType;
	vertMargin?: SizeType;
	//ratio?: string;
	//vertAlign: 'top' | 'center' | 'bottom';
}

// Form Input: Radio Button ===========================================
export interface RadioButtonContentProps {
	label: string;
	value: any;
}

export interface RadioButtonPresentationProps {
	theme?: ThemeType;
	orientation?: OrientationType;
}

// Select Filter Compound ===========================================
export interface SelectFilterContentProps {
	category: string;
}

export interface SelectFilterPresentationProps {
	theme?: ThemeType;
}

// Text Tile Compound ===========================================
export interface TextTileContentProps {
	image: ImageCompoundContentProps;
	text: RichTextContentProps;
}

export interface TextTilePresentationProps {
	theme?: ThemeTypes;
}

// Floor Finder Props ===========================================
export interface FloorFinderResultProps {
	allProductContent?: any;
	pageContent?: Page;
	results?: any;
}

export interface FloorFinderMainProps {
	intro?: any;
	categoryList?: any[];
}

// Message Bar Props ===========================================
export interface MessageBarProps {
	message?: any;
	color?: string;
	isError?: boolean;
	autoClose?: boolean;
	duration?: number;
}

// Find Retailer Results Props ===========================================
export interface FindRetailerResultsProps {
	retailers?: Retailer[];
	zip?: number | string;
}

// Find Retailer Query String Config ===========================================
export interface FindRetailerQueryStringConfig {
	zip: number;
	dealerType: string;
	distance: number;
	limit: number;
	sale: string;
	minimumRating: number;
	forceDistance: string;
	brandGroupCodes: string[];
	groupCodes: string[];
}

export interface MyRetailerStoredData {
	affiliation: string;
	id: number;
	latitude: number;
	longitude: number;
	name: string;
	address: string;
	city: string;
	state: string;
	zip: string | number;
	reviewCount?: number;
	reviewRating?: number;
	alternate?: any;
}

export interface PasswordRequirementsProps {
	case?: boolean;
	special?: boolean;
	numeric?: boolean;
	length?: boolean;
}

export interface ProductResultsProps {
	products?: Product[];
	query?: string;
}

export interface VisualizeCollectionCtaProps {
	content: DocumentContent;
	displayName: string;
	image: ImageProps;
	name: string;
	position: string;
}

export interface ShopCollectionCtaProps {
	alignment: string;
	button: string;
	displayName: string;
	link: string;
	name: string;
	target: string;
	text: string;
	type: string;
	url: string;
}

export interface QuizLogicProps {
	color: string[];
	displayName: string;
	diyLevel: string;
	feature: string[];
	look: string[];
	name: string;
	room: string[];
}

export interface ProductCollectionProps {
	channel: string;
	collectionName: string;
	collection_logo: string;
	dimensions: DocumentContent;
	displayName: string;
	diyLevel: string;
	id: string;
	installation: DocumentContent;
	keyBenefits: string;
	localeString: string;
	name: string;
	pdpCollectionContent: any[];
	productType: string;
	quizLogic: QuizLogicProps;
	shopCollectionCTA: ShopCollectionCtaProps;
	sku: string;
	visualizeCollectionCTA: VisualizeCollectionCtaProps;
}
