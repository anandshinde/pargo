import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { MessageBarProps } from '@shared/interfaces';
import { SimpleComponent } from '@shared/base-classes';
import { MessagesService } from '@core/services';

@Component({
	selector: 'mflooring-message-bar',
	templateUrl: './message-bar.component.html',
	styleUrls: ['./message-bar.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [
		trigger('responseMessage', [
			transition(':enter', [
				style({ transform: 'translateY(-100%)' }),
				animate('250ms', style({ transform: 'translateY(0)' })),
			]),
			transition(':leave', [
				animate('250ms', style({ transform: 'translateY(-100%)' })),
			]),
		]),
	],
})
export class MessageBarComponent
	extends SimpleComponent<any, any>
	implements OnInit {
	public messages$: Observable<MessageBarProps>;
	constructor(private messages: MessagesService) {
		super();
	}

	public closeMessageBar(): void {
		this.messages.setResponseMessage(null);
	}

	ngOnInit(): void {
		this.messages$ = this.messages.getResponseMessage().pipe(
			map((data: MessageBarProps) => {
				if (!data) {
					return null;
				}

				if (data?.autoClose) {
					setTimeout(() => {
						this.closeMessageBar();
					}, data?.duration || 10000);
				}
				return data;
			})
		);
	}
}
