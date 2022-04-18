export const RegularExpressions = {
	externalUrl: `(http(s)?:\\/\\/.)?(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{2,256}\\.[a-z]{2,6}`,
	phoneNumberValidation: /^\(\d{3}\) \d{3}-\d{4}$/,
};

export interface PDPAttributes {
	label: string;
	key: string;
	category: string | string[];
}

export const PLPfilters = [
	'pid',
	'title',
	'brand',
	'color',
	'collection_name',
	'thumb_image',
	'skuid',
	'look_visual',
	'product_description',
	'product_type',
	'product_family',
	'shade',
	'feature',
	'finish',
	'status',
	'item_number',
	'installation_level',
	'composition',
	'manufacturer_product_url',
	'room_scene',
	'sku_swatch_images',
	'sku_color',
];

export const PDPspecs: PDPAttributes[] = [
	{
		label: 'AC Rating',
		key: 'ac_rating',
		category: 'tech',
	},
	{
		label: 'Plank Thickness',
		key: 'actual_hickness',
		category: 'Measurement',
	},
	{
		label: 'Color Families',
		key: 'color_family',
		category: 'look',
	},
	{
		label: 'Composition',
		key: 'composition',
		category: 'look',
	},
	{
		label: 'Feature',
		key: 'feature',
		category: 'look',
	},
	{
		label: 'Surface Texture',
		key: 'finish',
		category: 'look',
	},
	{
		label: 'Color',
		key: 'sku_color',
		category: 'look',
	},
	{
		label: 'Finish',
		key: 'look_visual',
		category: 'look',
	},
	{
		label: 'Collection Name',
		key: 'collection_name',
		category: 'tech',
	},
	{
		label: 'Plank Length',
		key: 'plank_length',
		category: 'measure',
	},
	{
		label: 'Plank Width',
		key: 'plank_width',
		category: 'measure',
	},
	{
		label: 'Edge Treatment',
		key: 'edge_treatment',
		category: 'look',
	},
	{
		label: 'Product Type',
		key: 'product_type',
		category: 'tech',
	},
	{
		label: 'Plank Locking System',
		key: 'plan_locking_system',
		category: 'tech',
	},
	{
		label: 'Sq.Ft/Carton',
		key: 'sq_ft_per_carton',
		category: 'measure',
	},
	{
		label: 'Shade',
		key: 'shade',
		category: 'look',
	},
	{
		label: 'Species',
		key: 'wood',
		category: 'look',
	},
	{
		label: 'Underlayment',
		key: 'underlayment',
		category: 'install',
	},
	{
		label: 'Installation Level',
		key: 'installation_level',
		category: 'install',
	},
	{
		label: 'Subfloor Type',
		key: 'subfloor_type',
		category: 'install',
	},
];

export const PDPSpecsCategories: any[] = [
	{
		key: 'tech',
		label: 'Technology',
		content: [],
	},
	{
		key: 'look',
		label: 'Look',
		content: [],
	},
	{
		key: 'install',
		label: 'Installation',
		content: [],
	},
	{
		key: 'measure',
		label: 'Measurement',
		content: [],
	},
];

export const PDPinstall: PDPAttributes[] = [
	{
		label: 'Warranty PDF',
		key: 'warranty_doc',
		category: 'warranty',
	},
	{
		label: 'Care and Maintenance Guides',
		key: 'care_and_maint_doc',
		category: 'care',
	},
	{
		label: 'Installation Guides',
		key: 'installation_doc',
		category: 'installation',
	},
];

export const PDPInstallCategories: any[] = [
	{
		key: 'warranty',
		label: 'Warranty',
		text: null,
		content: [],
	},
	{
		key: 'care',
		label: 'Care and Maintenance',
		text: null,
		content: [],
	},
	{
		key: 'installation',
		label: 'Installation',
		text: null,
		content: [],
	},
];

export const PDPprice: PDPAttributes[] = [
	{
		label: 'Price',
		key: 'sku_price',
		category: 'Pricing',
	},
	{
		label: 'Price Range',
		key: 'price_range',
		category: 'Pricing',
	},
	{
		label: 'Sale Price',
		key: 'sku_sale_price',
		category: 'Pricing',
	},
	{
		label: 'Sale Price Range',
		key: 'sale_price_range',
		category: 'Pricing',
	},
];

export const PDPimages: PDPAttributes[] = [
	{
		label: 'Swatch Images',
		key: 'sku_swatch_images',
		category: 'images',
	},
	{
		label: 'Thumb Images',
		key: 'sku_thumb_images',
		category: 'images',
	},
	{
		label: 'Visualizer Image 1',
		key: 'visualizer_img1',
		category: 'visualizer',
	},
	{
		label: 'Visualizer Image 2',
		key: 'visualizer_img2',
		category: 'visualizer',
	},
	{
		label: 'Visualizer Image 3',
		key: 'visualizer_img3',
		category: 'visualizer',
	},
	{
		label: 'Visualizer Image 4',
		key: 'visualizer_img4',
		category: 'visualizer',
	},
	{
		label: 'Visualizer Image 5',
		key: 'visualizer_img5',
		category: 'visualizer',
	},
	{
		label: 'Visualizer Image 6',
		key: 'visualizer_img6',
		category: 'visualizer',
	},
	{
		label: 'Visualizer Image 7',
		key: 'visualizer_img7',
		category: 'visualizer',
	},
	{
		label: 'Visualizer Image 8',
		key: 'visualizer_img8',
		category: 'visualizer',
	},
	{
		label: 'Visualizer Image 9',
		key: 'visualizer_img9',
		category: 'visualizer',
	},
	{
		label: 'Visualizer Image 10',
		key: 'visualizer_img10',
		category: 'visualizer',
	},

	{
		label: 'Visualizer Room 1',
		key: 'visualizer_room1',
		category: 'visualizer',
	},
	{
		label: 'Visualizer Room 2',
		key: 'visualizer_room2',
		category: 'visualizer',
	},
	{
		label: 'Visualizer Room 3',
		key: 'visualizer_room3',
		category: 'visualizer',
	},
	{
		label: 'Visualizer Room 4',
		key: 'visualizer_room4',
		category: 'visualizer',
	},
	{
		label: 'Visualizer Swatch',
		key: 'variant_swatch_image',
		category: 'visualizer',
	},
];

export const PDPImageViewer = ['room_scene'];

export const PDPgeneral = [
	'item_number',
	'manufacturer_product_url',
	'pid',
	'product_type',
	'collection_name',
	'product_description',
	'product_url',
	'retailer',
	'sku_ids',
	'sku_color',
	'skuid',
	'status',
	'title',
	'variant_availability',
	'brand',
	'sku_price',
];

export const PDPfilters = [
	...PDPgeneral,
	...PDPImageViewer,
	...PDPprice.map((spec) => spec.key),
	...PDPimages.map((spec) => spec.key),
	...PDPinstall.map((spec) => spec.key),
	...PDPspecs.map((spec) => spec.key),
];
