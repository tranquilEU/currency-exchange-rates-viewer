import { CurrencyRateResponse } from '@/shared/types/types';

export const filterCurrencyRates = (
	selectedCurrency: string,
	displayedCurrencyRates: string[],
	currencyRates: CurrencyRateResponse[] | undefined
): CurrencyRateResponse[] => {
	if (!currencyRates) return [];
	return currencyRates.map(({ date, data }) => {
		const filteredData = Object.fromEntries(
			Object.entries(data[selectedCurrency]).filter(([key]) =>
				displayedCurrencyRates.includes(key)
			)
		);
		return { date, data: filteredData };
	});
};
