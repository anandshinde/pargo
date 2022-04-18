import { RegularExpressions } from '@shared/constants/config.constants';

export const urlIsExternal = (url: string, flag: string = 'gi'): boolean => {
	const pattern = new RegExp(RegularExpressions.externalUrl, flag);
	return pattern.test(url);
};
