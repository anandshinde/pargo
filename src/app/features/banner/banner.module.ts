import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as fromContainers from './containers';
import * as fromComponents from './components';
import { SharedModule } from '@app/shared/shared.module';
import { SwiperModule } from 'swiper/angular';

@NgModule({
	declarations: [...fromComponents.components, ...fromContainers.containers],
	imports: [CommonModule, SharedModule, SwiperModule],
	exports: [...fromComponents.components, ...fromContainers.containers],
})
export class BannerModule {}
