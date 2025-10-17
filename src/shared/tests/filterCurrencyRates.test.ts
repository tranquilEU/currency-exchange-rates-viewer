import { filterCurrencyRates } from '../utils/filterCurrencyRates';
import { mockedCurrencies } from './data/currencyRates';

it('filters currency rates based on search term', () => {
	// convert the mock shape { date, gbp: {...} } into { date, data: {...} } expected by CurrencyRateResponse
	const formattedRates = mockedCurrencies.map(c => ({
		date: c.date,
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		data: (c as any)['gbp']
	}));
	const result = filterCurrencyRates(
		'gbp',
		['eur', 'jpy', 'usd'],
		formattedRates
	);
	console.log('Filtered Result:', result);
	expect(result).toEqual([
		{ currency: 'EUR', rate: 1.13 },
		{ currency: 'JPY', rate: 151.0 },
		{ currency: 'USD', rate: 1.0 }
	]);
});
