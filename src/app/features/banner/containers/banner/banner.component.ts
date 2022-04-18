import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import {
	BloomreachBanner,
	BloomreachBaseClass,
	BloomreachContentList,
} from '@core/bloomreach';
import { combineLatest } from 'rxjs';
import { BannerMapper } from './banner.mapper';

@Component({
	selector: 'mflooring-banner',
	templateUrl: './banner.component.html',
	styleUrls: ['./banner.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BannerComponent extends BloomreachBaseClass implements OnInit {
	constructor() {
		super();
	}

	public bannerType: string;
	public bannerContent;
	public bannerResourceBundle$ = this.resourceBundleData$.pipe(
		map((data: any) => {
			let resourceObj = {};
			data = Array.isArray(data) === true ? data : [];
			data.forEach((item) => {
				resourceObj = { ...resourceObj, ...item };
			});
			return resourceObj;
		})
	);

	public bannerContent$ = combineLatest([
		this.componentData$,
		this.componentParameters$,
	]).pipe(
		map(([data, params]: [BloomreachBanner | BloomreachContentList, any]) => {
			const componentInfo: any = this.component;
			return BannerMapper(
				data,
				params,
				this.page,
				this.component.getParameters().template
			);
		})
	);

	public containsDescription = combineLatest([
		this.componentData$,
		this.componentParameters$,
	]).pipe(
		map(([data, params]: [BloomreachBanner | BloomreachContentList, any]) => {
			return console.log(data, 'banner');
		})
	);

	ngOnInit(): void {
		super.ngOnInit();
		this.bannerType = this.component.getParameters().template;
	}
}
