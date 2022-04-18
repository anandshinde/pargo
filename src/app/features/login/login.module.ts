import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as fromContainers from './containers';
import * as fromComponents from './components';
import { SharedModule } from '@app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginFacade } from './login.facade';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
	declarations: [...fromContainers.containers, ...fromComponents.components],
	imports: [
		CommonModule,
		SharedModule,
		FormsModule,
		ReactiveFormsModule,
		MatDialogModule,
		MatFormFieldModule,
		MatIconModule,
	],
	exports: [...fromContainers.containers],
	providers: [LoginFacade],
})
export class LoginModule {}
