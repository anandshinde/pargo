import { Page } from '@bloomreach/spa-sdk';

import {
	BloomreachCompoundTypes,
	linkMap,
	resolveContentValue,
	resolveImageCompound,
	resolvePdfCompound,
	resolveSqFtCalc,
	resolveVideoCompound,
} from '@core/bloomreach';
import {
	ColumnRatios,
	RichTextTypes,
	ThemeNames,
	VertAlignmentNames,
} from '@shared/constants';

export const faqMapper = (tab: any, page: Page) => {
	const answer: any[] = tab?.answerCollapsedContent || [];
	const title: any = tab?.content || null;

	const richText = title ? richTextMapper(title) : null;

	// [panel] is used to determine which FAQ panel to open
	return {
		content: {
			hideCaret: !tab?.caret,
			title: {
				color: tab?.color || ThemeNames.dark,
				content: richText,
				panel: richText?.richText.replace(/(<([^>]+)>)/gi, ''),
				alignment: tab?.alignment,
        icon: tab?.iconContent,
				presentation: {
					type: tab.tabStyle || RichTextTypes.faq,
				},
			},
			collapsed: answer.map((compound) => {
				switch (getCompoundType(compound)) {
					case BloomreachCompoundTypes.twoColumn:
						return {
							type: BloomreachCompoundTypes.twoColumn,
							value: twoColumnMapper(compound, page),
						};
					case BloomreachCompoundTypes.threeColumn:
						return {
							type: BloomreachCompoundTypes.threeColumn,
							value: threeColumnMapper(compound, page),
						};
					case BloomreachCompoundTypes.title:
						return {
							type: BloomreachCompoundTypes.title,
							value: titleMapper(compound, page),
						};
					case BloomreachCompoundTypes.quote:
						return {
							type: BloomreachCompoundTypes.quote,
							value: quoteMapper(compound, page),
						};
          case BloomreachCompoundTypes.pdfItem:
            return {
              type: BloomreachCompoundTypes.pdfItem,
              value: pdfItemMapper(compound, page),
            };
					default:
						return getMappedCompound(compound, page);
				}
			}),
		},
		presentation: {
			type: tab?.tabStyle || RichTextTypes.faq,
		},
    isFaq: true
	};
};

export const richTextMapper = (rawText: any): any => {
	const richText = resolveContentValue(rawText);
	return !rawText?.value
		? null
		: {
				richText,
		  };
};

export const twoColumnMapper = (payload: any, page: Page) => {
	return {
		leftColumn: payload.leftColumn.map((column) => {
			return getMappedCompound(column, page);
		}),
		rightColumn: payload.rightColumn.map((column) => {
			return getMappedCompound(column, page);
		}),
		presentation: {
			theme: ThemeNames.dark,
			vertAlign: payload.vertAlign || VertAlignmentNames.middle,
			ratio: payload.ratio || ColumnRatios['5050'],
			border: payload.border || false,
		},
	};
};

export const threeColumnMapper = (payload: any, page: Page) => {
	return {
		leftColumn: payload.leftColumn.map((column) => {
			return getMappedCompound(column, page);
		}),
		middleColumn: payload.middleColumn.map((column) => {
			return getMappedCompound(column, page);
		}),
		rightColumn: payload.rightColumn.map((column) => {
			return getMappedCompound(column, page);
		}),
		content: {
			description: getMappedCompound(payload.description, page).value,
			title: getMappedCompound(payload.title, page).value,
		},
		presentation: {
			theme: ThemeNames.light,
			vertAlign: payload.vertAlign || VertAlignmentNames.middle,
			//	ratio: payload.ratio || '5050',
		},
	};
};

export const fourColumnMapper = (payload: any, page: Page) => {
	return {
		firstColumn: payload.firstColumn.map((column) => {
			return getMappedCompound(column, page);
		}),
		secondColumn: payload.secondColumn.map((column) => {
			return getMappedCompound(column, page);
		}),
		thirdColumn: payload.thirdColumn.map((column) => {
			return getMappedCompound(column, page);
		}),
		fourthColumn: payload.fourthColumn.map((column) => {
			return getMappedCompound(column, page);
		}),
		content: {
			description: getMappedCompound(payload.description, page).value,
			title: getMappedCompound(payload.title, page).value,
		},
		presentation: {
			theme: ThemeNames.light,
			vertAlign: payload.vertAlign || VertAlignmentNames.middle,
			//	ratio: payload.ratio || '5050',
		},
	};
};
export const titleMapper = (payload: any, page: Page) => {
	return {
		type: payload?.contentType,
		heading: payload?.heading,
		description: payload?.description,
		superHeading: payload?.superHeading,
		template: payload?.template,
		linkCompound: payload?.linkCompound,
		line: payload?.linkCompound,
		presentation: {
			template: payload?.template,
		},
	};
};

export const quoteMapper = (payload: any, page: Page) => {
	return {
		type: payload?.contentType,
		image: {
			...payload?.imageCompound,
			...{ imageDAMUrl: payload?.imageCompound.imageDAM },
		},
		richText: payload?.html,
		presentation: {
			template: payload?.template,
			overlaptop: payload?.overlaptop,
		},
	};
};

export const tileIconMapper = (payload: any, page: Page) => {
	return {
		type: payload?.contentType,
		iconImage: {
			...payload?.imageCompound,
			...{ imageDAMUrl: payload?.imageCompound.imageDAM },
		},
		tiledescription: payload?.html,
		linkCompound: payload?.linkCompound,
		presentation: {
			theme: payload?.theme || ThemeNames.dark,
		},
	};
};

export const pdfItemMapper = (payload: any, page: Page) => {
  return {
    type: payload?.contentType,
    title: payload?.pdfTitle,
    pdfvariationCompound: [...payload?.pdfvariationCompound],
    segments: [],
    subjects: [],
    presentation: {
			theme: payload?.theme || ThemeNames.dark,
		},
  }
};

export const getMappedCompound = (
	compound: any,
	page: Page
): { type: string; value: { content?: any; presentation: any } } => {
	const type = getCompoundType(compound);
	switch (type) {
		case BloomreachCompoundTypes.image:
			return {
				type,
				value: {
					content: {
						image: resolveImageCompound(compound, page),
					},
					presentation: {
						theme: ThemeNames.light,
					},
				},
			};
		case BloomreachCompoundTypes.link:
			const link = linkMap(compound, page);
			return {
				type,
				value: {
					content: link.content,
					presentation: {
						...link.presentation,
						theme: compound.theme || ThemeNames.light,
					},
				},
			};
		case BloomreachCompoundTypes.richText:
			return {
				type,
				value: {
					content: richTextMapper(compound),
					presentation: {
						theme: compound.theme || ThemeNames.light,
					},
				},
			};
		case BloomreachCompoundTypes.pdfDownload:
			const content = !!compound?.url
				? {
						url: compound?.url,
						description: compound?.pdfTitle,
				  }
				: resolvePdfCompound(compound, page);

			return {
				type,
				value: {
					content,
					presentation: {
						theme: compound.theme || ThemeNames.light,
					},
				},
			};
		case BloomreachCompoundTypes.iconText:
			return {
				type,
				value: {
					content: {
						text: richTextMapper(compound?.content),
						image: {
							image: resolveImageCompound(compound?.image, page),
						},
					},
					presentation: {
						imagePosition: compound?.position,
						theme: compound.theme || ThemeNames.light,
					},
				},
			};
		case BloomreachCompoundTypes.tileText:
			return {
				type,
				value: {
					content: {
						text: richTextMapper(compound?.tileText),
						image: {
							image: resolveImageCompound(compound?.tileImage, page),
						},
					},
					presentation: {
						imagePosition: compound?.position,
						theme: compound.theme || ThemeNames.light,
						verticalLocation: compound?.verticalLocation,
						horizontalLocation: compound?.horizontalLocation,
						size:compound?.size || 'large'
					},
				},
			};
		case BloomreachCompoundTypes.video:
			return {
				type,
				value: {
					content: resolveVideoCompound(compound),
					presentation: {
						theme: compound.theme || ThemeNames.light,
					},
				},
			};
		case BloomreachCompoundTypes.sqftCalculator:
			return {
				type,
				value: {
					presentation: {
						theme: compound.theme || ThemeNames.light,
						...resolveSqFtCalc(compound),
					},
				},
			};
		case BloomreachCompoundTypes.ctaRibbon:
			return {
				type,
				value: {
					content: {
						ctaBackground: compound.ctaBackground,
						ctaContent: richTextMapper(compound?.ctaContent),
						link: linkMap(compound.link, page),
						logo: resolveImageCompound(compound.logo, page),
					},
					presentation: {
						theme: compound.theme || ThemeNames.dark,
					},
				},
			};
		case BloomreachCompoundTypes.tileIcon:
			return {
				type,
				value: {
					content: {
						iconImage: resolveImageCompound(compound?.iconImage, page),
						tiledescription: richTextMapper(compound?.tiledescription),
						linkCompound: linkMap(compound?.linkCompound, page),
					},
					presentation: {
						theme: compound?.theme || ThemeNames.dark,
					},
				},
			};
		case BloomreachCompoundTypes.socialTile:
			return {
				type,
				value: {
					content: {
						tagline: compound?.tagline,
					},
					presentation: {
						theme: compound?.theme || ThemeNames.dark,
					},
				},
			};
		case BloomreachCompoundTypes.imageCarousel:
			return {
				type,
				value: {
					content: {
						images: compound?.imageCompound?.map((image) => {
							return getMappedCompound(image, page);
						}),
					},
					presentation: {
						theme: compound?.theme || ThemeNames.light,
					},
				},
			};
			case BloomreachCompoundTypes.productImage:
			return {
				type,
				value: {
					content: {
						productName: compound?.collection,
						productColor: compound?.color,
						productImage: resolveImageCompound(compound?.imageCompound, page),
						productUrl: linkMap(compound?.productUrl, page),
					},
					presentation: {
						theme: compound?.theme || ThemeNames.light,
					},
				},
			};
	}
};

export const getCompoundType = (payload) => {
	const contentType = payload?.contentType;
	if (!!contentType) {
		return contentType;
	} else {
		if (payload.hasOwnProperty('imageBRE')) {
			return BloomreachCompoundTypes.image;
		}
		if (contentType === 'FAQCompound' || payload.hasOwnProperty('caret')) {
			return BloomreachCompoundTypes.faq;
		}
		if (payload.hasOwnProperty('value')) {
			return BloomreachCompoundTypes.richText;
		}
		if (payload.hasOwnProperty('link')) {
			return BloomreachCompoundTypes.link;
		}
		if (payload.hasOwnProperty('image') && payload.hasOwnProperty('content')) {
			return BloomreachCompoundTypes.iconText;
		}
		if (
			payload.hasOwnProperty('tileImage') &&
			payload.hasOwnProperty('tileText')
		) {
			return BloomreachCompoundTypes.tileText;
		}
		if (contentType === 'PDFDownloadCompound') {
			return BloomreachCompoundTypes.pdfDownload;
		}
		if (contentType === 'VideoCompound') {
			return BloomreachCompoundTypes.video;
		}
		if (contentType === 'TwoColumnCompound') {
			return BloomreachCompoundTypes.twoColumn;
		}
		if (
			contentType === 'ThreeColumnCompound' ||
			payload.hasOwnProperty('middleColumn')
		) {
			return BloomreachCompoundTypes.threeColumn;
		}
		if (contentType === 'FourColumnCompound') {
			return BloomreachCompoundTypes.fourColumn;
		}
		if (contentType === 'TileCompound') {
			return BloomreachCompoundTypes.title;
		}
		if (contentType === 'QuoteCompound') {
			return BloomreachCompoundTypes.quote;
		}
		if (contentType === 'SqFtCalculatorCompound') {
			return BloomreachCompoundTypes.sqftCalculator;
		}
	}
};
