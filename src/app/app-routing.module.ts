import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EntryComponent } from '@app/entry/entry.component';
import { AccountGuard } from './core/guards';

const standardRoutes: Routes = [
	{
		path: '**',
		component: EntryComponent,
		canActivate: [AccountGuard],
	},
];

@NgModule({
	imports: [
		RouterModule.forRoot([...standardRoutes], {
			initialNavigation: 'enabled',
			scrollOffset: [0, 160],
			relativeLinkResolution: 'legacy',
			onSameUrlNavigation: 'ignore',
			scrollPositionRestoration: 'top',
		}),
	],
	exports: [RouterModule],
})
export class AppRoutingModule {}
