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
import {BehaviorSubject, Observable} from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'mflooring-blog-card',
  templateUrl: './blog-card.component.html',
  styleUrls: ['./blog-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogCardComponent
	extends SimpleComponent<any, any>
	implements OnChanges
{
	public isMobile = this.breakpoint.isMatched(BreakpointValues.mobileMax);
	// public isMobile$ = new BehaviorSubject<boolean>(null);

	@HostListener('window:resize', ['$event']) onResize() {
		this.isMobile = this.breakpoint.isMatched(BreakpointValues.mobileMax);

	}

	constructor(private breakpoint: BreakpointObserver) {
		super();
	}

	public blogCardContent$: Observable<any> = this.content$.pipe(
		map((data) => {
			return {
				title: data?.title ? data?.title : null,
				description: data?.description ? data?.description : null,
				image: data?.image ? data?.image : null,
				link: data?.link ? data?.link : null,
				socialShare: data?.socialShare,
				date: data?.date ? data?.date : null,
			};
		})
	);

	public blogCardPresentation$: Observable<any> = this.presentation$.pipe(
		map((data) => {
			return data;
		})
	);

	ngOnChanges(changes: SimpleChanges): void {
		super.ngOnChanges(changes);
	}
}
