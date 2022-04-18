import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@app/shared/shared.module';
import { AccountApi } from '../../core/http/account.api';
import * as fromComponents from './components';
import * as fromContainers from './containers';
import { ForgotPwdFacade } from './forgot-pwd.facade';

@NgModule({
	declarations: [...fromComponents.components, ...fromContainers.containers],
	imports: [CommonModule, SharedModule, FormsModule, ReactiveFormsModule],
	providers: [ForgotPwdFacade, AccountApi],
	exports: [...fromContainers.containers],
})
export class ForgotPwdModule {}
