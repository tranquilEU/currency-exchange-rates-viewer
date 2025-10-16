export const formatCurrency = (
  currency: string,
  currencies: Record<string, string>
) => {
  if (currencies && currencies[currency]) {
    return `${currency.toUpperCase()} - ${currencies[currency]}`;
  }
  return currency.toUpperCase();
};
