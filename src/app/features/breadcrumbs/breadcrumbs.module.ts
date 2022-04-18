import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { BrSdkModule } from '@bloomreach/ng-sdk';
import * as fromComponents from './components';
import * as fromContainers from './containers';
import { RouterModule } from '@angular/router';

@NgModule({
	declarations: [...fromComponents.components, ...fromContainers.containers],
	imports: [BrSdkModule, SharedModule, CommonModule, RouterModule],
	exports: [...fromContainers.containers],
})
export class BreadcrumbsModule {}
