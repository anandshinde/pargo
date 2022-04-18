import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { SharedModule } from '@app/shared/shared.module';
import { BrSdkModule } from '@bloomreach/ng-sdk';
import { NgxPaginationModule } from 'ngx-pagination';
import * as fromComponents from './components';
import * as fromContainers from './containers';
import { GalleryCarouselDialogComponent } from './components/gallery-carousel-dialog/gallery-carousel-dialog.component';
import { GalleryFiltersMobileComponent } from './components/gallery-filters-mobile/gallery-filters-mobile.component';
import { GalleryCarouselItemComponent } from './components/gallery-carousel-item/gallery-carousel-item.component';
import { GalleryFiltersComponent } from './components/gallery-filters/gallery-filters.component';
import { GalleryFiltersDesktopComponent } from './components/gallery-filters-desktop/gallery-filters-desktop.component';
import { GalleryFormChipsComponent } from './components/gallery-form-chips/gallery-form-chips.component';
import { GalleryFormExpansionComponent } from './components/gallery-form-expansion/gallery-form-expansion.component';
import { GalleryFormSelectComponent } from './components/gallery-form-select/gallery-form-select.component';
import { GalleryImagesComponent } from './components/gallery-images/gallery-images.component';
import { GalleryPaginationComponent } from './components/gallery-pagination/gallery-pagination.component';
import { GalleryPaginationCounterComponent } from './components/gallery-pagination-counter/gallery-pagination-counter.component';
import { TagInputModule } from 'ngx-chips';


@NgModule({
  declarations: [...fromContainers.containers, ...fromComponents.components, GalleryCarouselDialogComponent, GalleryFiltersMobileComponent, GalleryCarouselItemComponent, GalleryFiltersComponent, GalleryFiltersDesktopComponent, GalleryFormChipsComponent, GalleryFormExpansionComponent, GalleryFormSelectComponent, GalleryImagesComponent, GalleryPaginationComponent, GalleryPaginationCounterComponent],
	imports: [
		CommonModule,
		BrSdkModule,
		SharedModule,
		NgxPaginationModule,
		MatDialogModule,
		MatMenuModule,
		MatFormFieldModule,
		MatRadioModule,
		ReactiveFormsModule,
		FormsModule,
		TagInputModule,
		MatExpansionModule,
	],
	exports: [...fromContainers.containers],
	entryComponents: [...fromComponents.entryComponents],
})
export class ImageGalleryModule { }
