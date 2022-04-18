import { __decorate } from 'tslib';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { promosModuleView } from './views/promos/promos.module';
let AppModule = class AppModule {};
AppModule = __decorate(
	[
		NgModule({
			declarations: [AppComponent],
			imports: [BrowserModule, AppRoutingModule, ...promosModuleView.modules],
			providers: [],
			bootstrap: [AppComponent],
		}),
	],
	AppModule
);
export { AppModule };
//# sourceMappingURL=app.module.js.map
