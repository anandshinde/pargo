import { CalendarDateFormatter, DateFormatterParams } from 'angular-calendar';
import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import { breakpoints } from '@shared/constants';
import { BreakpointObserver } from '@angular/cdk/layout';

@Injectable({
	providedIn: 'root'
  })
export class CustomDateFormatter extends CalendarDateFormatter {
	constructor(private breakpoint: BreakpointObserver) {
		super(null);
	}

	public monthViewColumnHeader({ date, locale }: DateFormatterParams): string {
		if (this.breakpoint.isMatched(breakpoints.mobileMax)) {
			return formatDate(date, 'EEE', locale);
		}
		return formatDate(date, 'EEEE', locale);
	}
}
