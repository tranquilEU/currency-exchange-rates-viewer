import { formatCurrency } from '../utils/formatCurrency';

it('formats currency when not found in currencies object', () => {
	const result = formatCurrency(
		'usd',
		undefined as unknown as Record<string, string>
	);
	expect(result).toBe('USD');
});

it('formats currency when found in currencies object', () => {
	const currencies = { usd: 'United States Dollar', eur: 'Euro' };
	const result = formatCurrency('usd', currencies);
	expect(result).toBe('USD - United States Dollar');
});
