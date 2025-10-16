export const filterCurrencyCodes = (
	displayedCurrencyRates: string[],
	selectedCurrency: string,
	currencies: Record<string, string> | undefined
) => {
	const excluded = new Set([...displayedCurrencyRates, selectedCurrency]);

	return Object.fromEntries(
		Object.entries(currencies || {}).filter(
			([key]) => !excluded.has(key.toLowerCase())
		)
	);
};
