import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as fromContainers from './containers';
import * as fromComponents from './components';

import { SharedModule } from '@app/shared/shared.module';
import { ShopByCategoryComponent } from './components/shop-by-category/shop-by-category.component';
import { SwiperModule } from 'swiper/angular';

@NgModule({
	declarations: [...fromContainers.containers, ...fromComponents.components],
	imports: [CommonModule, SharedModule, SwiperModule],
	exports: [...fromContainers.containers, ...fromComponents.components],
})
export class CategoryListingModule {}
