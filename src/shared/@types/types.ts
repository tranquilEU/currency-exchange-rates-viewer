export type CurrencyValues = {
	[currency: string]: number;
};

export type CurrencyRateResponse = {
	date: string;
	data: CurrencyValues;
};

export type CurrencyRateRow = {
	id: string;
	currency: string;
	[date: string]: string | number;
};
