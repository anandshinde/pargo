import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as fromPages from './index';

@NgModule({
	declarations: [...fromPages.pageTemplates],
	imports: [CommonModule],
	exports: [...fromPages.pageTemplates],
})
export class PagesModule {}
