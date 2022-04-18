import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TransferInterceptorService } from '@core/interceptors/transfer.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
	CMS_BASE_URL,
	EntryComponent,
	SPA_BASE_URL,
} from '@app/entry/entry.component';

import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '@env/environment';
import { BrSdkModule } from '@bloomreach/ng-sdk';
import { FeaturesModule } from '@features/features.module';
import { PagesModule } from '@app/pages/pages.module';
import { SharedModule } from '@shared/shared.module';
import { ParseUrlPipe } from '@shared/pipes/parse-url.pipe';
import { IsExternalLinkPipe } from '@shared/pipes/is-external-link.pipe';
import { IsInternalLinkPipe } from '@shared/pipes/is-internal-link.pipe';
import { TokenInterceptor } from './core/interceptors/token.interceptor';

// import {MatFormFieldModule,MatInputModule,MatIconModule,} from '@angular/material';

@NgModule({
	declarations: [
		AppComponent,
		EntryComponent,
		ParseUrlPipe,
		IsExternalLinkPipe,
		IsInternalLinkPipe,
	],
	imports: [
		AppRoutingModule,
		BrowserModule.withServerTransition({ appId: 'serverApp' }),
		BrowserAnimationsModule,
		BrSdkModule,
		FeaturesModule,
		PagesModule,
		SharedModule,

		ServiceWorkerModule.register('ngsw-worker.js', {
			enabled: environment.production,
			// Register the ServiceWorker as soon as the app is stable
			// or after 30 seconds (whichever comes first).
			registrationStrategy: 'registerWhenStable:30000',
		}),
	],
	providers: [
		{ provide: CMS_BASE_URL, useValue: environment.cmsBaseUrl },
		{ provide: SPA_BASE_URL, useValue: environment.spaBaseUrl },
		{
			provide: HTTP_INTERCEPTORS,
			useClass: TokenInterceptor,
			multi: true,
		},
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
