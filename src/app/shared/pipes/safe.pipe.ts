import { Pipe, PipeTransform } from '@angular/core';
import {
	DomSanitizer,
	SafeHtml,
	SafeStyle,
	SafeScript,
	SafeUrl,
} from '@angular/platform-browser';

@Pipe({
	name: 'safe',
})
export class SafePipe implements PipeTransform {
	constructor(protected sanitizer: DomSanitizer) {}

	public transform(
		value: any,
		type: string
	): SafeHtml | SafeStyle | SafeScript | SafeUrl {
		switch (type) {
			case 'html':
				return this.sanitizer.bypassSecurityTrustHtml(value)['changingThisBreaksApplicationSecurity'] ? this.sanitizer.bypassSecurityTrustHtml(value) : '' ;

			case 'style':
				return this.sanitizer.bypassSecurityTrustStyle(value);

			case 'script':
				return this.sanitizer.bypassSecurityTrustScript(value);

			case 'url':
				return this.sanitizer.bypassSecurityTrustUrl(value);

			default:
				console.log(`Invalid safe type specified: ${type}`);
				return false;
		}
	}
}
