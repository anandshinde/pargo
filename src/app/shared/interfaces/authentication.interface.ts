export interface AuthToken {
	access_token?: string;
	expires_in?: number;
	scope?: string;
	token_type?: string;
	error?: boolean;
}

export interface UserState extends AuthToken {
	anonymous?: boolean;
	token_gen?: any;
	user_id?: string;
	remember_me?: boolean;
	guid?: string;
	third_party_user?: boolean;
	customer_id?: string;
}
