import { WINDOW } from '@shared/utilities/window';
import { Inject, Injectable } from '@angular/core';

import { LinkTypes } from '@shared/interfaces';

@Injectable({
	providedIn: 'root',
})
export class Eventservice {
	private interceptCompletion: string;
	private lastCheckoutCartData: any;
	constructor(@Inject(WINDOW) readonly windowRef: Window) {}

	/**
	 * Cart Viewed Event
	 * @param {Object} params - The parameters provided to the function.
	 * @param {Array} params.item - The array of items in the user's cart.
	 * @returns void
	 */
	public cartViewed(params) {
		const { item } = params;
		this.windowRef['appEventData'] = this.windowRef['appEventData'] || [];
		this.lastCheckoutCartData = item;
		this.windowRef['appEventData'].push({
			event: 'Cart Viewed',
			cart: {
				item,
			},
		});
	}

	/**
	 * Checkout Started Event
	 * @param {Object} product - An array containing the product data of the products in the user's cart.
	 * @returns void
	 */
	public checkoutStarted(product) {
		this.windowRef['appEventData'] = this.windowRef['appEventData'] || [];
		this.windowRef['appEventData'].push({
			event: 'Checkout Started',
			...product,
		});
	}

	/**
	 * Navigation Link Clicked Event
	 * @param {Object} params - The parameters provided to the function.
	 * @param {string} params.name - The name of the menu item clicked.
	 * @param {string} params.container - The name of the container of the menu item clicked.
	 * @returns void
	 */
	public clickMenuItem(params) {
		const { name, container } = params;
		this.windowRef['appEventData'] = this.windowRef['appEventData'] || [];
		this.windowRef['appEventData'].push({
			event: 'Navigation Link Clicked',
			linkInfo: {
				linkId: name,
				linkRegion: 'Global Header',
				linkContainer: container,
			},
		});
	}

	/**
	 * Social Brand Followed Event
	 * @param {Object} params - The parameters provided to the function.
	 * @param {string} params.socialNetwork - The link to the social account visited.
	 * @param {string} params.accountFollowed - The name of the social network navigated to.
	 * @returns void
	 */
	public clickSocial(params) {
		const { socialNetwork, accountFollowed } = params;
		this.windowRef['appEventData'] = this.windowRef['appEventData'] || [];
		this.windowRef['appEventData'].push({
			event: 'Social Brand Followed',
			social: {
				socialNetwork,
				accountFollowed,
			},
		});
	}

	/**
	 * Collection Comparison Viewed Event
	 * @param {Object} params - The parameters provided to the function.
	 * @param {Array} params.product - Array containing product data for the collections in comparison.
	 * @param {string} params.productComparisonList - Pipe-delimited list of collection names in comparison.
	 * @returns void
	 */
	public collectionComparisonViewed(params) {
		const { product, productComparisonList } = params;
		this.windowRef['appEventData'] = this.windowRef['appEventData'] || [];
		this.windowRef['appEventData'].push({
			event: 'Collection Comparison Viewed',
			product,
			productComparisonList,
		});
	}

	/**
	 * Contact Us Completed Event
	 * @returns void
	 */
	public contactUsCompleted() {
		this.windowRef['appEventData'] = this.windowRef['appEventData'] || [];
		this.windowRef['appEventData'].push({
			event: 'Contact Us Completed',
		});
	}

	/**
	 * Contact Us Started Event
	 * @returns void
	 */
	public contactUsStarted() {
		this.windowRef['appEventData'] = this.windowRef['appEventData'] || [];
		this.windowRef['appEventData'].push({
			event: 'Contact Us Started',
		});
	}

	/**
	 * Detect Trademarked Technology Function
	 * @param {string} name - The collection name.
	 * @returns {string} - Comma-separated list of trademarked technologies in collection.
	 */
	public detectTrademarkedTech(name) {
		const trademarkedTech = [];
		if (name.toLowerCase().includes('wetprotect')) {
			trademarkedTech.push('WetProtect');
		}
		if (name.toLowerCase().includes('spillprotect')) {
			trademarkedTech.push('SpillProtect');
		}
		if (name.toLowerCase().includes('wood enhanced')) {
			trademarkedTech.push('Wood Enhanced');
		}
		if (name.toLowerCase().includes('wider longer')) {
			trademarkedTech.push('Wider Longer');
		}
		if (name.toLowerCase().includes('tile options')) {
			trademarkedTech.push('Tile Options');
		}
		if (name.toLowerCase().includes('wood fundamentals')) {
			trademarkedTech.push('Wood Fundamentals');
		}
		if (name.toLowerCase().includes('wood originals')) {
			trademarkedTech.push('Wood Originals');
		}
		return trademarkedTech.join(', ');
	}

	/**
	 * Detect BRSM Category Function
	 * @param composition - The composition or product type of the product.
	 * @returns {string} - BRSM category, or brsm_cat_id.
	 */
	public detectBrsmCat(composition) {
		return composition.toLowerCase() === 'laminate'
			? 'Laminate'
			: composition.toLowerCase().includes('vinyl')
			? 'Luxury_Vinyl_Tile_And_Plank'
			: composition.toLowerCase().includes('hardwood')
			? 'Engineered'
			: 'Category Not Found';
	}

	/**
	 * Download Link Clicked Event
	 * @param {Object} params - The parameters provided to the function.
	 * @param {string} params.linkId - A description of the element clicked.
	 * @param {string} params.fileName - The name of the file downloaded.
	 * @returns void
	 */
	public downloadLinkClicked(params) {
		const { linkId, fileName } = params;
		this.windowRef['appEventData'] = this.windowRef['appEventData'] || [];
		this.windowRef['appEventData'].push({
			event: 'Download Link Clicked',
			linkInfo: {
				linkId,
				fileName,
			},
		});
	}

	/**
	 * Exit Link Clicked Event
	 * @param {Object} params - The parameters provided to the function.
	 * @param {string} params.name - The name of the element clicked.
	 * @param {string} params.href - The link navigated to.
	 * @returns void
	 */
	public exitLinkClicked(params) {
		const { name, href } = params;
		this.windowRef['appEventData'] = this.windowRef['appEventData'] || [];
		this.windowRef['appEventData'].push({
			event: 'Exit Link Clicked',
			linkInfo: {
				linkId: name,
				linkTarget: href,
			},
		});
	}

	/**
	 * Form Submission Failed Event
	 * @param {Object} params - The parameters provided to the function.
	 * @param {string} params.formError - The name of the error which caused the form submission to fail.
	 * @param {string} params.formID - An identifier of the form submitted.
	 * @param {string} params.formName - The name of the form submitted.
	 * @param {string} params.formType - The type of form submitted.
	 * @returns void
	 */
	public formSubmissionFailed(params) {
		const { formError, formID, formName, formType } = params;
		this.windowRef['appEventData'] = this.windowRef['appEventData'] || [];
		this.windowRef['appEventData'].push({
			event: 'Form Submission Failed',
			form: {
				formError: formError,
				formID: formID,
				formName: formName,
				formType: formType,
			},
		});
	}

	/**
	 * Form Submission Succeeded Event
	 * @param {Object} params - The parameters provided to the function.
	 * @param {string} params.formID - An identifier of the form submitted.
	 * @param {string} params.formName - The name of the form submitted.
	 * @param {string} params.formType - The type of form submitted.
	 * @returns void
	 */
	public formSubmissionSucceeded(transactionparams, params) {
		const { formID, formName, formType } = params;
		const { transactionID } = transactionparams;
		this.windowRef['appEventData'] = this.windowRef['appEventData'] || [];
		this.windowRef['appEventData'].push({
			event: 'Form Submission Succeeded',
			transaction: {
				transactionID: transactionID,
			},
			form: {
				formID: formID,
				formName: formName,
				formType: formType,
			},
		});
	}

	/**
	 * Form Tracking Event
	 * @param {Object} params - The parameters provided to the function.
	 * @param {string} params.Error - The name of the error which caused the form submission to fail.
	 * @param {string} params.formID - An identifier of the form submitted.
	 * @param {string} params.formName - The name of the form submitted.
	 * @param {string} params.formType - The type of form submitted.
	 * @returns void
	 */
	public formTracking(params) {
		const { event, formID, formName, formType } = params;
		this.windowRef['appEventData'] = this.windowRef['appEventData'] || [];
		this.windowRef['appEventData'].push({
			event: event,
			form: {
				formID: formID,
				formName: formName,
				formType: formType,
			},
		});
	}

	/**
	 * Get Price Tier Function
	 * @param {number} count - The average rating of a product.
	 * @returns {string} - The associated price tier.
	 */
	public getPriceTier(count) {
		switch (count) {
			case 4:
				return 'Silver';
			case 3:
				return 'Bronze';
			case 2:
				return 'Best';
			case 1:
				return 'Better';
			default:
				return 'Good';
		}
	}

	/**
	 * Handle Links Function
	 * @param {Object} data - The data provided to the function.
	 * @param {LinkTypes|string} data.type - The type of link clicked.
	 * @param {string} data.name - The name of the link clicked.
	 * @param {string} data.href - The link navigated to.
	 * @param {string} data.container - The name of the container of the link clicked.
	 * @returns void
	 */
	public handleLinks(data: {
		type: LinkTypes | string;
		name: string;
		href: string;
		container: string;
	}): void {
		switch (data.type) {
			case 'social':
				this.clickSocial({
					socialNetwork: data.name,
					accountFollowed: data.href,
				});
				return;
			case 'menuItem':
				this.clickMenuItem(data);
				return;
			default:
				return;
		}
	}

	/**
	 * CTA Link Clicked Event
	 * @param {Object} params - The parameters provided to the function.
	 * @param {string} params.href - The internal URL navigated to.
	 * @returns void
	 */
	public internalLinkClicked(params) {
		const { name, href } = params;
		this.windowRef['appEventData'] = this.windowRef['appEventData'] || [];
		this.windowRef['appEventData'].push({
			event: 'CTA Link Clicked',
			linkInfo: {
				linkId: `${name}|${href}`,
				linkTarget: href,
				linkRegion: '',
				linkContainer: '',
			},
		});
	}

	/**
	 * Listing Filter Added Event
	 * @param {Object} params - The parameters provided to the function.
	 * @param {string} params.listingType - The type of listings being filtered.
	 * @param {string} params.filterList - A complete twice-delimited list of the filters applied.
	 * @returns void
	 */
	public listingFilterAdded(params) {
		const { listingType, filterList } = params;
		this.windowRef['appEventData'] = this.windowRef['appEventData'] || [];
		this.windowRef['appEventData'].push({
			event: 'Listing Filter Added',
			listingRefined: {
				listingType: listingType,
				filterList: filterList,
			},
		});
	}

	/**
	 * Listing Filter Removed Event
	 * @param {Object} params - The parameters provided to the function.
	 * @param {string} params.listingType - The type of listings being filtered.
	 * @param {string} params.filterList - A complete twice-delimited list of the filters removed.
	 * @returns void
	 */
	public listingFilterRemoved(params) {
		const { listingType, filterList } = params;
		this.windowRef['appEventData'] = this.windowRef['appEventData'] || [];
		this.windowRef['appEventData'].push({
			event: 'Listing Filter Removed',
			listingRefined: {
				listingType: listingType,
				filterList: filterList,
			},
		});
	}

	/**
	 * Location Detected Event
	 * @param {Object} params - The parameters provided to the function.
	 * @param {string} params.locationDeterminationMethod - The method used to determine the location (user selection or automatic).
	 * @param {string} params.locationId - The ID of the location detected.
	 * @param {string} params.locationName - The name of the location detected.
	 * @param {string} params.locationType - The type of location detected.
	 * @returns void
	 */
	public locationDetection(params) {
		const {
			locationDeterminationMethod,
			locationId,
			locationName,
			locationType,
		} = params;
		this.windowRef['appEventData'] = this.windowRef['appEventData'] || [];
		this.windowRef['appEventData'].push({
			event: 'Location Detected',
			location: {
				locationDeterminationMethod: locationDeterminationMethod,
			},
			locationList: [
				{
					locationId: locationId.toString(),
					locationName,
					locationType,
				},
			],
		});
	}

	/**
	 * Location Listing Displayed Event
	 * @param {Object} params - The parameters provided to the function.
	 * @param {number} params.resultsCount - The total number of locations returned.
	 * @param {number} params.displayCount - The total number of locations displayed.
	 * @param {string} params.listingType - The type of location listed (Lowe's, Home Depot, Independent).
	 * @returns void
	 */
	public locationListingDisplayed(locationparams, params) {
		const { resultsCount, displayCount, listingType } = params;
		this.windowRef['appEventData'] = this.windowRef['appEventData'] || [];
		this.windowRef['appEventData'].push({
			event: 'Location Listing Displayed',
			listingDisplayed: {
				listing: locationparams,
				resultsCount: resultsCount,
				displayCount: displayCount,
				listingType: listingType,
			},
		});
	}

	/**
	 * Location Listing Item Clicked Event
	 * @param {Object} params - The parameters provided to the function.
	 * @param {number} params.itemPosition - The position of the item clicked in the list, starting at 1.
	 * @param {string} params.locationType - The type of location listed (Lowe's, Home Depot, Independent).
	 * @param {string} params.locationId - The identifier of location clicked.
	 * @param {string} params.locationName - The name of the location clicked.
	 * @returns void
	 */
	public locationListingItemClicked(params) {
		const { itemPosition, locationType, locationId, locationName } = params;
		this.windowRef['appEventData'] = this.windowRef['appEventData'] || [];
		this.windowRef['appEventData'].push({
			event: 'Location Listing Item Clicked',
			listingItemClicked: {
				listing: [
					{
						itemPosition: itemPosition,
						location: {
							locationType: locationType,
							locationId: String(locationId),
							locationName: locationName,
						},
					},
				],
			},
		});
	}

	/**
	 * Location Selected Event
	 * @param {Object} params - The parameters provided to the function.
	 * @param {string} params.locationName - The name of the location clicked.
	 * @param {string} params.locationId - The identifier of location clicked.
	 * @param {string} params.locationType - The type of location listed (Lowe's, Home Depot, Independent).
	 * @param {string} params.locationDeterminationMethod - The method by which the selected location was
	 * 		determined (user selection or automatic).
	 * @returns void
	 */
	public locationSelected(params) {
		const {
			locationName,
			locationId,
			locationType,
			locationDeterminationMethod,
		} = params;
		this.windowRef['appEventData'] = this.windowRef['appEventData'] || [];
		this.windowRef['appEventData'].push({
			event: 'Location Selected',
			locationList: [
				{
					locationName,
					locationId: String(locationId),
					locationType,
				},
			],
			location: {
				locationDeterminationMethod,
			},
		});
	}

	/**
	 * logUser Function - User Signed In, User Signed Out, User Registered, User Detected Events
	 * @param {Object} params - The parameters provided to the function.
	 * @param {string} params.event - The name of the event fired.
	 * @param {string} params.custKey - The unique custKey for the user.
	 * @param {string} params.loginStatus - The login status of the user (logged in, logged out, or guest).
	 * @param {string} params.userType - User type (customer or employee).
	 * @returns void
	 */
	public logUser(params) {
		const { event, custKey, loginStatus, userType } = params;
		this.windowRef['appEventData'] = this.windowRef['appEventData'] || [];

		const userTypeParam = !!userType ? { userType } : {};
		return new Promise<void>((resolve) => {
			this.windowRef['appEventData'].push({
				event: event,
				user: {
					custKey: custKey,
					loginStatus: loginStatus,
					...userTypeParam,
				},
			});
			resolve();
		});
	}

	/**
	 * Order Placed Event
	 * @param {Object} params - The parameters provided to the function.
	 * @param {string} params.currency - The currency used to pay for the order, in a three-character code.
	 * @param {string} params.purchaseID - A unique ID for the purchase (left as a blank string).
	 * @param {string} params.transactionID - A unique ID for the transaction (left as a blank string).
	 * @param {string} params.paymentMethod - The payment method used at checkout (Visa, MasterCard, etc).
	 * @param {string} params.paymentAmount - The amount paid for the order.
	 * @param {Object} params.shippingForm - Data from the shipping form.
	 * @param {string} params.shippingForm.zip - ZIP code from the shipping form.
	 * @param {string} params.shippingForm.country - Country from the shipping form.
	 * @returns void
	 */
	public orderPlaced(params) {
		const {
			currency,
			purchaseID,
			transactionID,
			paymentMethod,
			paymentAmount,
			shippingForm,
		} = params;
		this.windowRef['appEventData'] = this.windowRef['appEventData'] || [];
		this.windowRef['appEventData'].push({
			event: 'Order Placed',
			transaction: {
				total: {
					currency,
				},
				item: this.lastCheckoutCartData.map((entry) => {
					return {
						productInfo: {
							productNumber: entry.productInfo.productNumber,
							productID: entry.productInfo.productID,
							brand: 'MohawkFlooring',
							name: entry.productInfo.name,
							sku: entry.productInfo.sku,
							isSample: 'true',
							productLine: entry.productInfo.productLine,
							trademarkedTechnology: entry.productInfo.trademarkedTechnology,
							color: entry.productInfo.color,
							brsm_pid: entry.productInfo.brsm_pid,
						},
						price: {
							sellingPrice: '5',
							priceTier: entry.price.priceTier,
						},
						quantity: entry.quantity,
						shippingAddress: {
							postalCode: shippingForm.zip,
							stateProvince: '',
							country: shippingForm.country,
						},
					};
				}),
				purchaseID,
				transactionID,
				payment: [
					{
						paymentAmount,
						paymentMethod,
					},
				],
			},
		});
	}

	/**
	 * Page Load Completed Event
	 * @returns void
	 */
	public pageComplete() {
		this.windowRef['appEventData'] = this.windowRef['appEventData'] || [];
		this.windowRef['appEventData'].push({
			event: 'Page Load Completed',
		});
	}

	/**
	 * Page Load Started Event
	 * @param {Object} params - The parameters provided to the function.
	 * @param {string} params.pageName - The name of the page being loaded.
	 * @param {string} params.breadcrumbs - The breadcrumbs to the page being loaded.
	 * @param {string} params.pageType - The type of page being loaded.
	 * @param {string} params.pageCategory - The category of the page being loaded.
	 * @param {string} params.siteName - Name of the site.
	 * @param {string} params.siteLanguage - The language of the site ('en-us' for American english).
	 * @param {string} params.siteCountry - The country of the site.
	 * @returns void
	 */
	public pageLoadStarted({
		pageName,
		breadcrumbs,
		pageType,
		pageCategory,
		siteName,
		siteLanguage,
		siteCountry,
		brsm_cat_id,
	}) {
		this.windowRef['appEventData'] = this.windowRef['appEventData'] || [];
		if (
			this.windowRef['appEventData'].length >= 1 &&
			this.windowRef['appEventData']
				.slice(-4)
				.find(({ event }) => event === 'Page Load Completed') === undefined
		) {
			this.pageComplete();
			this.interceptCompletion = pageName;
		}
		this.windowRef['appEventData'].push({
			event: 'Page Load Started',
			page: {
				pageName,
				breadcrumbs,
				pageType,
				pageCategory,
				siteName,
				siteLanguage,
				siteCountry,
				brsm_cat_id,
			},
		});
	}

	/**
	 * Product Added to Cart Event
	 * @param {Object} params - The parameters provided to the function.
	 * @param {string} params.brand - The brand of the product.
	 * @param {string} params.isSample - 'true' if the product is a sample, 'false' otherwise.
	 * @param {string} params.name - The name of the product, including color.
	 * @param {string} params.sku - The SKU of the product.
	 * @param {string} params.businessUnit - Business Unit the product falls under.
	 * @param {string} params.productLine - The name of the product line or collection.
	 * @param {string} params.trademarkedTechnology - A comma-separated list of trademarked technologies use in the product,
	 * 												detected by the detectTrademarkedTech function.
	 * @param {string} params.color - The color of the product.
	 * @param {string} params.priceTier - The price tier of the product, determined by the getPriceTier function if possible.
	 * @param {string} params.additionContext - The context from which the product is being added to the cart.
	 * @param {string} params.productNumber - The product number of the product.
	 * @returns void
	 */
	public productAddedtoCart(params) {
		const {
			brand,
			isSample,
			name,
			sku,
			businessUnit,
			productLine,
			trademarkedTechnology,
			color,
			priceTier,
			additionContext,
			productNumber,
			brsm_pid,
		} = params;
		this.windowRef['appEventData'] = this.windowRef['appEventData'] || [];
		this.windowRef['appEventData'].push({
			event: 'Product Added to Cart',
			product: [
				{
					productInfo: {
						productNumber,
						productID: productLine,
						brand,
						isSample,
						name,
						sku,
						businessUnit,
						productLine,
						trademarkedTechnology,
						color,
						brsm_pid,
					},
					price: {
						priceTier,
					},
				},
			],
			cart: {
				additionContext,
			},
		});
	}

	/**
	 * Product Interaction Occurred Event
	 * @param {Object} params - The parameters provided to the function.
	 * @param {string} params.productVisualization - Identifier of the product visualization being viewed if on visuaizer.
	 * @param {string} params.brand - The brand of the product.
	 * @param {string} params.productLine - The name of the product line or collection.
	 * @param {string} params.trademarkedTechnology - A comma-separated list of trademarked technologies use in the product,
	 * 												detected by the detectTrademarkedTech function.
	 * @param {string} params.name - The name of the product, including color.
	 * @param {string} params.sku - The SKU of the product.
	 * @param {string} params.color - The color of the product.
	 * @param {string} params.priceTier - The price tier of the product, determined by the getPriceTier function if possible.
	 * @param {string} params.interactionDetail - The detailed product interaction that occurred.
	 * @param {string} params.interactionType - The type of product interaction that occurred.
	 * @param {string} params.productNumber - The product number of the product.
	 * @returns void
	 */
	public productInteraction(params) {
		const {
			productVisualization,
			brand,
			productLine,
			trademarkedTechnology,
			name,
			sku,
			color,
			priceTier,
			interactionDetail,
			interactionType,
			productNumber,
		} = params;
		this.windowRef['appEventData'] = this.windowRef['appEventData'] || [];
		this.windowRef['appEventData'].push({
			event: 'Product Interaction Occurred',
			product: [
				{
					productInfo: {
						productNumber,
						productID: productLine,
						productVisualization,
						brand,
						productLine,
						trademarkedTechnology,
						name,
						sku,
						color,
					},
					price: {
						priceTier,
					},
				},
			],
			productInteraction: {
				interactionDetail,
				interactionType,
			},
		});
	}

	/**
	 * Product Listing Displayed Event
	 * @param {Object} params - The parameters provided to the function.
	 * @param {Object} productParams - The parameters provided to the function which are specific to the products listed.
	 * @param {number} params.filterListLength - The length of the filter list applied.
	 * @param {string} params.filterList - A complete twice-delimited list of the filters applied.
	 * @param {string} params.sortDefault - The default sorting scheme.
	 * @param {string} params.listingType - The type of listings displayed ('product').
	 * @param {number} params.resultsCount - The number of results displayed.
	 * @returns void
	 */
	public productListingDisplayed(params, productparams) {
		const {
			filterListLength,
			filterList,
			sortDefault,
			listingType,
			resultsCount,
		} = params;
		this.windowRef['appEventData'] = this.windowRef['appEventData'] || [];
		this.windowRef['appEventData'].push({
			event: 'Product Listing Displayed',
			listingDisplayed: {
				filterListLength: filterListLength,
				filterList: filterList,
				sortDefault: sortDefault,
				listingType: listingType,
				resultsCount: resultsCount,
				listing: productparams,
			},
		});
	}

	/**
	 * Product Listing Item Clicked Event
	 * @param {Object} params - The parameters provided to the function.
	 * @param {string} params.sortOrder - The order by which results are sorted.
	 * @param {string} params.brand - The brand of the product.
	 * @param {string} params.name - The name of the product, including color.
	 * @param {string} params.sku - The SKU of the product.
	 * @param {string} params.productLine - The name of the product line or collection.
	 * @param {string} params.trademarkedTechnology - A comma-separated list of trademarked technologies use in the product,
	 * 												detected by the detectTrademarkedTech function.
	 * @param {string} params.color - The color of the product.
	 * @param {number} params.itemPosition - The position of the item clicked, starting at 1.
	 * @param {string} params.currency - The currency used for pricing information of the product.
	 * @param {string} params.priceTier - The price tier of the product, determined by the getPriceTier function if possible.
	 * @param {string} params.productNumber - The product number of the product.
	 * @returns void
	 */
	public productListingItemClicked(params) {
		const {
			sortOrder,
			brand,
			name,
			sku,
			productLine,
			trademarkedTechnology,
			color,
			itemPosition,
			currency,
			priceTier,
			productNumber,
		} = params;
		this.windowRef['appEventData'] = this.windowRef['appEventData'] || [];
		this.windowRef['appEventData'].push({
			event: 'Product Listing Item Clicked',
			listingDisplayed: {
				sortOrder,
			},
			listingItemClicked: {
				listing: [
					{
						productInfo: {
							productNumber,
							productID: productLine,
							brand,
							name,
							sku,
							productLine,
							trademarkedTechnology,
							color,
						},
						itemPosition,
						price: {
							currency,
							priceTier,
						},
					},
				],
			},
		});
	}

	/**
	 * Product Removed from Cart Event
	 * @param {Object} params - The parameters provided to the function.
	 * @param {Array} params.product - A list of product information for the products removed from the cart.
	 * @returns void
	 */
	public productRemovedfromCart(params) {
		const { product } = params;
		this.windowRef['appEventData'] = this.windowRef['appEventData'] || [];
		this.windowRef['appEventData'].push({
			event: 'Product Removed from Cart',
			product,
		});
	}

	/**
	 * Product Viewed Event
	 * @param {Object} params - The parameters provided to the function.
	 * @param {string} params.brand - The brand of the product.
	 * @param {string} params.name - The name of the product, including color.
	 * @param {string} params.sku - The SKU of the product.
	 * @param {string} params.productLine - The name of the product line or collection.
	 * @param {string} params.trademarkedTechnology - A comma-separated list of trademarked technologies use in the product,
	 * 												detected by the detectTrademarkedTech function.
	 * @param {string} params.color - The color of the product.
	 * @param {string} params.priceTier - The price tier of the product, determined by the getPriceTier function if possible.
	 * @param {string} params.productNumber - The product number of the product.
	 * @returns void
	 */
	public productViewed(params) {
		const {
			brand,
			name,
			sku,
			productLine,
			trademarkedTechnology,
			color,
			priceTier,
			productNumber,
			brsm_pid,
			brsm_cat_id,
		} = params;
		this.windowRef['appEventData'] = this.windowRef['appEventData'] || [];
		this.windowRef['appEventData'].push({
			event: 'Product Viewed',
			product: [
				{
					productInfo: {
						productNumber,
						productID: productLine,
						brand,
						name,
						sku,
						productLine,
						trademarkedTechnology,
						color,
						brsm_pid,
					},
					price: {
						priceTier,
					},
					brsm_cat_id,
				},
			],
		});
	}

	/**
	 * Quiz Completed Event
	 * @param {Object} params - The parameters provided to the function.
	 * @param {string} params.quizName - The name of the quiz completed.
	 * @returns void
	 */
	public quizCompleted(params) {
		const { quizName } = params;
		this.windowRef['appEventData'] = this.windowRef['appEventData'] || [];
		this.windowRef['appEventData'].push({
			event: 'Quiz Completed',
			quiz: {
				quizName: quizName,
			},
		});
	}

	/**
	 * Quiz Started Event
	 * @param {Object} params - The parameters provided to the function.
	 * @param {string} params.quizName - The name of the quiz started.
	 * @returns void
	 */
	public quizStarted(params) {
		const { quizName } = params;
		this.windowRef['appEventData'] = this.windowRef['appEventData'] || [];
		this.windowRef['appEventData'].push({
			event: 'Quiz Started',
			quiz: {
				quizName: quizName,
			},
		});
	}

	/**
	 * Quiz Step Completed Event
	 * @param {Object} params - The parameters provided to the function.
	 * @param {string} params.quizName - The name of the quiz completed.
	 * @param {string} params.quizStep - The name of the quiz step completed.
	 * @param {string} params.quizStepNumber - The index of the quiz step completed, starting at 1.
	 * @param {string} params.quizStepResponse - The response selected for the quiz step completed.
	 * @returns void
	 */
	public quizStepCompleted(params) {
		const { quizName, quizStep, quizStepNumber, quizStepResponse } = params;
		this.windowRef['appEventData'] = this.windowRef['appEventData'] || [];
		this.windowRef['appEventData'].push({
			event: 'Quiz Step Completed',
			quiz: {
				quizStepResponse,
				quizStep,
				quizStepNumber: +quizStepNumber,
				quizName,
			},
		});
	}

	/**
	 * Onsite Search Performed Event
	 * @param {Object} params - The parameters provided to the function.
	 * @param {string} params.searchTerm - The term searched for.
	 * @param {string} params.searchTermCorrected - The term typed into search before clicking on a suggestion
	 * 												(If no suggestion was used, will be the same as params.searchTerm).
	 * @param {string} params.searchType - The type of search performed ('product' or 'retailer').
	 * @param {string} params.fakeProductCollection - Originally an AA helper node, now obsolete. Set to a string.
	 * @returns void
	 */
	public searchPerformed(params) {
		const {
			searchTerm,
			searchTermCorrected,
			searchType,
			fakeProductCollection,
		} = params;
		this.windowRef['appEventData'] = this.windowRef['appEventData'] || [];
		this.windowRef['appEventData'].push({
			event: 'Onsite Search Performed',
			onsiteSearch: {
				keyword: {
					searchTerm,
					searchTermCorrected,
					searchType,
				},
			},
			keywordSearch: {
				fakeProductCollection,
			},
		});
	}

	/**
	 * Timed Page Load Completed Function
	 * @param {Object} params - The parameters provided to the function.
	 * @param {string} params.title - The title of the page which has been loaded.
	 * @returns void
	 */
	public timedPageComplete(params) {
		const { title } = params;
		if (this.interceptCompletion !== title) {
			this.pageComplete();
		}
	}

	/**
	 * Video Completed Event
	 * @param {Object} params - The parameters provided to the function.
	 * @param {string} params.videoName - The name of the video which has been completed.
	 * @returns void
	 */
	public videoCompleted(params) {
		const { videoName } = params;
		this.windowRef['appEventData'] = this.windowRef['appEventData'] || [];
		this.windowRef['appEventData'].push({
			event: 'Video Completed',
			video: {
				videoName,
			},
		});
	}

	/**
	 * Video Milestone Reached Event
	 * @param {Object} params - The parameters provided to the function.
	 * @param {string} params.milestone - The milestone reached in the video ('25', '50', or '75' at each percentage).
	 * @param {string} params.videoName - The name of the video.
	 * @returns void
	 */
	public videoMilestone(params) {
		const { milestone, videoName } = params;
		this.windowRef['appEventData'] = this.windowRef['appEventData'] || [];
		this.windowRef['appEventData'].push({
			event: 'Video Milestone Reached',
			video: {
				milestone,
				videoName,
			},
		});
	}

	/**
	 * Video Started Event
	 * @param {Object} params - The parameters provided to the function.
	 * @param {string} params.videoName - The name of the video which has been started.
	 * @returns void
	 */
	public videoStarted(params) {
		const { videoName } = params;
		this.windowRef['appEventData'] = this.windowRef['appEventData'] || [];
		this.windowRef['appEventData'].push({
			event: 'Video Started',
			video: {
				videoName,
			},
		});
	}

	/**
	 * Visualizer Viewed Event
	 * @param {Object} params - The parameters provided to the function.
	 * @param {Array} params.product - The product data of the products in the visualizer.
	 * @returns void
	 */
	public visualizerViewed(params) {
		const { product } = params;
		this.windowRef['appEventData'] = this.windowRef['appEventData'] || [];
		this.windowRef['appEventData'].push({
			event: 'Visualizer Viewed',
			product,
		});
	}
}
