import {
	AfterViewInit,
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	Inject,
	OnInit,
} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DOCUMENT, ViewportScroller } from '@angular/common';

import { BehaviorSubject, Subject } from 'rxjs';
import {
	debounceTime,
	distinctUntilChanged,
	map,
	take,
	takeUntil,
} from 'rxjs/operators';

// APP IMPORTS
import { BloomreachComponent } from '@app/shared/base-classes';
import { InputTextTypes, ThemeTypes } from '@app/shared/constants';

import {
	InputTextContentProps,
	InputTextPresentationProps,
	RichTextContentProps,
	RichTextPresentationProps,
} from '@app/shared/interfaces';
import { TabbedContentForm } from './tabbed-content.form';
import { TabbedContentMapper, SearchFilter } from './tabbed-content.mapper';
import { StorageService, Eventservice, ScrollService } from '@core/services';
import { WINDOW } from '@shared/utilities/window';
import { checkIsParent } from '@shared/utilities/general.utilities';

@Component({
	selector: 'mflooring-tabbed-content',
	templateUrl: './tabbed-content.component.html',
	styleUrls: ['./tabbed-content.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabbedContentComponent
	extends BloomreachComponent
	implements OnInit, AfterViewInit
{
	public readonly name = 'Tabbed Content';

	public keyUp$ = new Subject<KeyboardEvent>();
	public filteredContent$: BehaviorSubject<any> = new BehaviorSubject(null);
	public form = TabbedContentForm();
	public content;
	private panel: HTMLElement;
	public selectedTab$: BehaviorSubject<any> = new BehaviorSubject(null);
	public filteredData$: BehaviorSubject<any> = new BehaviorSubject(null);
	constructor(
		public storage: StorageService,
		public eventservice: Eventservice,
		private route: ActivatedRoute,
		@Inject(DOCUMENT) private documentRef: Document,
		@Inject(WINDOW) private windowRef: Window,
		private elementRef: ElementRef,
		private scrollService: ScrollService
	) {
		super(eventservice, storage);

		this.keyUp$
			.pipe(
				takeUntil(this.unsubscribe),
				map((event: KeyboardEvent) => (<HTMLInputElement>event.target).value),
				debounceTime(250),
				distinctUntilChanged(),
				map((input: string) => {
					return input.length > 2
						? SearchFilter(
								JSON.parse(JSON.stringify({ ...this.content })),
								input
						  )
						: this.content;
				})
			)
			.subscribe((payload: any) => {
				this.filteredContent$.next(payload?.tabsContent);
			});
	}

	get hasSearchBar(): boolean {
		return this.parameters['include-content-search'];
	}

	get searchContent(): InputTextContentProps {
		return {
			icon: 'search',
			placeholder: 'Type search here',
		};
	}

	get searchPresentation(): InputTextPresentationProps {
		return {
			theme: ThemeTypes.light,
			hasIcon: !!this.searchContent?.icon,
			type: InputTextTypes.tabbedContent,
		};
	}

	get topContent(): RichTextContentProps {
		return this.content?.top?.content;
	}

	get topPresentation(): RichTextPresentationProps {
		return this.content?.top?.presentation;
	}
	contentSearch: any = [];

	ngOnInit(): void {
		this.content = !!this.data
			? TabbedContentMapper(this.data, this.page)
			: null;
		this.filteredContent$.next(this.content?.tabsContent);
		this.filteredData$.next(this.content?.tabsContent);
		this.route.queryParams
			.pipe(takeUntil(this.unsubscribe))
			.subscribe((params: Params) => {
				if (!!params) {
					let tab = params.tab === 'rigid-vinyl' ? 'luxury vinyl' : params.tab;
					this.selectedTab$ = tab;
				}
			});
	}

	ngAfterViewInit() {
		// check if there is a url fragment and open the corresponding panel if it exists
		this.route.fragment.pipe(takeUntil(this.unsubscribe)).subscribe((frag) => {
			if (!!frag) {
				this.panel = this.documentRef.getElementById(frag)
					?.offsetParent as HTMLElement;
				if (!!this.panel) {
					this.panel.click();
					const idOverride = checkIsParent(
						this.elementRef.nativeElement,
						this.panel
					)
						? 'mflooringTabbedContentTop'
						: null;

					this.scrollService.setScrollParams({ idOverride });
				}
			}
		});
	}

	searchedData: [];
	searchedContentData: any = [];
	searchedFAQContentData: any = [];
	search(searchText) {
		this.searchedContentData = [];
		this.filteredContent$.subscribe((data) => {
			for (let entry of data) {
				this.searchedData = entry.faq.filter((item) => {
					return (
						item.content.title.panel
							.toLowerCase()
							.includes(searchText.toLowerCase()) ||
						item.content.collapsed[0].value.content.richText
							.toLowerCase()
							.includes(searchText.toLowerCase())
					);
				});
				if (this.searchedData.length > 0) {
					this.searchedFAQContentData = Object.create(entry);
					this.searchedFAQContentData.faq = this.searchedData;
					this.searchedContentData.push(this.searchedFAQContentData);
				}
			}
			if (!searchText) {
				this.searchedContentData = data;
			}
		});

		this.filteredData$.next(this.searchedContentData);
	}
	clearSearch = () => {
		this.filteredContent$.subscribe((data) => {
			this.filteredData$.next(data);
		});
	};
}
