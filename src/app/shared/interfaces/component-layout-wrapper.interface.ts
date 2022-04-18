import { ThemeType } from '@shared/interfaces';
import { ImageCompoundContent } from './compound-images.interface';

export interface LayoutWrapperContent {
	backgroundImage?: ImageCompoundContent;
	backgroundColor?: string;
}

export interface LayoutWrapperPresentation {
	theme?: ThemeType;
	inset?: boolean;
	mobileFullWidth?: boolean;
	hasBackground?: boolean;
}
