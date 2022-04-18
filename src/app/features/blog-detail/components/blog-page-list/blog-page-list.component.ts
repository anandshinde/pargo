import { BreakpointObserver } from '@angular/cdk/layout';
import {
	ChangeDetectionStrategy,
	Component,
	HostListener,
	OnChanges,
	SimpleChanges,
} from '@angular/core';

import { SimpleComponent } from '@app/shared/base-classes';
import { BreakpointValues } from '@app/shared/constants';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Component({
  selector: 'mflooring-blog-page-list',
  templateUrl: './blog-page-list.component.html',
  styleUrls: ['./blog-page-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogPageListComponent
	extends SimpleComponent<any, any>
	implements OnChanges
{
	public isMobile = this.breakpoint.isMatched(BreakpointValues.mobileMax);

	

	@HostListener('window:resize', ['$event']) onResize() {
		this.isMobile = this.breakpoint.isMatched(BreakpointValues.mobileMax);
	}

	constructor(private breakpoint: BreakpointObserver) {
		super();
	}

	public blogPageListContent$: Observable<any> = this.content$.pipe(
		map((data) => {
			return {
				blogList: data?.blogList ? data?.blogList : null,
			};
		})
	);

	public blogPageListPresentation$: Observable<any> = this.presentation$.pipe(
		map((data) => {
			return data;
		})
	);


	public trackBy(index: number, el: any): number {
		return el.index;
	}

	ngOnChanges(changes: SimpleChanges): void {
		super.ngOnChanges(changes);
	}

}
