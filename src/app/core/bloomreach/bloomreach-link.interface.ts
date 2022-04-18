import { IconButtonTypes } from '@shared/interfaces';

export interface BrLinkCompound {
	name?: string;
	displayName?: string;
	alignment?: string;
	button?: string;
	iconStroke?: string;
	icon?: string;
	link?: any;
	url?: string;
	target?: string;
	text?: string;
	contentType?: 'brxm:LinkCompound';
}

export interface BrLinkCompoundPresentation {
	buttonType?: string;
	textAlign?: string;
	iconStroke?: string;
	iconPosition?: string;
}

export interface BrLinkCompoundContent {
	link?: any;
	target?: string;
	text?: string;
	url?: string;
}

export interface BrLinkCompoundFormatted {
	presentation: BrLinkCompoundPresentation;
	content: BrLinkCompoundContent;
}
