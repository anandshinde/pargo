import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BloomreachBaseClass, BloomreachContentList } from '@core/bloomreach';
import { BreakpointObserver } from '@angular/cdk/layout';
import { breakpoints, StorageKeys } from '@app/shared/constants';
import { map, take } from 'rxjs/operators';
import { TileGridMapper } from '../../tile-grid.mapper';
import { TileGridProps } from '@app/shared/interfaces';
import { HostListener } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
	selector: 'mflooring-tile-grid',
	templateUrl: './tile-grid.component.html',
	styleUrls: ['./tile-grid.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TileGridComponent extends BloomreachBaseClass implements OnInit {
	public readonly name = 'Tile Grid';
	public tileGridType: string;
	public tileFlipped: boolean;
	public tileGridContent: TileGridProps[];
	show = false;
	tileCount = 4;
	isMobile: any;
	public tileGridTemplate$ = this.componentParameters$.pipe(
		map((params: any) => {
			return params;
		})
	);

	public tileGridContent$ = this.componentData$.pipe(
		take(1),
		map((data: BloomreachContentList) => {
			return TileGridMapper(data, this.page);
		})
	);

	constructor(private breakpoint: BreakpointObserver) {
		super();
	}
	@HostListener('window:resize', ['$event']) onResize() {
		this.isMobile = this.breakpoint.isMatched(breakpoints.mobileMax);
		// if(this.isMobile){
		//   this.tileCount=3;
		// }
		// else{
		//   this.tileCount=4;
		// }
	}

  public trackBy(index: number, el: any): number {
    return el.index;
  }
  scrollToTop(): void {
    window.scrollTo(0, 350);
    }

  	ngOnInit(): void {
		super.ngOnInit();
		this.isMobile = this.breakpoint.isMatched(breakpoints.mobileMax);
		this.tileGridType = this.component.getParameters().template;
		this.tileFlipped = this.component.getParameters().flipped;
	}
	loadMore() {
		if (this.isMobile) {
			this.tileCount = this.tileCount + 2;
		} else {
			this.tileCount = this.tileCount + 2;
		}
		this.show = true;
	}
	loadless() {
		if (this.isMobile) {
			this.tileCount = 4;
		} else {
			this.tileCount = 4;
		}
	}
}
