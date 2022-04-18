import { __decorate } from 'tslib';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as fromContainers from './containers';
let PromosModule = class PromosModule {};
PromosModule = __decorate(
	[
		NgModule({
			declarations: [...fromContainers.containers],
			imports: [CommonModule],
		}),
	],
	PromosModule
);
export { PromosModule };
export const promosModuleView = {
	modules: [PromosModule],
	routes: [
		{
			path: 'basic-promos',
			component: fromContainers.BasicPromoComponent,
		},
	],
};
//# sourceMappingURL=promos.module.js.map
