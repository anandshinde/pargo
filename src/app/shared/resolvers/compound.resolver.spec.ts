import { resolveImage } from './compound.resolver';

describe('CompoundResolvers', () => {
	it('resolveImage should be truthy', () => {
		const input = {
			displayName: 'hippogallery:thumbnail',
			height: 24,
			width: 60,
			lastModified: 1605284393547,
			mimeType: 'image/png',
			filename: 'pergo-go-bold-logo.png',
			size: 1218,
			_links: {
				site: {
					href:
						'http://localhost:8080/site/binaries/thumbnail/content/gallery/pe-en-us/icons/pergo-go-bold-logo.png',
					type: 'resource',
				},
			},
		};

		expect(resolveImage(input)).toEqual({
			size: 1218,
			height: 24,
			width: 60,
			url:
				'http://localhost:8080/site/binaries/thumbnail/content/gallery/pe-en-us/icons/pergo-go-bold-logo.png',
		});
	});
});
