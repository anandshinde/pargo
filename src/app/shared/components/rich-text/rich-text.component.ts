import {
	ChangeDetectionStrategy,
	Component,
	OnChanges,
	SimpleChanges,
	ViewEncapsulation,
} from '@angular/core';
import { SimpleComponent } from '@shared/base-classes';
import { ThemeTypes } from '@shared/constants';
import {
	RichTextContentProps,
	RichTextPresentationProps,
} from '@shared/interfaces';

@Component({
	selector: 'mflooring-rich-text-compound',
	templateUrl: './rich-text.component.html',
	styleUrls: ['./rich-text.component.scss'],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RichTextComponent
	extends SimpleComponent<RichTextContentProps, RichTextPresentationProps>
	implements OnChanges {
	public richText: any;
	public isContentExpanded: boolean;
	public themeClass: string;
	public isLimitedContent: boolean;
	public heightLimit: string;
	public typeClass: string;
	public componentClass: string;

	constructor() {
		super();
	}

	get showEllipsis() {
		return this.isContentExpanded ?? this.isLimitedContent;
	}

	// Enforce to expand the content.
	public expandContent(event) {
		this.isContentExpanded = false;
	}

	ngOnChanges(changes: SimpleChanges) {
		this.richText = this.content?.richText || '';
		// Temporary status that takes the "isLimitedContent" value as default.
		this.themeClass = `theme-${this.presentation?.theme || ThemeTypes.light}`;
		this.componentClass = this.presentation?.component
			? `component-${this.presentation?.component}`
			: '';
		this.isLimitedContent = !!this.presentation?.heightLimit;
		this.heightLimit = this.presentation?.heightLimit || 'auto';
		this.typeClass = this.presentation?.type || '';
	}
}
