import { BreakpointObserver } from '@angular/cdk/layout';
import {
	ChangeDetectionStrategy,
	Component,
	HostListener,
	OnDestroy,
	OnInit,
	ViewChild,
} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PaginationInstance } from 'ngx-pagination';
import { Subject } from 'rxjs';
import { distinctUntilChanged, map, takeUntil, tap } from 'rxjs/operators';

// APP IMPORTS
import { BloomreachComponent } from '@app/shared/base-classes';
import { GalleryCarouselBlockComponent } from '../../components/gallery-carousel-block/gallery-carousel-block.component';
import { GalleryCarouselDialogComponent } from '../../components/gallery-carousel-dialog/gallery-carousel-dialog.component';
import { GalleryFiltersMobileComponent } from '../../components/gallery-filters-mobile/gallery-filters-mobile.component';
import { ImageGalleryForm } from './image-gallery.form';
import {
	ImageGalleryCategoriesMapper,
	ImageGalleryChipsMapper,
	ImageGalleryFiltersMapper,
	ImageGalleryMapper,
	ImageGalleryResourceBundleMapper,
} from './image-gallery.mapper';
import { CleanFormValues } from './image-gallery.util';
import { breakpoints } from '@app/shared/constants';
import { Eventservice, StorageService } from '@app/core/services';
import { ViewportScroller } from '@angular/common';

@Component({
	selector: 'mflooring-image-gallery',
	templateUrl: './image-gallery.component.html',
	styleUrls: ['./image-gallery.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageGalleryComponent
	extends BloomreachComponent
	implements OnInit, OnDestroy
{
	public readonly name = 'Image Gallery';

	private unsubscribe$: Subject<any> = new Subject<void>();
	public paginationConfig: PaginationInstance = {
		itemsPerPage: 12,
		currentPage: 1,
	};
	public paginationCounterContent = {
		order: {
			first: 0,
			last: 0,
		},
		quantity: 0,
	};
	public filtersForm = ImageGalleryForm();
	public filtersContent: any = { filterLabel: '', filters: [] };
	public imagesPaginated = [];
	public readonly hiddenManager = new Map([
		['FILTER_OPENED_MOBILE', ['gallery', 'pagination']],
		['CAROUSEL_MOBILE', ['filters', 'gallery', 'pagination']],
	]);
	public sectionsHidden = [];
	public isMobile: boolean;
	public carouselBlock = null;

	public imagesMapped;

	public categoriesMapped;

	public resourceBundleMapped;

	public imagesQuantity;

	public areSectionsHidden;

	@ViewChild(GalleryFiltersMobileComponent)
	private filtersMobileComponent: GalleryFiltersMobileComponent;
	@ViewChild(GalleryCarouselBlockComponent)
	private carouselBlockComponent: GalleryCarouselBlockComponent;
	@HostListener('window:resize', ['$event']) onResize(): void {
		this.isMobile = this.breakpoint.isMatched(breakpoints.mobileMax);

		this.showHiddenElementsDesktop();
	}

	constructor(
		private matDialog: MatDialog,
		private breakpoint: BreakpointObserver,
		public storage: StorageService,
		public eventservice: Eventservice,
		private viewportScroller: ViewportScroller
	) {
		super(eventservice, storage);
	}

	private setFilters(): void {
		const filters = ImageGalleryFiltersMapper(
			this.categoriesMapped,
			this.resourceBundleMapped
		);
		const filterLabel = this.resourceBundleData['global.label.filters'] || '';

		this.filtersContent = { filters, filterLabel };
	}

	private setImagesPaginated(): void {
		this.imagesPaginated = [...this.imagesMapped];
		this.imagesQuantity = this.imagesPaginated.length;
	}

	private updateChips(formValues: any = null): void {
		formValues = formValues || this.filtersForm.value;

		const chips = ImageGalleryChipsMapper(
			formValues,
			this.resourceBundleMapped
		);

		this.filtersForm.patchValue({ chips });
	}

	/**
	 * Listen Filter form changes.
	 */
	private onFilterFormChanges(): void {
		this.filtersForm.valueChanges
			.pipe(
				takeUntil(this.unsubscribe$),
				distinctUntilChanged((prev: any, curr: any) => {
					const { chips: prevChips, ...prevFilters } = prev;
					const { chips: currChips, ...currFilters } = curr;

					return JSON.stringify(prevFilters) === JSON.stringify(currFilters);
				}),
				tap((formValues: any) => this.updateChips(formValues)),
				map((formValues: any) => CleanFormValues(formValues)),
				tap(() => this.onPageChange(1)),
				tap((cleanedFormValues: any) => this.filterImages(cleanedFormValues))
			)
			.subscribe();
	}

	/**
	 * Filter algorythm.
	 * @param cleanedFormValues
	 */
	private filterImages(cleanedFormValues: any = null): void {
		if (cleanedFormValues === null) {
			const formValues = this.filtersForm.value;
			cleanedFormValues = CleanFormValues(formValues);
			this.filterImages(cleanedFormValues);

			return;
		}

		if (Object.keys(cleanedFormValues).length === 0) {
			this.imagesPaginated = [...this.imagesMapped];

			return;
		}

		this.imagesPaginated = this.imagesMapped
			.filter(({ filters }: any) =>
				Object.entries(cleanedFormValues).every(
					([key, value]: [string, string]) => filters[key] === value
				)
			)
			.map((image: any, index: number) => ({ ...image, order: ++index }));
	}

	private showHiddenElementsDesktop(): void {
		if (this.isMobile) {
			return;
		}
		if (!this.areSectionsHidden) {
			return;
		}

		// this.filtersMobileComponent?.onCloseFilters();
		this.carouselBlockComponent?.onCloseCarouselBlock();
	}

	onResetForm(): void {
		if (
			this.filtersForm.value.style != null ||
			this.filtersForm.value.roomType != null ||
			this.filtersForm.value.floorType != null ||
			this.filtersForm.value.floorLook != null ||
			this.filtersForm.value.floorColor != null ||
			this.filtersForm.value.chips.length != 0
		) {
			this.filtersForm.reset();
		}
	}

	onChipRemoved(item: any): void {
		const { category } = item;

		this.filtersForm.patchValue({ [category]: null });
	}

	/**
	 * Opens detail of the image (carousel).
	 * @param dialogConfig
	 */
	onOpenStrategy(dialogConfig: MatDialogConfig): void {
		if (this.isMobile) {
			return this.onOpenBlock(dialogConfig);
		}

		return this.onOpenDialog(dialogConfig);
	}

	onOpenBlock(dialogConfig: MatDialogConfig): void {
		// this.onHideSections('CAROUSEL_MOBILE');

		// this.carouselBlock = {
		// 	index: dialogConfig.data.index,
		// 	images: dialogConfig.data.images,
		// };
		const dialog = this.matDialog.open(
			GalleryCarouselDialogComponent,
			dialogConfig
		);
	}

	onOpenDialog(dialogConfig: MatDialogConfig): void {
		const dialog = this.matDialog.open(
			GalleryCarouselDialogComponent,
			dialogConfig
		);

		dialog.afterClosed().pipe(takeUntil(this.unsubscribe)).subscribe();
	}

	onCloseCarouselBlock(): void {
		this.onHideSections('');

		this.carouselBlock = null;
	}

	onPageChange(page: number) {
		this.paginationConfig.currentPage = page;
		this.viewportScroller.scrollToAnchor('imageGalleryTop');
	}

	onFirstLastOrder(order: any): void {
		const { first, last } = order;

		this.paginationCounterContent = {
			order: {
				first,
				last,
			},
			quantity: this.imagesQuantity,
		};
	}

	onHideSections(key: string): void {
		this.sectionsHidden = this.hiddenManager.get(key) || [];
	}

	/**
	 * In case it's not mobile view and it's using mobile view then it should be showing desktop view.
	 */

	ngOnInit(): void {
		this.imagesMapped = ImageGalleryMapper(this.data, this.page);

		this.categoriesMapped = ImageGalleryCategoriesMapper(this.imagesMapped);

		this.resourceBundleMapped = ImageGalleryResourceBundleMapper(
			this.resourceBundleData
		);

		this.areSectionsHidden = !!this.sectionsHidden.length;

		this.setFilters();
		this.setImagesPaginated();
		this.updateChips();
		this.filterImages();
		this.onFilterFormChanges();
		this.onResize();
	}

	ngOnDestroy(): void {
		this.unsubscribe$.next();
		this.unsubscribe$.complete();
	}
}
