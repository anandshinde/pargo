import {
	ChangeDetectionStrategy,
	Component,
	OnInit,
	Inject,
} from '@angular/core';

// APP IMPORTS
import { SimpleComponent } from '@app/shared/base-classes/simple-component.base';
import {
	PdfCompoundPresentationProps,
	PdfCompound,
} from '@app/shared/interfaces';
import { ThemeTypes } from '@shared/constants/layout.constants';
import { Eventservice } from '@core/services';
import { WINDOW } from '@app/shared/utilities/window';

@Component({
	selector: 'mflooring-pdf-compound',
	templateUrl: './pdf-compound.component.html',
	styleUrls: ['./pdf-compound.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PdfCompoundComponent
	extends SimpleComponent<PdfCompound, PdfCompoundPresentationProps>
	implements OnInit {
	public themeClass: string;
	public pdfCompoundLink: string;
	public pdfCompoundLabel: string;

	constructor(
		@Inject(WINDOW) private windowRef: Window,
		public eventservice: Eventservice
	) {
		super();
	}

	ngOnInit(): void {
		this.themeClass = `theme-${this.presentation?.theme || ThemeTypes.light}`;
		this.pdfCompoundLink = this.content?.url || '';
		this.pdfCompoundLabel =
			this.content?.description || this.content?.displayName || 'Download';
	}

	onPdfClick(): void {
		this.windowRef.open(this.pdfCompoundLink, '_blank');

		this.eventservice.downloadLinkClicked({
			linkId: this.pdfCompoundLabel,
			fileName: this.pdfCompoundLink,
		});
	}
}
