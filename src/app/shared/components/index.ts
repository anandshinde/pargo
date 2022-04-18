// Decorated Base Classes must be declared in a module
import { LogoComponent } from '@shared/components/logo/logo.component';
import { LayoutWrapperComponent } from '@shared/components/layout-wrapper/layout-wrapper.component';
import { RichTextComponent } from '@shared/components/rich-text/rich-text.component';
import { ExpansionMenuMobileComponent } from '@shared/components/expansion-menu-mobile/expansion-menu-mobile.component';
import { MenuItemComponent } from '@shared/components/menu-item/menu-item.component';
import { CarouselWrapperComponent } from '@shared/components/carousel-wrapper/carousel-wrapper.component';
import { RichContentComponentMapComponent } from '@shared/components/rich-content-component-map/rich-content-component-map.component';
import { PleaseConfigureComponent } from '@shared/components/please-configure/please-configure.component';
import { PasswordRequirementsComponent } from '@shared/components/password-requirements/password-requirements.component';
import { LoadingComponent } from '@shared/components/loading/loading.component';
import { MappingComponent } from '@shared/components/mapping/mapping.component';
import { CartModalComponent } from '@shared/components/cart-modal/cart-modal.component';


import * as fromCompounds from '@shared/components/compounds/';
import * as fromFormControls from '@shared/components/form-controls/';
import { IconButtonComponent } from './icon-button/icon-button.component';
import { LogoFooterComponent } from './logo-footer/logo-footer.component';
import * as fromSmartComponents from '@shared/components/smart';

export const sharedComponents: any[] = [
	...fromFormControls.formControls,
	...fromCompounds.compounds,
	...fromSmartComponents.smartComponents,
	LayoutWrapperComponent,
	MenuItemComponent,
	RichTextComponent,
	LogoComponent,
	LogoFooterComponent,
	ExpansionMenuMobileComponent,
	CarouselWrapperComponent,
	RichContentComponentMapComponent,
	PleaseConfigureComponent,
	PasswordRequirementsComponent,
	LoadingComponent,
	MappingComponent,
	CartModalComponent,
	IconButtonComponent

];

export const sharedEntryComponents = [
	
	CartModalComponent,
];

// Compounds export
export * from '@shared/components/logo/logo.component';
export * from '@shared/components/logo-footer/logo-footer.component';
export * from '@shared/components/layout-wrapper/layout-wrapper.component';
export * from '@shared/components/menu-item/menu-item.component';
export * from '@shared/components/rich-text/rich-text.component';
export * from '@shared/components/carousel-wrapper/carousel-wrapper.component';
export * from '@shared/components/rich-content-component-map/rich-content-component-map.component';
export * from '@shared/components/please-configure/please-configure.component';
export * from '@shared/components/password-requirements/password-requirements.component';
export * from '@shared/components/loading/loading.component';
export * from '@shared/components/mapping/mapping.component';
export * from '@shared/components/icon-button/icon-button.component';


export * from '@shared/components/compounds';
export * from '@shared/components/smart';

export * from '@shared/components/form-controls';
