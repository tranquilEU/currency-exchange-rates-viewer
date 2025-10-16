export const filterCurrencyCodes = (
  displayedCurrencyRates: string[],
  currencies: Record<string, string> | undefined
) => {
  return Object.fromEntries(
    Object.entries(currencies || {}).filter(
      ([key]) => !displayedCurrencyRates.includes(key)
    )
  ) as Record<string, string>;
};
