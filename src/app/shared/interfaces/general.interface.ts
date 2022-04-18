import {
	ImageCompoundContentProps,
	RichTextContentProps,
	VideoCompoundContentProps,
} from '@shared/interfaces/simple-component-props.interface';
import { RibbonCompoundComponent } from '@shared/components';
import { LinkCompoundColors, LinkCompoundWidths } from '../constants';

export type ThemeType = 'dark' | 'light';
export type ButtonType = 'primary' | 'secondary' | 'link';
export type ButtonAlignment = 'left' | 'center' | 'right';
export type ButtonAction = 'link' | 'submit';
export type ButtonWidth = 'full' | 'normal';
export type ButtonSize = 'large' | 'medium' | 'small';
export type FaqType = 'faq' | 'accordion';
export type RichTextType = 'faq';
export type InputTextType = 'tabbed-content' | 'form';
export type VerticalAlignmentType = 'top' | 'center' | 'bottom';
export type HorizontalAlignmentType = 'left' | 'center' | 'right';
export type VideoWidthType = 'full' | 'half' | 'thumb';
export type SizeType = 'large' | 'small';
export type ImagePositionType = 'top' | 'right' | 'bottom' | 'left' | 'center';
export type OrientationType = 'vertical' | 'horizontal';
export type TitleColorType = 'dark' | 'blue';
export type LinkTypes = 'social' | 'external';

export interface BaseKeyValue {
	key: string;
	value: any;
}

export interface PDPAttributes {
	label: string;
	key: string;
	category: string;
	value?: any;
}

export interface PDPAttributeCategory {
	label: string;
	key: string;
	content: PDPAttributes[];
}

export interface MappedComponents {
	type: string;
	value: {
		content?:
			| ImageCompoundContentProps
			| RichTextContentProps
			| VideoCompoundContentProps
			| RibbonCompoundComponent;
		presentation: any;
	};
}
export type IconButtonTypes =
	| 'red-bordered'
	| 'red-solid'
	| 'grey-bordered'
	| 'grey-solid'
	| 'white-bordered'
	| 'white-solid'
	| 'mixed-bordered'
	| 'mixed-solid';
export type SizeTypes = 'small' | 'medium' | 'large' | 'xlarge';
export type LinkWidthType = LinkCompoundWidths.wide | LinkCompoundWidths.normal;
export type LinkColorType = LinkCompoundColors.normal | LinkCompoundColors.red;
