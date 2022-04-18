import {
	AfterViewInit,
	Component,
	HostBinding,
	Input,
	OnInit,
	ChangeDetectionStrategy
} from '@angular/core';
import { Component as BrComponent, Page } from '@bloomreach/spa-sdk';

// import { UnsubscribeOnDestroyComponent } from '@shared/base-classes/unsubscribe-on-destroy';
import { DocumentData, DocumentModels, MenuModels } from '@shared/interfaces';
import { Eventservice, StorageService } from '@core/services';
import { UnsubscribeOnDestroy } from './unsubscribe.base';

export interface ConfigModels extends DocumentModels {
	configuration?: import('@bloomreach/spa-sdk').Reference;
}

@Component({
	template: '',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BloomreachComponent extends UnsubscribeOnDestroy {
	@Input() component!: BrComponent;
	@Input() page!: Page;

	public getCustomerKey$ = this.storage.getItem('custKey');
	public getUserToken$ = this.storage.getItem('userToken');
	public getUserName$ = this.storage.getItem('userName');

	public customerKey;

	constructor(
		protected eventservice: Eventservice,
		protected storage: StorageService
	) {
		super();
	}

	@HostBinding('class.has-edit-button')
	get isPreview() {
		return this.page?.isPreview();
	}

	get document() {
		const document = this.component?.getModels<DocumentModels>()?.document;
		return document && this.page?.getContent(document);
	}
	get pagination() {
		const pagination = this.component?.getModels<DocumentModels>();
		const temp = pagination['pagination'];
		const items = temp.items.map((item) => {
			return this.page?.getContent(item);
		});
		return {
			...temp,
			items,
		};
	}

	get pageTemplate() {
		return this.page['model']?.page._meta?.params?.template || null;
	}

	get isDynamic() {
		return this.page['model']?.page._meta?.params?.dynamic || false;
	}

	get parameters() {
		return this.component?.getParameters();
	}

	// Get the data off of the document
	get data(): any {
		return !!this.document ? this.document?.getData<DocumentData>() : null;
	}

	// Get the menu info off of the component
	get menu(): any {
		return this.component?.getModels<MenuModels>().menu || null;
	}

	// Get the component's configuration data
	get configurationData() {
		const configuration = this.component?.getModels().configuration || null;
		return !!configuration
			? this.page?.getContent(configuration)?.getData()
			: null;
	}

	// Get the resource bundle information -- this can change depending on the way they are being sent
	// NOTE: this function may need a little optimization
	get resourceBundleData() {
		const messages = this.configurationData?.messages || [];
		const keys = this.configurationData?.keys || [];

		return !!keys.length
			? keys.reduce((a: any, c: string, index: number) => {
					return {
						...a,
						[c]: messages[index],
					};
			  }, {})
			: [];
	}

	// Get the information for multiple resource bundles
	// NOTE: this function may need a little optimization

	get resourceBundleArray() {
		const config = this.component?.getModels<ConfigModels>()?.configuration;
		const configData = config && this.page?.getContent(config);
		return configData.getData().resourceBundles;
	}

	get documentIsConfigured(): boolean {
		return !!this.document;
	}

	get pageURL() {
		return this.page.getUrl();
	}
}
