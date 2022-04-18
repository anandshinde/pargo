import { CartPosition } from '@app/shared/constants/layout.constants';

const getCartPosition = (isMobile) => ({
	top: isMobile ? null : `${CartPosition.top}px`,
	right: isMobile ? null : `${CartPosition.right}px`,
});

export { getCartPosition };

export const generateArrayOfNumbers = (number = 10) =>
	Array.from(Array(number).keys()).map((value) => ({ value }));
