import { UtilityActionsComponent } from './utility-actions/utility-actions.component';
import { UtilityDesktopComponent } from './utility-desktop/utility-desktop.component';
import { UtilityMobileComponent } from './utility-mobile/utility-mobile.component';
import { UtilityActionsdialogComponent } from './utility-actionsdialog/utility-actionsdialog.component';

export const components: any = [
	UtilityActionsComponent,
	UtilityDesktopComponent,
	UtilityMobileComponent,
	UtilityActionsdialogComponent,
];

export * from './utility-actions/utility-actions.component';
export * from './utility-desktop/utility-desktop.component';
export * from './utility-mobile/utility-mobile.component';

export const entryComponents: any = [UtilityActionsdialogComponent];
