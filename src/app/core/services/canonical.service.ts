import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})

export class CanonicalService {
	constructor(@Inject(DOCUMENT) private document: any) {}

	updateCanonicalUrl(url: string) {
		const head = this.document.getElementsByTagName('head')[0];
		let element: HTMLLinkElement =
			this.document.querySelector(`link[rel='canonical']`) || null;

		if (element == null) {
			element = this.document.createElement('link') as HTMLLinkElement;
			head.appendChild(element);
		}

		element.setAttribute('rel', 'canonical');
		element.setAttribute('href', url);
	}
}
