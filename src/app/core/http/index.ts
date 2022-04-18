import { AccountApi } from './account.api';
import { AuthApiService } from './auth-api.service';
import { FindRetailerApi } from './find-retailer.api';
import { ProductListApi } from './product-list.api';
import { ProductApiService } from './product-api.service';
import { ProductSearchApi } from './product-search.api.service';


export const coreHttp: any[] = [
	AccountApi,
	AuthApiService,
	FindRetailerApi,
	ProductListApi,
	ProductApiService,
	ProductSearchApi,

];

export * from './account.api';
export * from './auth-api.service';
export * from './find-retailer.api';
export * from './product-list.api';
export * from './product-api.service';
export * from './product-search.api.service';

