import { ThemeNames } from '../constants';
import { ImageCompoundContent } from './compound-images.interface';
import { RichTextContent } from './compound-rich-text.interface';
import { ImagePositionType } from './general.interface';

export interface IconTextCompoundContentProps {
	text?: RichTextContent;
	displayName?: string;
	image?: ImageCompoundContent;
	name?: string;
}

export interface IconTextCompoundPresentationProps {
	imagePosition?: ImagePositionType;
	theme?: ThemeNames;
}

export interface IconTextCompoundPresentationOutput
	extends IconTextCompoundContentProps {}
