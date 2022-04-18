import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { BrSdkModule } from '@bloomreach/ng-sdk';

import * as fromContainers from './containers';
import * as fromComponents from './components';
import { TileItemWFindRetailerComponent } from './components/tile-item-w-findretailer/tile-item-w-findretailer.component';


@NgModule({
	declarations: [...fromContainers.containers, ...fromComponents.components, TileItemWFindRetailerComponent],
	imports: [CommonModule, SharedModule, BrSdkModule],
	exports: [...fromContainers.containers, ...fromComponents.components],
})
export class TileGridModule {}
