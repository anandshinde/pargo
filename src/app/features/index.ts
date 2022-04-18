import { GlobalFooterComponent } from './global-footer/containers';
import { GlobalMainHeaderComponent } from './global-header/global-main-header/containers';
import { GlobalUtilityHeaderComponent } from './global-header/global-utility-header/containers';
import { BlogDetailComponent } from '@features/blog-detail/containers';
import { BreadcrumbsComponent } from './breadcrumbs/containers';
import { BannerComponent } from './banner/containers';
import { ListingComponent } from './blogs/containers';
import { ImageGalleryComponent } from './image-gallery/containers';
import { TrendCollectionComponent } from './trend-collection/containers';
import { TileGridComponent } from './tile-grid/containers';
import { RichContentComponent } from './rich-content/containers/rich-content/rich-content.component';
import { ImageCarouselComponent } from './image-carousel/containers';
import { FindRetailerComponent } from './find-retailer/containers';
import { RetailerDetailsComponent } from './find-retailer/containers';
import { TabbedContentComponent } from './tabbed-content/containers';
import { CategoryListingComponent } from './category-listing/containers/category-listing/category-listing.component';
import { LoginComponent } from './login/containers/login/login.component';
import { CreateAccountComponent } from './create-account/containers';
import { ForgotPwdComponent } from './forgot-pwd/containers';
import { MyAccountComponent } from './my-account/containers';

export const BrMappedComponents = {
	UtilityMenu: GlobalUtilityHeaderComponent,
	HeaderMenu: GlobalMainHeaderComponent,
	FooterMenu: GlobalFooterComponent,
	BlogDetails: BlogDetailComponent,
	Breadcrumbs: BreadcrumbsComponent,
	Banner: BannerComponent,
	BlogListing: ListingComponent,
	TileGrid: TileGridComponent,
	ImageCarousel: ImageCarouselComponent,
	ImageGallery: ImageGalleryComponent,
	RichContent: RichContentComponent,
	TrendCollection: TrendCollectionComponent,
	RetailerSearchResults: FindRetailerComponent,
	RetailerDetail: RetailerDetailsComponent,
	TabbedContent: TabbedContentComponent,
	CategoryListing: CategoryListingComponent,
	Login: LoginComponent,
	CreateAccount: CreateAccountComponent,
	ForgotPassword: ForgotPwdComponent,
	MyAccount: MyAccountComponent,
};

export const featureComponents: any[] = [
	GlobalUtilityHeaderComponent,
	GlobalMainHeaderComponent,
	GlobalFooterComponent,
	BlogDetailComponent,
	BreadcrumbsComponent,
	BannerComponent,
	ListingComponent,
	TrendCollectionComponent,
	ImageGalleryComponent,
	RichContentComponent,
	TrendCollectionComponent,
	TileGridComponent,
	ImageCarouselComponent,
	CategoryListingComponent,
	ForgotPwdComponent,
	MyAccountComponent,
];

export const entryComponents = [
	ImageGalleryComponent,
	FindRetailerComponent,
	RetailerDetailsComponent,
];
