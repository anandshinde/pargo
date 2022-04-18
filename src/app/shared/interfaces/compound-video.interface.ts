// Video Compound ===========================================
import { BrRichText } from '@app/core/bloomreach';
import {
	HorizontalAlignmentType,
	ThemeType,
	VideoWidthType,
} from '@shared/interfaces/general.interface';
import { RichTextCompoundComponent } from '../components';

export interface VideoCompoundContentProps {
	url: string;
	transcript: string;
	description: BrRichText;
}

export interface VideoCompoundPresentationProps {
	isInset: boolean;
	position: HorizontalAlignmentType;
	width?: VideoWidthType;
	theme?: ThemeType;
	type?: 'single';
}
