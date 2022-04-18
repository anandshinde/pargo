import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { MatExpansionModule } from '@angular/material/expansion';

import { MatStepperModule } from '@angular/material/stepper';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import * as fromContainers from './containers';
import * as fromComponents from './components';
import { FindRetailerFacadeService } from './find-retailer-facade.service';
import { RetailerApptModalComponent } from './components/retailer-appt-modal/retailer-appt-modal.component';

@NgModule({
	declarations: [
		...fromContainers.containers,
		...fromComponents.components,
		RetailerApptModalComponent,
	],
	imports: [
		CommonModule,
		SharedModule,
		ReactiveFormsModule,
		MatSelectModule,
		MatDialogModule,
		MatRadioModule,
		MatStepperModule,
		MatExpansionModule,
		CdkStepperModule,
		CalendarModule.forRoot({
			provide: DateAdapter,
			useFactory: adapterFactory,
		}),
		RouterModule,
	],
	providers: [FindRetailerFacadeService, DatePipe],
	exports: [...fromContainers.containers, ...fromComponents.components],
	entryComponents: [],
})
export class FindRetailerModule {}
