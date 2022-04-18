import { validation } from '@shared/constants';

export const urlIsExternal = (url: string, flag: string = 'gi'): boolean => {
	const pattern = new RegExp(validation.externalUrl, flag);
	return pattern.test(url);
};
