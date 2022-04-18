import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { MessageBarProps } from '@shared/interfaces';
import { Colors } from '@shared/constants';

const baseMessage = {
	message: null,
	color: null,
	isError: false,
	autoClose: true,
	duration: 10000,
};

@Injectable({
	providedIn: 'root',
})
export class MessagesService {
	private _responseMessage: BehaviorSubject<MessageBarProps> = new BehaviorSubject<MessageBarProps>(
		null
	);

	constructor() {}

	public getResponseMessage(): Observable<MessageBarProps> {
		return this._responseMessage as Observable<MessageBarProps>;
	}

	public setResponseMessage(payload: MessageBarProps): void {
		if (!payload) {
			this._responseMessage.next(null);
			return;
		}
		const data = { ...baseMessage, ...payload };
		const color = !!data.color
			? data.color
			: data.isError
			? Colors.red
			: Colors.green;

		this._responseMessage.next({
			...data,
			color,
		});
	}
}
