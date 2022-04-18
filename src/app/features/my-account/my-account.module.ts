import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@app/shared/shared.module';
import { AccountApi } from '@core/http/account.api';
import * as fromComponents from './components';
import * as fromContainers from './containers';
import { MyAccountFacade } from './my-account.facade';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MyAccountFormComponent } from './components/my-account-form/my-account-form.component';

@NgModule({
	declarations: [
		...fromComponents.components,
		...fromContainers.containers,
		MyAccountFormComponent,
	],
	imports: [
		CommonModule,
		SharedModule,
		FormsModule,
		ReactiveFormsModule,
		MatExpansionModule,
		MatDividerModule,
		MatIconModule,
	],
	providers: [MyAccountFacade, AccountApi],
	exports: [...fromContainers.containers],
})
export class MyAccountModule {}
