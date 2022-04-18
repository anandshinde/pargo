import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedModule } from '@app/shared/shared.module';
import { BrSdkModule } from '@bloomreach/ng-sdk';
import { SwiperModule } from 'swiper/angular';
import * as fromComponents from './components';
import * as fromContainers from './containers';

@NgModule({
	declarations: [...fromComponents.components, ...fromContainers.containers],
	imports: [
		BrSdkModule,
		SharedModule,
		MatExpansionModule,
		MatTabsModule,
		CommonModule,
		SwiperModule
	],
	exports: [...fromContainers.containers],
})
export class TabbedContentModule {}
