import {
	Component,
	HostListener,
	Input,
	OnInit,
	ViewChild,
	ChangeDetectionStrategy
} from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { MatMenuTrigger } from '@angular/material/menu';
import { SimpleComponent } from '@app/shared/base-classes';
import {
	RadioButtonContentProps,
	SelectFilterContentProps,
	SelectFilterPresentationProps,
} from '@app/shared/interfaces';

@Component({
	selector: 'mflooring-select-filter',
	templateUrl: './select-filter.component.html',
	styleUrls: ['./select-filter.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectFilterComponent extends SimpleComponent<
	SelectFilterContentProps,
	SelectFilterPresentationProps
> {
	public isSelectOpened = false;
	@Input() control: AbstractControl;
	@ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

	@HostListener('window:scroll', ['$event']) onScroll(): void {
		this.trigger.closeMenu();
	}

	openSelect(): void {
		this.isSelectOpened = true;
	}

	closeSelect(): void {
		this.isSelectOpened = false;
	}

	get category(): string {
		return this.content?.category || '';
	}
}
