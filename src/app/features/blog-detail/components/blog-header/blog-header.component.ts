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
  selector: 'mflooring-blog-header',
  templateUrl: './blog-header.component.html',
  styleUrls: ['./blog-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogHeaderComponent
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

	public blogHeaderContent$: Observable<any> = this.content$.pipe(
		map((data) => {
			return {
				title: data?.title ? data?.title : null,
				description: data?.description ? data?.description : null,
				author: data?.author ? data?.author : null,
				award: data?.award ? data?.award : null,
				date: data?.date ? data?.date : null,
				readTime: data?.readTime ? data?.readTime : null,
				socialShare: data?.socialShare,
				superHeading: data?.superHeading ? data?.superHeading : null,
				image: data?.image ? data?.image : null,
				greyHeader: data?.greytitle,
			};
		})
	);

	public blogHeaderPresentation$: Observable<any> = this.presentation$.pipe(
		map((data) => {
			return data;
		})
	);

	ngOnChanges(changes: SimpleChanges): void {
		super.ngOnChanges(changes);
	}
}

