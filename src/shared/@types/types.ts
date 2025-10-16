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

export type CurrencyChangeEvent =
	| string
	| React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	| (Event & { target: { value: string; name?: string } });
