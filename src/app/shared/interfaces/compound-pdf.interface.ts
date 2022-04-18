// Pdf Compound ===========================================
import { ThemeType } from '@shared/interfaces/general.interface';
import { DocumentRef } from '@core/bloomreach';

export interface PdfCompoundPresentationProps {
	theme: ThemeType;
}

export interface PdfCompound {
	displayName?: string;
	description?: string;
	pdf?: DocumentRef;
	name?: string;
	target?: string;
	url?: string;
}
