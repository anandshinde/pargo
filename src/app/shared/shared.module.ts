import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
// MATERIAL
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { RouterModule } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserModule } from '@angular/platform-browser';
// 3RD PARTY
import {
	SwiperConfigInterface,
	SwiperModule,
	SWIPER_CONFIG,
} from 'ngx-swiper-wrapper';

// Mohawk Flooring
import { VideoPlayerModule } from '@shared/components/video-player/video-player.module';

import * as fromSharedComponents from './components';
import * as fromPipes from './pipes';
import * as fromDirectives from './directives';
import { FooterInputTextComponent } from '@app/features/global-footer/components/footer-input-text/footer-input-text.component';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
	direction: 'horizontal',
	slidesPerView: 'auto',
};

@NgModule({
	declarations: [
		...fromPipes.pipes,
		...fromDirectives.directives,
		...fromSharedComponents.sharedComponents,
		FooterInputTextComponent,
	],

	exports: [
		...fromSharedComponents.sharedComponents,
		...fromPipes.pipes,
		...fromDirectives.directives,
		VideoPlayerModule,
		FooterInputTextComponent,
	],
	imports: [
		CommonModule,
		RouterModule,
		MatExpansionModule,
		SwiperModule,
		ReactiveFormsModule,
		VideoPlayerModule,
		MatRadioModule,
		MatMenuModule,
		MatSelectModule,
		MatCheckboxModule,
		FormsModule,
		MatProgressSpinnerModule,
		GoogleMapsModule
	],
	providers: [{ provide: SWIPER_CONFIG, useValue: DEFAULT_SWIPER_CONFIG }],
})
export class SharedModule {}
