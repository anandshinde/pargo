import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {
	ServerModule,
	ServerTransferStateModule,
} from '@angular/platform-server';
import { BrowserModule } from '@angular/platform-browser';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';

import { TransferInterceptorService } from '@core/interceptors/transfer.interceptor';

@NgModule({
	imports: [
		BrowserModule.withServerTransition({ appId: 'mohawkflooringApp' }),
		AppModule,
		ServerModule,
		ServerTransferStateModule,
	],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: TransferInterceptorService,
			multi: true,
		},
	],
	bootstrap: [AppComponent],
})
export class AppServerModule {}
