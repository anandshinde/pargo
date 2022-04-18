import { SafePipe } from './safe.pipe';

import { DomSanitizer, BrowserModule } from '@angular/platform-browser';
import { TestBed, inject } from '@angular/core/testing';

describe('SafePipe', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [BrowserModule],
		});
	});

	it('create an instance', inject([DomSanitizer], (sanitizer: DomSanitizer) => {
		const pipe = new SafePipe(sanitizer);

		expect(pipe).toBeTruthy();
	}));

	it('should be truthy for html content', inject(
		[DomSanitizer],
		(sanitizer: DomSanitizer) => {
			const pipe = new SafePipe(sanitizer);

			expect(pipe.transform('<h1>Test</h1>', 'html')).toBeTruthy();
		}
	));

	it('should be truthy for style content', inject(
		[DomSanitizer],
		(sanitizer: DomSanitizer) => {
			const pipe = new SafePipe(sanitizer);

			expect(pipe.transform('{background: transparent}', 'style')).toBeTruthy();
		}
	));

	it('should be truthy for script content', inject(
		[DomSanitizer],
		(sanitizer: DomSanitizer) => {
			const pipe = new SafePipe(sanitizer);

			expect(pipe.transform('const foo = test;', 'script')).toBeTruthy();
		}
	));

	it('should be truthy for url content', inject(
		[DomSanitizer],
		(sanitizer: DomSanitizer) => {
			const pipe = new SafePipe(sanitizer);

			expect(pipe.transform('http://www.test.com', 'url')).toBeTruthy();
		}
	));

	it('should be falsy for unspecified type', inject(
		[DomSanitizer],
		(sanitizer: DomSanitizer) => {
			const pipe = new SafePipe(sanitizer);

			expect(pipe.transform('http://www.test.com', 'foo')).toBeFalsy();
		}
	));
});
