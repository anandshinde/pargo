import {
	ChangeDetectionStrategy,
	Component,
	OnInit,
	Output,
	EventEmitter,
	Input,
} from '@angular/core';
import { SimpleComponent } from '@app/shared/base-classes';
import { FaqTypes, ThemeTypes, CompoundTypes } from '@app/shared/constants';
import {
	FaqCompoundContentProps,
	FaqCompoundPresentationProps,
} from '@app/shared/interfaces';

@Component({
	selector: 'mflooring-faq-compound',
	templateUrl: './faq-compound.component.html',
	styleUrls: ['./faq-compound.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FaqCompoundComponent
	extends SimpleComponent<FaqCompoundContentProps, FaqCompoundPresentationProps>
	implements OnInit
{
	@Output() openPanel = new EventEmitter<any>(null);
	@Output() closePanel = new EventEmitter<any>(null);
	@Input() isOpened = false;
	@Input() index;
	@Input() selectedAccIndex;
	private theme: string;
	public themeClass: string;
	public typeClass: string;

	public headerIsDark: boolean;
	public headerIsBlue: boolean;
	public headerAlignment: string;
	public isExpanded: boolean;
	public readLess = {};
	public isReadMore: boolean;
	public types;

	public readonly caretIcons: Map<string, string> = new Map([
		[FaqTypes.accordion, 'down'],
		[FaqTypes.faq, 'down'],
	]);

	public trackBy(index: number, el: any) {
		return el.index;
	}
	callPanelOpener(panel) {
		this.isExpanded = true;
		this.openPanel.emit(panel);
	}
	callPanelClossed(index) {
		this.closePanel.emit(index);
	}

	ngOnInit(): void {
		this.types = CompoundTypes;
		const { theme, type } = this.presentation;
		this.readLess = {
			richText: '<p><u><strong>Read Less</strong></u></p>',
		};
		this.theme = theme || ThemeTypes.light;
		this.themeClass = `theme-${this.theme}`;
		this.typeClass = type || '';
		this.headerIsDark = !!this.content?.title?.color.includes('dark');
		this.headerIsBlue = !!this.content?.title?.color.includes('blue');
		this.content.title.presentation = { component: 'accordion-title' };
		this.headerAlignment = this.content?.title?.alignment || '';
		this.isExpanded = false;
		this.isReadMore =
			this.content?.title?.content?.richText.includes('Read More');
	}
}
