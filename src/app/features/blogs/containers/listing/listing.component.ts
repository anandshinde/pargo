import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, HostListener, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { BloomreachBaseClass } from '@app/core/bloomreach';
import {
	animateHorizontal,
	animateVertical,
} from '@app/shared/animations/animations-simple.animation';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { BlogsMapper } from '../../blogs.mapper';
import { breakpoints, StorageKeys } from '@app/shared/constants';

@Component({
	selector: 'mflooring-listing',
	templateUrl: './listing.component.html',
	styleUrls: ['./listing.component.scss'],
	animations: [animateVertical, animateHorizontal],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListingComponent extends BloomreachBaseClass implements OnInit {
	filterdata: any;
	data: any;
	x = true;
	y = false;
	z = false;
	show = false;
	isMobile: any;
	pageCount = 6;
	categories = [];
	selectedCategory = 'View All';
	filteredBlogs = [];
	selectedIndex: any;
	allBlogs = [];
	constructor(private breakpoint: BreakpointObserver) {
		super();
	}
	@HostListener('window:resize', ['$event']) onResize() {
		this.isMobile = this.breakpoint.isMatched(breakpoints.mobileMax);
	}

	ngOnInit(): void {
		super.ngOnInit();
		this.isMobile = this.breakpoint.isMatched(breakpoints.mobileMax);
		this.isMobile ? (this.pageCount = 2) : (this.pageCount = 6);
		this.blogsData$.subscribe((data) => {
			this.data = data;
			const sortedData = this.data?.sort((a: any, b: any) => {
				const date1: any = new Date(a.date);
				const date2: any = new Date(b.date);

				return date2 - date1;
			});
			this.data = [...[], ...(sortedData || [])];
			this.filterdata = data;
			this.allBlogs = data;
			this.filteredBlogs = data;
			this.categories = ['View All'];
			data?.forEach((blog) => {
				if (blog.articleType && !this.categories.includes(blog?.articleType))
					this.categories.push(blog?.articleType);
			});
		});
	}
	public blogsData$ = this.componentDocumentFeed$.pipe(
		map((data: any) => {
			// return data
			return BlogsMapper(data, this.page);
		})
	);

	loadMore() {
		if (this.isMobile) {
			this.pageCount = this.pageCount + 2;
		} else {
			this.pageCount = this.pageCount + 6;
		}
		if (
			this.pageCount > this.filteredBlogs.length ||
			this.pageCount === this.filteredBlogs.length
		) {
			this.show = true;
		}
	}
	loadless() {
		if (this.isMobile) {
			this.pageCount = 2;
		} else {
			this.pageCount = 6;
		}
	}
	
	changeCategory = (category, index) => {
		this.selectedCategory = category;
		this.selectedIndex = index;
		if (category === 'View All') {
			this.filteredBlogs = this.allBlogs;
			if (!this.isMobile) {
				this.pageCount = 6;
			} else {
				this.pageCount = 2;
			}
		} else {
			this.filteredBlogs = this.allBlogs.filter((blog) => {
				return blog.articleType === category;
			});
			if (!this.isMobile) {
				this.pageCount = 6;
			} else {
				this.pageCount = 2;
			}
		}
		this.checkshow();
	};
	checkshow() {
		if (this.isMobile) {
			if (this.filteredBlogs.length <= 2) {
				this.show = false;
			} else {
				this.show = true;
			}
		} else {
			if (this.filteredBlogs.length <= 6) {
				this.show = false;
			} else {
				this.show = true;
			}
		}
	}
	scrollToTop(): void {
		window.scrollTo(0, 350);
	}
}
