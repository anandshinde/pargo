import { CanonicalService } from './canonical.service';
import { LayoutService } from './layout.service';
import { VideoPlayerService } from './video-player.service';
import { MessagesService } from './messages.service';
import { StorageService } from './storage.service';
import { UrlStateService } from './url-state.service';
import { TourService } from './tour.service';
import { Eventservice } from './events.service';
import { ScriptService } from './script.service';
import { ScrollService } from './scroll.service';
import { PageMetadataService } from './page-metadata.service';
import { AuthService } from '@core/services/auth.service';
import { CartService } from './cart.service';

export const coreServices: any[] = [
	CanonicalService,
	LayoutService,
	VideoPlayerService,
	MessagesService,
	StorageService,
	UrlStateService,
	TourService,
	Eventservice,
	ScriptService,
	ScrollService,
	PageMetadataService,
	AuthService,
    CartService,
];

export * from './canonical.service';
export * from './layout.service';
export * from './video-player.service';
export * from './messages.service';
export * from './storage.service';
export * from './url-state.service';
export * from './tour.service';
export * from './events.service';
export * from './script.service';
export * from './scroll.service';
export * from './page-metadata.service';
export * from '@core/services/auth.service';
export * from './cart.service';
