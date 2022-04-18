import { conditionallyCreateMapObjectLiteral } from '@angular/compiler/src/render3/view/util';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
	BloomreachBaseClass,
	BloomreachContentList,
} from '@app/core/bloomreach';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BlogDetailMapper } from './blog-detail.mapper';

@Component({
  selector: 'mflooring-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogDetailComponent extends BloomreachBaseClass implements OnInit  {
  constructor() {
		super();
	}

   public blogDetailContent$: Observable<any> = this.componentData$.pipe(
		map((data: any | BloomreachContentList) => {
			return BlogDetailMapper(data, this.page);
		})
	);

	public blogDetailParams$: Observable<any> = this.componentParameters$.pipe(
		map((params: any) => {
			return params;
		})
	);

	ngOnInit(): void {
		super.ngOnInit();
   
	}

}
