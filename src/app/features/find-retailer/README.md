### Find A Retailer

**Components:**

- FindRetailerComponent (`containers/find-retailer`): Entry component
- RetailerResultsListComponent (`components/retailer-results-list`): Results List
- RetailerResultComponent (`components/retailer-result`): Retailer result card
- RetailerTypeToggleComponent (`components/retailer-type-toggle`): Retailer type selector

###API:

**Fetch Dealers:**

- **Endpoint** `/dealers/getbyzip?[query string]`
- **Query String Example:** `zip=30701&dealerType=mohawkflooring&distance=25&limit=100&sale=N&minimumRating=0&forceDistance=False&brandGroupCodes=12345&brandGroupCodes=54321groupCodes=12345&groupCodes=54321`

- **Interface:**
  ```typescript
  export interface FindRetailerQueryStringConfig {
  	zip: number;
  	dealerType: string;
  	distance: number;
  	limit: number;
  	sale: string;
  	minimumRating: number;
  	forceDistance: string;
  	brandGroupCodes: string[];
  	groupCodes: string[];
  }
  ```

**Fetch Ratings:**

- **Endpoint** `/dealers/getbirdeyereviewbyid?[query string]`

- **Query String Example:** `businessId=12345`
