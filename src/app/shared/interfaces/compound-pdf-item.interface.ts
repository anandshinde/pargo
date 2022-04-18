// Pdf Compound ===========================================
import { ThemeType } from '@shared/interfaces/general.interface';
import { DocumentRef } from '@core/bloomreach';

export interface PdfItemCompoundPresentationProps {
	theme: ThemeType;
}

export interface PdfItemCompound {
	displayName?: string;
	title?: string;
	language?: PdfItemVariation;
	segments?: [];
	subjects?: [];
}

export interface PdfItemVariation {
  contentType?: "brxm:PDFVariationCompound";
  displayName?: string;
	name?: string;
  damURL?: string;
  downloadURL?: string;
  staticdropdown: string;
}
