import type { CurrencyChangeEvent } from '@/shared/@types/types';

export const extractValue = (e: CurrencyChangeEvent): string | undefined => {
	if (typeof e === 'string') return e;
	if ('target' in e && e.target) return e.target.value;
	return undefined;
};
