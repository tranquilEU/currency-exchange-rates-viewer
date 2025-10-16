import dayjs from "dayjs";

export const API_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api";

export const QUERY_KEYS = {
  CURRENCIES: "currencies",
  CURRENCY_RATES: "currency-rates",
};
export const DEFAULT_CURRENCY = "gbp";
export const DEFAULT_CURRENCIES = [
  "usd",
  "eur",
  "jpy",
  "chf",
  "cad",
  "aud",
  "zar",
];
export const DEFAULT_DATE_FORMAT = "YYYY-MM-DD";
export const DEFAULT_DATE_STRING = dayjs().format(DEFAULT_DATE_FORMAT);
export const DEFAULT_DATE = dayjs(DEFAULT_DATE_STRING);
export const MIN_DAYS_FROM_START = 90;
export const PAST_DAYS = 7;
export const MIN_ROWS = 3;
export const MAX_ROWS = 7;
