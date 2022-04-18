import {
	IconButtonTypes,
	LinkColorType,
	LinkWidthType,
	SizeTypes,
	ThemeType,
} from '@shared/interfaces';
import {
	BrLinkCompoundContent,
	BrLinkCompoundPresentation,
} from '@core/bloomreach/bloomreach-link.interface';

export interface LinkCompoundPresentation extends BrLinkCompoundPresentation {
	theme?: ThemeType;
	buttonWidth?: LinkWidthType;
	buttonSize?: SizeTypes;
	buttonColor?: LinkColorType;
	wrap?: boolean;
	isDisabled?: boolean;
	iconColor?: 'red' | 'white' | 'grey';
	iconSize?: SizeTypes;
	showIcon?: boolean;
  buttonAction?: string;
  inheritFont?: boolean;
}

export interface LinkCompoundContent extends BrLinkCompoundContent {}

export interface LinkCompoundPresentationOutput
	extends LinkCompoundPresentation {
	iconType?: IconButtonTypes | string;
	themeClass?: string;
	typeClass?: string;
	widthClass?: string;
	alignmentClass?: string;
	colorClass?: string;
	iconPositionClass?: string;
}

export interface IconButtonConfig {
	size?: SizeTypes;
	dir?: 'left' | 'right';
	hasBorder?: boolean;
	type?: IconButtonTypes;
}
