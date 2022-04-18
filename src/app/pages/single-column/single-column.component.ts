import { ChangeDetectionStrategy, Component } from '@angular/core';

// APP IMPORTS

@Component({
	selector: 'mflooring-single-column',
	templateUrl: './single-column.component.html',
	styleUrls: ['./single-column.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SingleColumnComponent {
	public navIsStickyClass: string;

	public pageTemplate;
}
