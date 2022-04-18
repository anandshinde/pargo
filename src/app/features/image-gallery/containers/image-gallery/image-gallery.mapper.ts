import { ThemeTypes } from '@app/shared/constants';
import {
	linkMap,
	resolveImageCompound,
} from '@app/shared/resolvers/compound.resolver';
import { Page } from '@bloomreach/spa-sdk';

export const ImageGalleryMapper = (rawData: any, page: Page) => {
	if (!rawData?.gallery) {
		return [];
	}

	return GalleryMapper(rawData.gallery, page).filter(
		({ image }: any) => !!image
	);
};

export const ImageGalleryFiltersMapper = (
	galleryCategoriesData: any,
	galleryResourceBundleData: any
) => {
	return Object.entries(galleryCategoriesData).map(
		([key, options]: [string, string[]]) => {
			const filterMetadata = galleryResourceBundleData[key];

			return {
				category: filterMetadata.label,
				formControlName: key,
				options: options.map((option: string) => ({
					value: option,
					label: filterMetadata.list[option],
				})),
			};
		}
	);
};

export const ImageGalleryResourceBundleMapper = (resourceBundleData: any) => {
	return [
		'global.floorType.list',
		'global.roomType.list',
		'global.floorLook.list',
		'global.floorColor.list',
		'global.style.list',
	].reduce((prev: any, listName: string) => {
		const [_, key] = listName.split('.');
		const list = !!resourceBundleData[listName]
			? JSON.parse(resourceBundleData[listName])
			: null;
		const label = resourceBundleData[`global.${key}.label`] || key;

		return {
			...prev,
			[key]: { label, list },
		};
	}, {});
};

export const ImageGalleryCategoriesMapper = (galleryData: any[]) => {
	const initialValue = {
		roomType: new Set(),
		floorType: new Set(),
		floorLook: new Set(),
		floorColor: new Set(),
		style: new Set(),
	};

	// Add categories
	const categories = galleryData.reduce(
		(prev: any, { filters }: any) => ({
			roomType: !!filters.roomType
				? prev.roomType.add(filters.roomType)
				: prev.roomType,
			floorType: !!filters.floorType
				? prev.floorType.add(filters.floorType)
				: prev.floorType,
			floorLook: !!filters.floorLook
				? prev.floorLook.add(filters.floorLook)
				: prev.floorLook,
			floorColor: !!filters.floorColor
				? prev.floorColor.add(filters.floorColor)
				: prev.floorColor,
			style: !!filters.style ? prev.style.add(filters.style) : prev.style,
		}),
		initialValue
	);

	// Filter empty categories
	return Object.entries(categories)
		.filter(([_, value]: [string, Set<string>]) => !!value.size)
		.reduce(
			(prev: any, [key, value]: [string, Set<string>]) => ({
				...prev,
				[key]: [...value].sort(),
			}),
			{}
		);
};

export const ImageGalleryChipsMapper = (
	formValues: any,
	galleryResourceBundleData: any
): any[] => {
	const { chips, ...filters } = formValues;

	return Object.entries(filters)
		.filter(([_, value]: [string, string]) => !!value)
		.map(([key, value]: [string, string]) => {
			const filterMetadata = galleryResourceBundleData[key];

			return {
				value,
				display: filterMetadata.list[value],
				category: key,
			};
		});
};

const GalleryMapper = (rawGallery: any[], page: Page) => {
	return rawGallery.map((item: any, index: number) => ({
		order: ++index,
		sku: item?.sku || '',
		color: item?.color || '',
		name: item?.productName || '',
		cta: item?.cta ? CtaMapper(item.cta, page) : null,
		image: item?.image ? ImageMapper(item.image, page) : null,
		filters: FilterMapper(item),
	}));
};

const ImageMapper = (image: any, page: Page) => {
	const imgSrc = resolveImageCompound(image, page);

	if (!imgSrc) {
		return null;
	}

	const content = { desktop: imgSrc, mobile: imgSrc };
	const presentation = { theme: ThemeTypes.light };

	return { content, presentation };
};

const CtaMapper = (cta: any, page: Page) => {
	const content = linkMap(cta, page);
	const presentation = { buttonType: cta?.button || null };

	return { content, presentation };
};

const FilterMapper = (item: any) => ({
	roomType: item?.roomType || null,
	floorType: item?.floorType || null,
	floorLook: item?.floorLook || null,
	floorColor: item?.floorColor || null,
	style: item?.style || null,
});
