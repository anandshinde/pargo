import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { BrSdkModule } from '@bloomreach/ng-sdk';
import { SwiperModule } from 'swiper/angular';
import * as fromContainers from './containers';
import * as fromComponents from './components';


@NgModule({
  declarations: [...fromContainers.containers],
  imports: [
    CommonModule,
    BrSdkModule,
		SharedModule,
    SwiperModule
  ],
  exports: [...fromContainers.containers],
	entryComponents: [...fromComponents.entryComponents],
})
export class ImageCarouselModule { }