import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { SimpleComponent } from '@app/shared/base-classes';

@Component({
	selector: 'mflooring-sqfoot-compound',
	templateUrl: './sqfoot-compound.component.html',
	styleUrls: ['./sqfoot-compound.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SqfootCompoundComponent extends SimpleComponent<null, null> {
	public length;
	public width;
	public result;
	public resultName = 'Calculate';
	public resultFlag = false;

	constructor() {
		super();
	}

	calculateResult() {
		if (!this.length || !this.width) {
			return;
		}
		this.resultFlag = true;
		//this.result = `${(this.length * this.width) | 0} SqFt`;
		this.result = (this.length * this.width).toFixed(2);
	}

	clearInfo() {
		this.resultFlag = false;
		this.result = 'Calculate';
		this.length = undefined;
		this.width = undefined;
	}
}
