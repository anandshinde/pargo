import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import * as fromCoreServices from './services';

@NgModule({
	declarations: [],
	imports: [CommonModule],
	providers: [...fromCoreServices.coreServices],
	exports: [],
})
export class CoreModule {}
