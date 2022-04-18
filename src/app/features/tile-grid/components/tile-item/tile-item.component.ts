//import { Component, OnInit } from '@angular/core';
import {
	Component,
	EventEmitter,
	Output,
	ChangeDetectionStrategy,
	OnInit,
	Inject,
	OnChanges,
	HostListener,
	SimpleChanges,
	Input,
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import {
	BaseSizeNames,
	BreakpointValues,
	HorizAlignmentNames,
	LinkCompoundColors,
	LinkCompoundTypes,
	LinkCompoundWidths,
	LinkTargetTypes,
	ThemeNames,
	ThemeTypes,
} from '@app/shared/constants';
import { BreakpointObserver } from '@angular/cdk/layout';

import { urlIsExternal } from '@shared/utilities/regex.utilities';
import { SimpleComponent } from '@shared/base-classes';

import {
	ImageModel,
	LinkCompoundPresentationProps,
	RichTextContentProps,
	RichTextPresentationProps,
	LinkCompound,
	TileGridProps,
} from '@shared/interfaces';
import { WINDOW } from '@shared/utilities/window';
import { map, switchMap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { TileGridComponent } from '../../containers';
import { Observable } from 'rxjs';
import { SimpleTileContent } from '@app/shared/interfaces/component-tileGrid.interface';

@Component({
	selector: 'mflooring-tile-item',
	templateUrl: './tile-item.component.html',
	styleUrls: ['./tile-item.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TileItemComponent
	extends SimpleComponent<SimpleTileContent, any>
	implements OnChanges
{
	public isMobile = null;
	public isMobile$ = new BehaviorSubject<boolean>(null);
	@Input() templateType:string;
	@HostListener('window:resize', ['$event']) onResize() {
		this.isMobile$.next(this.breakpoint.isMatched(BreakpointValues.mobileMax));
	}

	public inViewport$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
		true
	);

	public isInViewport(bool): void {
		this.inViewport$.next(bool);
	}
	// public tileItemData$: Observable<SimpleTileContent> = this.isMobile$.pipe(
	// 	switchMap((isMobile) => {
	// 		let info = this.content$.pipe(
	// 			map((content) => {
	// 				return {
	// 					...content,
	// 					link: {
	// 						content: {
	// 							...content?.link.content,
	// 						},
	// 						presentation: {
	// 							...content?.link?.presentation,
	// 							// theme:  ThemeNames.dark,
	// 							// buttonType: content?.link?.presentation?.buttonType,
	// 							// buttonWidth: LinkCompoundWidths.normal,
	// 							// buttonSize: BaseSizeNames.small,
	// 							// customClass: 'simple-tile-component',
	// 							// wrap: true,
	// 						},
	// 					},
	// 				};
	// 			})
	// 		);
	// 		return info;
	// 	})
	// );
	public tileItemData$: Observable<SimpleTileContent> =  this.content$.pipe(
		map((content) => {
			return {
				...content,
				link: {
					content: {
						...content?.link.content,
					},
					presentation: {
						...content?.link?.presentation,
						// theme:  ThemeNames.dark,
						// buttonType: content?.link?.presentation?.buttonType,
						// buttonWidth: LinkCompoundWidths.normal,
						// buttonSize: BaseSizeNames.small,
						// customClass: 'simple-tile-component',
						// wrap: true,
					},
				},
			};
		})
	);
	
	constructor(private breakpoint: BreakpointObserver) {
		super();
	}

	ngOnChanges(changes: SimpleChanges) {
		super.ngOnChanges(changes);

		this.isMobile$.next(this.breakpoint.isMatched(BreakpointValues.mobileMax));
	}
}
