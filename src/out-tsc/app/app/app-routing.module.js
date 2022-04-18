import { __decorate } from 'tslib';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { promosModuleView } from './views/promos/promos.module';
const routes = [...promosModuleView.routes];
let AppRoutingModule = class AppRoutingModule {};
AppRoutingModule = __decorate(
	[
		NgModule({
			imports: [RouterModule.forRoot(routes)],
			exports: [RouterModule],
		}),
	],
	AppRoutingModule
);
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map
