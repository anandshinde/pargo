import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
	selector: 'mflooring-please-configure',
	styleUrls: ['./please-configure.component.scss'],
	template: ` <div class="please-configure">
		<strong
			><span class="icon-">right</span>Please configure the
			{{ componentName }} document</strong
		>
	</div>`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PleaseConfigureComponent {
	@Input() componentName: string;
}
