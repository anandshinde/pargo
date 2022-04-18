import { MainDesktopComponent } from './main-desktop/main-desktop.component';
import { MainExpansionPanelDesktopComponent } from './main-expansion-panel-desktop/main-expansion-panel-desktop.component';
import { MainMobileComponent } from './main-mobile/main-mobile.component';
import { MessageBarComponent } from './message-bar/message-bar.component';
import { MainHeaderSearchComponent } from './main-header-search/main-header-search.component';

export const components: any = [
	MainDesktopComponent,
	MainMobileComponent,
	MainExpansionPanelDesktopComponent,
	MessageBarComponent,
	MainHeaderSearchComponent,
];

export * from './main-desktop/main-desktop.component';
export * from './main-expansion-panel-desktop/main-expansion-panel-desktop.component';
export * from './main-mobile/main-mobile.component';
export * from './message-bar/message-bar.component';
export * from './main-header-search/main-header-search.component';

export const entryComponents: any = [MainHeaderSearchComponent];
