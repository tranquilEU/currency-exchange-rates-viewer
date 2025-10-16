import type {
	CurrencyRateResponse,
	CurrencyRateRow
} from '@/shared/@types/types';

import { formatCurrency } from '@/shared/utils/formatCurrency';

export const mapDataToRows = (
	arr: CurrencyRateResponse[],
	currencies: Record<string, string> | undefined
): CurrencyRateRow[] => {
	const result: Record<string, CurrencyRateRow> = {};

	arr.forEach(({ date, data }) => {
		Object.entries(data).forEach(([currency, value], index) => {
			if (!result[currency]) {
				result[currency] = {
					id: (index + 1).toString(),
					currency: formatCurrency(currency, currencies || {})
				};
			}
			result[currency][date] = value;
		});
	});

	return Object.values(result);
};
