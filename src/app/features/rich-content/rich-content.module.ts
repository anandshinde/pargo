import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatExpansionModule } from '@angular/material/expansion';
import { SwiperModule } from 'swiper/angular';
import { BrSdkModule } from '@bloomreach/ng-sdk';

import { SharedModule } from '@shared/shared.module';
import * as fromContainers from './containers';
import * as fromComponents from './components';

@NgModule({
	declarations: [...fromContainers.containers, ...fromComponents.components],
	imports: [
		CommonModule,
		SharedModule,
		BrSdkModule,
		MatExpansionModule,
		SwiperModule,
	],
})
export class RichContentModule {}
