import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'mflooring-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	changeDetection: ChangeDetectionStrategy.Default,
})
export class AppComponent {
	title = 'mohawkflooring';
}
