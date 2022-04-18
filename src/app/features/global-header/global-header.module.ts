import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@app/shared/shared.module';
import { BrSdkModule } from '@bloomreach/ng-sdk';
import { MatDialogModule } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import * as fromMainComponents from './global-main-header/components';
import * as fromMainContainers from './global-main-header/containers';
import * as fromUtilityComponents from './global-utility-header/components';
import * as fromUtilityContainers from './global-utility-header/containers';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
	declarations: [
		...fromUtilityContainers.containers,
		...fromUtilityComponents.components,
		...fromMainComponents.components,
		...fromMainContainers.containers,
	],
	imports: [
		CommonModule,
		RouterModule,
		SharedModule,
		BrSdkModule,
		MatExpansionModule,
		MatMenuModule,
		MatDialogModule,
		ReactiveFormsModule,
		MatAutocompleteModule,
		MatFormFieldModule,
	],
	exports: [
		...fromUtilityContainers.containers,
		...fromMainContainers.containers,
	],
	entryComponents: [
		...fromUtilityComponents.entryComponents,
		...fromMainComponents.entryComponents,
	],
})
export class GlobalHeaderModule {}
