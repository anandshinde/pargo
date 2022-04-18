import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { SimpleComponent } from '@app/shared/base-classes';
@Component({
	selector: 'mflooring-gallery-form-chips',
	templateUrl: './gallery-form-chips.component.html',
	styleUrls: ['./gallery-form-chips.component.scss'],
})
export class GalleryFormChipsComponent {
	@Input() control: AbstractControl;
	@Output() chipRemoved = new EventEmitter<any>();

	readonly animationDuration = { enter: '0ms', leave: '0ms' };
	constructor() {}

	remove(item: any) {
		this.chipRemoved.emit(item);
	}
}
