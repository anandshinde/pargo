import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import {
	PageMetaDataDefaults,
	PageMetaDataTitleDefault,
} from '@shared/constants';

@Injectable({
	providedIn: 'root',
})
export class PageMetadataService {
	constructor(private metaService: Meta, private titleService: Title) {}

	private _setPageMetadata(metadata) {
		Object.entries(metadata).forEach(([k, v]: [string, string]) => {
			this.metaService.updateTag({
				name: k,
				content: v,
			});
		});
	}

	// Title is set separately from the meta data
	public setTitle(title = PageMetaDataTitleDefault) {
		this.titleService.setTitle(title);
	}

	// Accepts an object of key/value pairs: key = meta name, value = meta content
	public setPageMetadata(metadata: { [key: string]: string }) {
		this._setPageMetadata({ ...PageMetaDataDefaults, ...metadata });
	}
}
