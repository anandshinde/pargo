import { ProductFacetProps, ProductCategoryProps } from '@shared/interfaces';

// ALL FACETS
export const productFacets: ProductFacetProps[] = [
	{
		label: 'AC Rating',
		facet: 'ac_rating',
		type: ['specification'],
		category: 'tech',
		value: null,
	},
	{
		label: 'Plank Thickness',
		facet: 'actual_hickness',
		type: ['specification'],
		category: 'measurement',
		value: null,
	},
	{
		label: 'Color Families',
		facet: 'color_family',
		type: ['specification'],
		category: 'look',
		value: null,
	},
	{
		label: 'Composition',
		facet: 'composition',
		type: ['specification'],
		category: 'look',
		value: null,
	},
	{
		label: 'Feature',
		facet: 'feature',
		type: ['specification', 'general'],
		category: 'look',
		value: null,
	},
	{
		label: 'Surface Texture',
		facet: 'finish',
		type: ['specification'],
		category: 'look',
		value: null,
	},
	{
		label: 'Color',
		facet: 'sku_color',
		type: ['specification', 'general'],
		category: 'look',
		value: null,
	},
	{
		label: 'Finish',
		facet: 'look_visual',
		type: ['specification'],
		category: 'look',
		value: null,
	},
	{
		label: 'Collection Name',
		facet: 'collection_name',
		type: ['specification', 'general'],
		category: 'tech',
		value: null,
	},
	{
		label: 'Plank Length',
		facet: 'plank_length',
		type: ['specification'],
		category: 'measurement',
		value: null,
	},
	{
		label: 'Plank Width',
		facet: 'plank_width',
		type: ['specification'],
		category: 'measurement',
		value: null,
	},
	{
		label: 'Edge Treatment',
		facet: 'edge_treatment',
		type: ['specification'],
		category: 'look',
		value: null,
	},
	{
		label: 'Product Type',
		facet: 'product_type',
		type: ['specification'],
		category: 'tech',
		value: null,
	},
	{
		label: 'Plank Locking System',
		facet: 'plan_locking_system',
		type: ['specification'],
		category: 'tech',
		value: null,
	},
	{
		label: 'Sq.Ft/Carton',
		facet: 'sq_ft_per_carton',
		type: ['specification'],
		category: 'measurement',
		value: null,
	},
	{
		label: 'Shade',
		facet: 'shade',
		type: ['specification'],
		category: 'look',
		value: null,
	},
	{
		label: 'Species',
		facet: 'wood',
		type: ['specification'],
		category: 'look',
		value: null,
	},
	{
		label: 'Underlayment',
		facet: 'underlayment',
		type: ['specification'],
		category: 'installation',
		value: null,
	},
	{
		label: 'Installation Level',
		facet: 'installation_level',
		type: ['specification'],
		category: 'installation',
		value: null,
	},
	{
		label: 'Subfloor Type',
		facet: 'subfloor_type',
		type: ['specification'],
		category: 'installation',
		value: null,
	},
	{
		label: 'Price',
		facet: 'sku_price',
		type: ['general'],
		category: 'price',
		value: null,
	},
	{
		label: 'Swatch Images',
		facet: 'sku_swatch_images',
		type: ['image'],
		category: 'installation',
		value: null,
	},
	{
		label: 'Thumb Images',
		facet: 'sku_thumb_images',
		type: ['image'],
		category: 'image',
		value: null,
	},
	{
		label: 'Visualizer Image 1',
		facet: 'visualizer_img1',
		type: ['image'],
		category: 'visualizer',
		value: null,
	},
	{
		label: 'Visualizer Image 2',
		facet: 'visualizer_img2',
		type: ['image'],
		category: 'visualizer',
		value: null,
	},
	{
		label: 'Visualizer Image 3',
		facet: 'visualizer_img3',
		type: ['image'],
		category: 'visualizer',
		value: null,
	},
	{
		label: 'Visualizer Image 4',
		facet: 'visualizer_img4',
		type: ['image'],
		category: 'visualizer',
		value: null,
	},
	{
		label: 'Visualizer Image 5',
		facet: 'visualizer_img5',
		type: ['image'],
		category: 'visualizer',
		value: null,
	},
	{
		label: 'Visualizer Image 6',
		facet: 'visualizer_img6',
		type: ['image'],
		category: 'visualizer',
		value: null,
	},
	{
		label: 'Visualizer Image 7',
		facet: 'visualizer_img7',
		type: ['image'],
		category: 'visualizer',
		value: null,
	},
	{
		label: 'Visualizer Image 8',
		facet: 'visualizer_img8',
		type: ['image'],
		category: 'visualizer',
		value: null,
	},
	{
		label: 'Visualizer Image 9',
		facet: 'visualizer_img9',
		type: ['image'],
		category: 'visualizer',
		value: null,
	},
	{
		label: 'Visualizer Image 10',
		facet: 'visualizer_img10',
		type: ['image'],
		category: 'visualizer',
		value: null,
	},
	{
		label: 'Visualizer Room 1',
		facet: 'visualizer_room1',
		type: ['image'],
		category: 'visualizer',
		value: null,
	},
	{
		label: 'Visualizer Room 2',
		facet: 'visualizer_room2',
		type: ['image'],
		category: 'visualizer',
		value: null,
	},
	{
		label: 'Visualizer Room 3',
		facet: 'visualizer_room3',
		type: ['image'],
		category: 'visualizer',
		value: null,
	},
	{
		label: 'Visualizer Room 4',
		facet: 'visualizer_room4',
		type: ['image'],
		category: 'visualizer',
		value: null,
	},
	{
		label: 'Visualizer Swatch',
		facet: 'variant_swatch_image',
		type: ['image'],
		category: 'visualizer',
		value: null,
	},
	{
		label: 'Room Scene',
		facet: 'room_scene',
		type: ['image'],
		category: 'visualizer',
		value: null,
	},
	{
		label: 'Item Number',
		facet: 'item_number',
		type: ['general'],
		category: 'general',
		value: null,
	},
	{
		label: 'Product URL',
		facet: 'manufacturer_product_url',
		type: ['general'],
		category: 'general',
		value: null,
	},
	{
		label: 'PID',
		facet: 'pid',
		type: ['general'],
		category: 'general',
		value: null,
	},
	{
		label: 'Product Description',
		facet: 'product_description',
		type: ['general'],
		category: 'general',
		value: null,
	},
	{
		label: 'Retailer',
		facet: 'retailer',
		type: ['general'],
		category: 'general',
		value: null,
	},
	{
		label: 'SKUID',
		facet: 'skuid',
		type: ['general'],
		category: 'general',
		value: null,
	},
	{
		label: 'Status',
		facet: 'status',
		type: ['general'],
		category: 'general',
		value: null,
	},
	{
		label: 'Title',
		facet: 'title',
		type: ['general'],
		category: 'general',
		value: null,
	},
	{
		label: 'Availability',
		facet: 'variant_availability',
		type: ['general'],
		category: 'general',
		value: null,
	},
	{
		label: 'Composition',
		facet: 'composition',
		type: ['general'],
		category: 'general',
		value: null,
	},
	{
		label: 'Brand',
		facet: 'brand',
		type: ['general'],
		category: 'general',
		value: null,
	},
	{
		label: 'Logo',
		facet: 'collection_logo',
		type: ['general'],
		category: 'general',
		value: null,
	},
	{
		label: 'Feature Logo',
		facet: 'feature_icons',
		type: ['general'],
		category: 'general',
		value: null,
	},
	{
		label: 'Bullet Description 1',
		facet: 'bullet_description1',
		type: ['general'],
		category: 'general',
		value: null,
	},
	{
		label: 'Bullet Description 2',
		facet: 'bullet_description2',
		type: ['general'],
		category: 'general',
		value: null,
	},
	{
		label: 'Bullet Description 3',
		facet: 'bullet_description3',
		type: ['general'],
		category: 'general',
		value: null,
	},
	{
		label: 'Wear Layer',
		facet: 'wear_layer',
		type: ['specification'],
		category: 'installation',
		value: null,
	},
	{
		label: 'Asset Resource Mime Type',
		facet: 'asset_resource_mime_type',
		type: ['document', 'image'],
		category: 'warranty',
		value: null,
	},
	{
		label: 'Asset Resource Name',
		facet: 'asset_resource_name',
		type: ['document', 'image'],
		category: 'warranty',
		value: null,
	},
	{
		label: 'Asset Resource Descriptor',
		facet: 'asset_resource_descriptor',
		type: ['document', 'image'],
		category: 'warranty',
		value: null,
	},
	{
		label: 'Asset Resource Dynamic Media URL',
		facet: 'asset_resource_dynamic_media_url',
		type: ['document', 'image'],
		category: 'warranty',
		value: null,
	},
	{
		label: 'Asset Active',
		facet: 'asset_active',
		type: ['document', 'image'],
		category: 'warranty',
		value: null,
	},
];

const brsmProductFacetsForCart1 = [
	'sku_color',
	'room_scene',
	'pid',
	'skuid',
	'collection_name',
	'manufacturer_product_url',
	'brand',
	'composition',
	'feature',
];

export const brsmProductFacetsForCart = productFacets
	.reduce((a, { facet }) => {
		return brsmProductFacetsForCart1.some((item) => item === facet)
			? [...a, facet]
			: a;
	}, [])
	.join(',');

// Array of facets for Service API
export const brsmProductFacets = productFacets
	.map(({ facet }) => facet)
	.join(',');

export const pdpSearchConfig = {
	rows: 10,
	start: 0,
	search_type: 'keyword',
	request_type: 'search',
	url: 'www.bloomique.com',
	ref_url: '',
	fl: brsmProductFacets,
};

///////////////// SPECIFICATIONS

// FACETS
export const PDPSpecifications: ProductFacetProps[] = productFacets
	.filter((facet) => facet.type.includes('specification'))
	.map(({ label, category, facet, value }) => ({
		label,
		category,
		facet,
		value,
	}));

// CATEGORIES

export const PDPSpecificationsCategories: ProductCategoryProps[] = [
	{
		label: 'Technology',
		category: 'tech',
		content: null,
		items: [],
	},
	{
		label: 'Look',
		category: 'look',
		content: null,
		items: [],
	},
	{
		label: 'Installation',
		category: 'installation',
		content: null,
		items: [],
	},
	{
		label: 'Measurement',
		category: 'measurement',
		content: null,
		items: [],
	},
];

///////////////// INSTALLATION

// FACETS
export const PDPInstallation: any[] = productFacets
	.filter((facet) => facet.type.includes('document'))
	.map(({ label, category, facet, value }) => ({
		label,
		category,
		facet,
		value,
	}));

// CATEGORIES
export const PDPInstallationCategories: ProductCategoryProps[] = [
	{
		key: 'warranty',
		label: 'Warranty',
		category: 'warranty',
		content: null,
		items: [],
	},
	{
		key: 'caremaintenance',
		label: 'Care and Maintenance',
		category: 'care',
		content: null,
		items: [],
	},
	{
		key: 'installation',
		label: 'Installation',
		category: 'installation',
		content: null,
		items: [],
	},
];

///////////////// GENERAL INFO

// FACETS
export const PDPGeneralInformation: any[] = productFacets
	.filter((facet) => facet.type.includes('general'))
	.map(({ label, category, facet, value }) => ({
		label,
		category,
		facet,
		value,
	}));

///////////////// VISUALIZER

// FACETS
export const PDPVisualizerImages: any[] = productFacets
	.filter((facet) => {
		return (
			facet.type.includes('image') && facet.category.includes('visualizer')
		);
	})
	.map(({ label, category, facet, value }) => ({
		label,
		category,
		facet,
		value,
	}));

///////////////// PLP SERVICE QUERIES

export const PLPserviceQueries = {
	laminate: '%22Laminate%20Wood%22%20OR%20%22Laminate%22',
	hardwood: '%22Hardwood%22',
	'rigid-vinyl': '%22Luxury%20Vinyl%22%20OR%20%22Rigid%20LVP%22',
	waterproof: '%22Waterproof%22',
	scratchresistant: '%22Scratch%20Resistant%22',
	dentresistant: '%22Dent%20Resistant%22',
};
