import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrSdkModule } from '@bloomreach/ng-sdk';
import { SharedModule } from '@shared/shared.module';
import * as fromContainers from './containers';
import * as fromComponents from './components';

@NgModule({
	declarations: [...fromContainers.containers, ...fromComponents.components],
	imports: [CommonModule, RouterModule, SharedModule, BrSdkModule],
	exports: [...fromContainers.containers, ...fromComponents.components],
	providers: [],
})
export class TrendCollectionModule {}
