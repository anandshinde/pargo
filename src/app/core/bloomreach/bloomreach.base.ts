import { Directive, HostBinding, Input, OnInit } from '@angular/core';

import { Component as BrComponent, Page, Content } from '@bloomreach/spa-sdk';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { UnsubscribeOnDestroy } from '@shared/base-classes';

import {
	brxmMapComponentAttributes,
	ComponentAttributeMap,
	DocumentModels,
	DocumentData,
	MenuModels,
	Pageable,
} from '@core/bloomreach';

@Directive()
export abstract class BloomreachBaseClass
	extends UnsubscribeOnDestroy
	implements OnInit
{
	@Input() component!: BrComponent;
	@Input() page!: Page;

	// PRIVATE SUBJECTS...
	private _componentDocument$: BehaviorSubject<Content> =
		new BehaviorSubject<Content>(null);

	private _componentParameters$: BehaviorSubject<any> =
		new BehaviorSubject<any>(null);

	private _componentDocumentFeed$: BehaviorSubject<any> =
		new BehaviorSubject<any>(null);

	private _componentConfiguration$: BehaviorSubject<any> =
		new BehaviorSubject<any>(null);

	private _resourceBundleConfiguration$: BehaviorSubject<any> =
		new BehaviorSubject<any>(null);

	private _componentMenus$: BehaviorSubject<MenuModels> =
		new BehaviorSubject<MenuModels>(null);

	private _documentIsConfigured: boolean;

	// PUBLIC METHODS...
	get pageURL() {
		return this.page.getUrl();
	}
	get isDynamic() {
		return this.page['model']?.page._meta?.params?.dynamic || false;
	}

	get parameters() {
		return this.component?.getParameters();
	}

	/** COMPONENT PARAMETERS
	 * @summary primary method for returning component parameters.
	 */
	public componentParameters$: Observable<any> =
		this._componentParameters$.pipe(
			map((params: any) => {
				return params;
			})
		);

	/** COMPONENT MENUS
	 * @summary primary method for returning component menus.
	 */
	public componentMenu$: Observable<any> = this._componentMenus$.pipe(
		map((menus: MenuModels) => {
			return !!menus ? menus.menu : null;
		})
	);
	/** COMPONENT MENUS
	 * @summary primary method for returning component menus.
	 */
	public componentMenuItems$: Observable<any> = this._componentMenus$.pipe(
		map((menus: MenuModels) => {
			return !!menus ? menus.menu.siteMenuItems : null;
		})
	);

	/** COMPONENT DATA
	 * @summary primary method for returning component data.
	 *  Most BrXM components will be returned here.
	 */
	public componentData$: Observable<any> = this._componentDocument$.pipe(
		map((document: Content) => {
			return !!document ? document?.getData<DocumentData>() : null;
		})
	);

	/** COMPONENT DOCUMENT FEED
	 * @summary primary method for returning document feed data. This is pageable data
	 *  such as blogs and articles.
	 */
	public componentDocumentFeed$: Observable<any> =
		this._componentDocumentFeed$.pipe(map((feed: any) => feed));

	/** COMPONENT CONFIGURATION
	 * @summary config data contains resource bundle data and value list data.
	 */
	public resourceBundleData$: Observable<any[]> = combineLatest([
		this._componentConfiguration$,
		this._resourceBundleConfiguration$,
	]).pipe(
		map(([component, bundle]: any) => {
			const resourceBundleData = !!component ? component : bundle;
			const data = resourceBundleData?.getData();
			return !!data
				? data?.keys?.map((d, i) => {
						return { [d]: data?.messages[i] };
				  })
				: null;
		})
	);

	// Handle when CMS
	// eslint-disable-next-line @angular-eslint/contextual-decorator
	@HostBinding('class.has-edit-button')
	get isPreview() {
		return this.page?.isPreview();
	}
	get documentIsConfigured(): boolean {
		return !!this._documentIsConfigured;
	}

	get document() {
		const document = this.component?.getModels<DocumentModels>()?.document;
		// console.log('document: ', document);
		return document && this.page?.getContent(document);
	}

	get menu() {
		return this.component?.getModels<MenuModels>().menu || null;
	}

	// eslint-disable-next-line @angular-eslint/contextual-lifecycle
	ngOnInit() {
		// GET DATA
		const type = this.component.getName();
		const document = this.component?.getModels<DocumentModels>()?.document;
		const parameters = this.component.getParameters();
		const documentFeed =
			this.component?.getModels<any>()?.pagination?.items || [];
		const configuration = parameters.configuration;
		const menus: MenuModels = this.component.getModels<MenuModels>();

		const resourceBundleConfiguration =
			this.component?.getModels<any>()?.configuration;
		this._documentIsConfigured = !!document;

		// UPDATE SUBJECTS
		// set parameters based on component
		if (!!parameters) {
			this._componentParameters$.next(
				brxmMapComponentAttributes(ComponentAttributeMap[type], parameters)
			);
		}

		// set the document based on the component
		if (!!document) {
			this._componentDocument$.next(this.page?.getContent<Content>(document));
		}

		// set the document feed based on the component. This applies to blogs and articles
		if (!!documentFeed) {
			this._componentDocumentFeed$.next(
				documentFeed.map((document) => {
					return this.page?.getContent<Content>(document).getData();
				})
			);
		}

		// set the configuration based on the component. pulled from parameters.
		if (!!configuration) {
			this._componentConfiguration$.next(
				this.page?.getContent<DocumentModels>(configuration)
			);
		}

		if (!!resourceBundleConfiguration) {
			this._resourceBundleConfiguration$.next(
				this.page?.getContent<DocumentModels>(resourceBundleConfiguration)
			);
		}

		if (!!menus) {
			this._componentMenus$.next(menus);
		}
	}
}
