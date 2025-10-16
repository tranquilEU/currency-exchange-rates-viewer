import type { CurrencyRateResponse } from "../@types/types";
import { DEFAULT_CURRENCIES } from "../constants";

export const filterCurrencies = (
  selectedCurrency: string,
  currencyRates: CurrencyRateResponse[] | undefined
): CurrencyRateResponse[] => {
  if (!currencyRates) return [];
  return currencyRates.map(({ date, data }) => {
    const filteredData = Object.fromEntries(
      Object.entries(data[selectedCurrency]).filter(([key]) =>
        DEFAULT_CURRENCIES.includes(key)
      )
    );
    return { date, data: filteredData };
  });
};
