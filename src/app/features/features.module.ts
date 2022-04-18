import { NgModule } from '@angular/core';
import { GlobalHeaderModule } from '@features/global-header/global-header.module';
import { FooterModule } from '@features/global-footer/footer.module';
import { BreadcrumbsModule } from '@features/breadcrumbs/breadcrumbs.module';
// import { TrendCollectionModule } from '@features/trend-collection/trend-collection.module';
import { CommonModule } from '@angular/common';
import { BlogDetailModule } from './blog-detail/blog-detail.module';
import { BannerModule } from './banner/banner.module';
import { BlogsModule } from './blogs/blogs.module';
import { ImageGalleryModule } from './image-gallery/image-gallery.module';
import { TrendCollectionModule } from './trend-collection/trend-collection.module';
import { TileGridModule } from './tile-grid/tile-grid.module';
import { RichContentModule } from './rich-content/rich-content.module';
import { ImageCarouselModule } from '@features/image-carousel/image-carousel.module';
import { FindRetailerModule } from '@features/find-retailer/find-retailer.module';
import { TabbedContentModule } from '@features/tabbed-content/tabbed-content.module';
import { CategoryListingModule } from './category-listing/category-listing.module';
import { LoginModule } from './login/login.module';
import { CreateAccountModule } from './create-account/create-account.module';
import { ForgotPwdModule } from './forgot-pwd/forgot-pwd.module';
import { MyAccountModule } from './my-account/my-account.module';

@NgModule({
	declarations: [],

	imports: [
		CommonModule,
		GlobalHeaderModule,
		FooterModule,
		BlogDetailModule,
		BreadcrumbsModule,
		TrendCollectionModule,
		BannerModule,
		BlogsModule,
		ImageGalleryModule,
		TrendCollectionModule,
		TileGridModule,
		RichContentModule,
		ImageCarouselModule,
		FindRetailerModule,
		TabbedContentModule,
		LoginModule,
		CreateAccountModule,
		ForgotPwdModule,
		MyAccountModule,
	],
	exports: [
		CommonModule,
		FooterModule,
		GlobalHeaderModule,
		BlogDetailModule,
		BreadcrumbsModule,
		BannerModule,
		BlogsModule,
		ImageGalleryModule,
		TrendCollectionModule,
		TileGridModule,
		RichContentModule,
		ImageCarouselModule,
		FindRetailerModule,
		TabbedContentModule,
		CategoryListingModule,
		LoginModule,
		CreateAccountModule,
		MyAccountModule,
	],
})
export class FeaturesModule {}
