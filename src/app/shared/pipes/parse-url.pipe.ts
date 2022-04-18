import { Pipe, PipeTransform } from '@angular/core';

declare global {
	interface URLSearchParams {
		entries(): IterableIterator<[string, string]>;
	}
}

@Pipe({ name: 'parseUrl' })
export class ParseUrlPipe implements PipeTransform {
	transform(url: string, property: keyof URL): any {
		const value = new URL(url, 'http://example.com')[property];

		if (value instanceof URLSearchParams) {
			return Object.fromEntries([...value.entries()]);
		}

		return value;
	}
}
