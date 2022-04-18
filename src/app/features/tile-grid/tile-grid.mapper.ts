import {
	linkMap,
	resolveContentValue,
	resolveImageCompound,
	resolveReference,
} from '@core/bloomreach';
import { Page } from '@bloomreach/spa-sdk';

// tslint:disable-next-line: cyclomatic-complexity
const TileGridMap = (data: any, page: Page, index: number): any => {
	const raw = data.$ref ? resolveReference(data, page) : data;

	return {
		index,
		image: !!raw.image ? resolveImageCompound(raw.image, page) : null,
		tileHeading: raw.tileHeading ? resolveContentValue(raw.tileHeading) : null,
		content: raw.content ? resolveContentValue(raw.content) : null,
		link: raw.link ? linkMap(raw.link, page) : null,
		superheading: raw.superHeading ? raw.superHeading : null,
	};
};

export const TileGridMapper = (rawData: any, page: Page): any[] =>
	rawData?.tiles?.length
		? rawData.tiles.map((tile: any, index: number) =>
				TileGridMap(tile, page, index)
		  )
		: null;
