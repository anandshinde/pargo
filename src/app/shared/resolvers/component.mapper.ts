import { Page } from "@bloomreach/spa-sdk";
import {
  CompoundTypes,
  RichTextTypes,
  ThemeTypes,
  VertAlignment,
  ButtonAlignment,
} from "@shared/constants";
import { RichTextContentProps } from "@shared/interfaces";
import {
  linkMap,
  resolveContentValue,
  resolveImageCompound,
  resolvePdfCompound,
  resolveSqFtCalc,
  resolveVideoCompound,
} from "@shared/resolvers/compound.resolver";

export const faqMapper = (tab: any, page: Page) => {
  const answer: any[] = tab?.answerCollapsedContent || [];
  const title: any = tab?.content || null;

  const richText = title ? richTextMapper(title) : null;

  // [panel] is used to determine which FAQ panel to open

  return {
    content: {
      hideCaret: !tab?.caret,
      title: {
        color: tab?.color || ThemeTypes.dark,
        content: richText,
        panel: richText?.richText.replace(/(<([^>]+)>)/gi, ""),
        alignment: tab?.alignment,
        presentation: {
          type: tab.tabStyle || RichTextTypes.faq,
        },
      },
      collapsed: answer.map((compound) => {
        switch (getCompoundType(compound)) {
          case CompoundTypes.twoColumn:
            return {
              type: CompoundTypes.twoColumn,
              value: twoColumnMapper(compound, page),
            };
          case CompoundTypes.image: {
            const src = resolveImageCompound(compound, page);
            if (!src) {
              return null;
            }

            const content = { desktop: src, mobile: src };
            const presentation = { theme: ThemeTypes.light };

            return {
              type: CompoundTypes.image,
              value: { content, presentation },
            };
          }

          case CompoundTypes.threeColumn:
            return {
              type: CompoundTypes.threeColumn,
              value: threeColumnMapper(compound, page),
            };
          default:
            return getMappedCompound(compound, page);
        }
      }),
    },
    presentation: {
      type: tab?.tabStyle || RichTextTypes.faq,
    },
  };
};

export const richTextMapper = (rawText: any): RichTextContentProps => {
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
      theme: ThemeTypes.dark,
      vertAlign: payload.vertAlign || VertAlignment.center,
      ratio: payload.ratio || "5050",
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
      theme: ThemeTypes.light,
      vertAlign: payload.vertAlign || VertAlignment.center,
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
      theme: ThemeTypes.light,
      vertAlign: payload.vertAlign || VertAlignment.center,
      //	ratio: payload.ratio || '5050',
    },
  };
};

export const getMappedCompound = (
  compound: any,
  page: Page
): { type: string; value: { content?: any; presentation: any } } => {
  const type = getCompoundType(compound);

  switch (type) {
    case CompoundTypes.image:
      return {
        type,
        value: {
          content: {
            desktop: resolveImageCompound(compound, page),
          },
          presentation: {
            theme: ThemeTypes.light,
          },
        },
      };
    case CompoundTypes.link:
      const { button, link, target, text, url, alignment } = linkMap(
        compound,
        page
      );
      return {
        type,
        value: {
          content: {
            link,
            target,
            text,
            url,
          },
          presentation: {
            buttonType: button,
            theme: compound.theme || ThemeTypes.light,
            alignment: alignment || ButtonAlignment.left,
          },
        },
      };
    case CompoundTypes.richText:
      return {
        type,
        value: {
          content: richTextMapper(compound),
          presentation: {
            theme: compound.theme || ThemeTypes.light,
          },
        },
      };
    case CompoundTypes.pdfDownload:
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
            theme: compound.theme || ThemeTypes.light,
          },
        },
      };
    case CompoundTypes.iconText:
      return {
        type,
        value: {
          content: {
            text: richTextMapper(compound?.content),
            image: {
              desktop: resolveImageCompound(compound?.image, page),
            },
          },
          presentation: {
            imagePosition: compound?.position,
            theme: compound.theme || ThemeTypes.light,
          },
        },
      };
    case CompoundTypes.tileText:
      return {
        type,
        value: {
          content: {
            text: richTextMapper(compound?.tileText),
            image: {
              desktop: resolveImageCompound(compound?.tileImage, page),
            },
          },
          presentation: {
            imagePosition: compound?.position,
            theme: compound.theme || ThemeTypes.light,
          },
        },
      };
    case CompoundTypes.video:
      return {
        type,
        value: {
          content: resolveVideoCompound(compound),
          presentation: {
            theme: compound.theme || ThemeTypes.light,
          },
        },
      };
    case CompoundTypes.sqftCalculator:
      return {
        type,
        value: {
          presentation: {
            theme: compound.theme || ThemeTypes.light,
            ...resolveSqFtCalc(compound),
          },
        },
      };
    case CompoundTypes.ctaRibbon:
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
            theme: compound.theme || ThemeTypes.dark,
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
    if (payload.hasOwnProperty("imageBRE")) {
      return CompoundTypes.image;
    }
    if (contentType === "FAQCompound" || payload.hasOwnProperty("caret")) {
      return CompoundTypes.faq;
    }
    if (payload.hasOwnProperty("value")) {
      return CompoundTypes.richText;
    }
    if (payload.hasOwnProperty("link")) {
      return CompoundTypes.link;
    }
    if (payload.hasOwnProperty("image") && payload.hasOwnProperty("content")) {
      return CompoundTypes.iconText;
    }
    if (
      payload.hasOwnProperty("tileImage") &&
      payload.hasOwnProperty("tileText")
    ) {
      return CompoundTypes.tileText;
    }
    if (contentType === "PDFDownloadCompound") {
      return CompoundTypes.pdfDownload;
    }
    if (contentType === "VideoCompound") {
      return CompoundTypes.video;
    }
    if (contentType === "TwoColumnCompound") {
      return CompoundTypes.twoColumn;
    }
    if (
      contentType === "ThreeColumnCompound" ||
      payload.hasOwnProperty("middleColumn")
    ) {
      return CompoundTypes.threeColumn;
    }
    if (contentType === "FourColumnCompound") {
      return CompoundTypes.fourColumn;
    }
    if (contentType === "SqFtCalculatorCompound") {
      return CompoundTypes.sqftCalculator;
    }
  }
};
