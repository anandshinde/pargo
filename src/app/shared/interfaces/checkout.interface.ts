import { HttpErrorResponse } from '@angular/common/http';

export interface HybrisHttpErrorResponse extends HttpErrorResponse {
	errors?: {
		message?: string;
		reason?: string;
		subject?: string;
		subjectType?: string;
		type?: string;
	};
}

export interface CartPrice {
	currencyIso: string;
	value: number;
}

export interface CartEntryProduct {
	code: string;
	name: string;
}

export interface CartEntry {
	entryNumber: number;
	product: CartEntryProduct;
	quantity: number;
	totalPrice: CartPrice;
	details?: any;
}

export interface AddToCartResponse {
	entry: CartEntry;
	quantity: number;
	quantityAdded: number;
	statusCode: string;
}

export interface CartDiscount {
	currencyIso: string;
	formattedValue: string;
	priceType: string;
	value: number;
}

export interface Cart {
	code: string;
	entries: CartEntry[];
	guid: string;
	totalItems: number;
	totalPrice: CartPrice;
	totalPriceWithTax: CartPrice;
	orderDiscounts: CartDiscount;
	type: string;
	errors?: any;
}

export interface CartState {
	guid?: string;
	userId?: string;
	cartId?: string;
	totalItems?: number;
	totalPrice?: number;
	orderDiscounts?: CartDiscount;
	updateItem?: {
		entryNumber?: number;
		quantity?: number;
	};
	newItem?: CartEntry;
	allCartItems?: CartEntry[];
	hasCart?: boolean;
	anonymous?: boolean;
}

export interface CountryRegion {
	isocode: string;
}

export interface CardType {
	code: string;
}

export interface Address {
	titleCode: string;
	firstName: string;
	lastName: string;
	line1: string;
	line2: string;
	postalCode: string;
	town: string;
	country: CountryRegion;
	region: CountryRegion;
}

export interface PaymentInformation {
	accountHolderName: string;
	cardNumber: string;
	cardType: CardType;
	expiryMonth: string;
	expiryYear: string;
	defaultPayment: boolean;
	billingAddress: Address;
}

export interface CheckoutStatePaymentForm {
	cardNumber: string;
	nameOnCard: string;
	cardExp: string;
	cardCvc: string;
}

export interface CheckoutStateShippingForm {
	address: string;
	address2: string;
	city: string;
	company: string;
	country: string;
	email: string;
	firstName: string;
	lastName: string;
	shipAddress: string;
	shipAddress2: string;
	shipCity: string;
	shipCompany: string;
	shipCountry: string;
	shipEmail: string;
	shipFirstName: string;
	shipLastName: string;
	shipState: string;
	shipZip: string;
	state: string;
	toggle: string;
	zip: string;
}

export interface CheckoutState {
	cartId: string;
	paymentForm: CheckoutStatePaymentForm;
	paymentMethod: string;
	shippingForm: CheckoutStateShippingForm;
	shippingOrder: CartEntry[];
	shippingOrderDiscount: number;
	shippingOrderTotal: number;
	orderDiscount: number;
	stripeToken: string;
}
