export interface BrxmPdfVariationCompound {
	name: 'brxm:PDFVariationCompound';
	displayName: 'brxm:PDFVariationCompound';
	staticdropdown: string;
	damURL: string;
	downloadURL: string;
	contentType: 'brxm:PDFVariationCompound';
}

export interface BrxmPdfItemCompound {
	displayName: string;
	pdfTitle: string;
	subjects: string[];
	segments: string[];
	pdfvariationCompound: BrxmPdfVariationCompound[];
	contentType: 'brxm:PDFItemCompound';
}

export interface BrxmPdfListingParams {
	heading: string;
	simple: boolean;
}

export interface BrxmPdfItemParams {
	isSimple: boolean;
}

export interface BrxmPdfListingComponent {
	name: string;
	displayName: string;
	pdfItems: BrxmPdfItemCompound[];
	localeString: string;
	contentType: 'brxm:PDFListingDocument';
}

export interface PdfListingItemLanguage {
  downloadURL: string;
  damURL: string;
}
