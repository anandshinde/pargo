import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@app/shared/shared.module';
import { AccountApi } from '../../core/http/account.api';
import * as fromComponents from './components';
import * as fromContainers from './containers';
import { CreateAccountFacade } from './create-account.facade';

@NgModule({
	declarations: [...fromComponents.components, ...fromContainers.containers],
	imports: [CommonModule, SharedModule, ReactiveFormsModule, RouterModule],
	providers: [CreateAccountFacade, AccountApi],
	exports: [...fromContainers.containers],
})
export class CreateAccountModule {}
