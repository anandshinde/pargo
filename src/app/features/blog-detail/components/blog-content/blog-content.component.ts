import {
	ChangeDetectionStrategy,
	Component,
	OnChanges,
	SimpleChanges,
} from '@angular/core';
import { SimpleComponent } from '@app/shared/base-classes';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'mflooring-blog-content',
  templateUrl: './blog-content.component.html',
  styleUrls: ['./blog-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogContentComponent extends SimpleComponent<any, any>
implements OnChanges{
  constructor() {
		super();
	}

	public blogContentContent$: Observable<any> = this.content$.pipe(
		map((data) => {
			return {
				content: data?.content ? data?.content : [],
			};
		})
	);

	public blogContentPresentation$: Observable<any> = this.presentation$.pipe(
		map((data) => {
			return data;
		})
	);
}
