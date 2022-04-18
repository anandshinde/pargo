export interface VisualizerProductData {
	idProduct: string;
	idManuf: string;
	formatType: string;
	width: number; // mm
	height: number; // mm
	diagonal: number; // mm
	thickness?: number; // mm - used in 3D Viewer
	offshaded?: boolean;
	offshadedRot?: boolean;
	material: {
		dominantColor?: number;
		color?: number;
		maps: string[];
		alphaMaps?: string[];
		bumpMaps?: string[];
		bumpScale?: number;
		displacementMaps?: string[]; // not tested yet
		displacementScale?: number; // not tested yet
		displacementBias?: number; // not tested yet
		emissive?: number; // not tested yet
		emissiveIntensity?: number; // not tested yet
		metalness?: number;
		metalnessMaps?: string[];
		normalMaps?: string[];
		normalScale?: {
			x?: number;
			y?: number;
		};
		opacity?: number;
		refractionRatio?: number;
		roughness?: number;
		roughnessMaps?: string[];
	};
	patterns?: string[];
}

export interface VisualizerSceneData {
	version: number;
	layers: [
		{
			surfaceType: string;
			surfaceIndex: number;
			hotspot: {
				x: number;
				y: number;
			};
			points: [
				{
					x: number;
					y: number;
					z: number;
				},
				{
					x: number;
					y: number;
					z: number;
				},
				{
					x: number;
					y: number;
					z: number;
				},
				{
					x: number;
					y: number;
					z: number;
				}
			];
			tileList: [
				{
					fillPolicy: number;
					patterns: [
						{
							pattern: {
								id: string;
								groutSize: number;
								groutColor: number;
								rotation: number;
								origin: {
									x: number;
									y: number;
								};
								areaRect: {
									min: {
										x: number;
										y: number;
									};
									max: {
										x: number;
										y: number;
									};
								};
							};
							tiles: [
								{
									idProduct: string;
									idManuf: string;
									tileIndex: number;
								}
							];
						}
					];
				}
			];
		}
	];
	tiles?: [];
	cameraParams: {
		fov: number;
		grade: number;
		roll: number;
		heightFromGround: number;
		imageAspect: number;
	};
	backgroundImage: {
		src: string;
		size: {
			x: number;
			y: number;
		};
	};
	maskList: [
		{
			id: string;
			src: string;
			indexes: number[];
			reflection: number;
			shading: number;
		}
	];
	lights: [
		{
			lightType: number;
			pnt?: number;
			targetPnt?: number;
			power?: number;
			angle?: number;
			penumbra: number;
			areaType?: number;
		}
	];
}
