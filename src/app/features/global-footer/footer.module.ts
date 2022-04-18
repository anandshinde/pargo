import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@app/shared/shared.module';
import { BrSdkModule } from '@bloomreach/ng-sdk';
import * as fromComponents from './components';
import * as fromContainers from './containers';
import { FormsModule } from '@angular/forms';

@NgModule({
	declarations: [...fromContainers.containers, ...fromComponents.components],
	imports: [
		CommonModule,
		SharedModule,
		RouterModule,
		BrSdkModule,
		MatExpansionModule,
		FormsModule,
	],
	exports: [...fromContainers.containers],
})
export class FooterModule {}
