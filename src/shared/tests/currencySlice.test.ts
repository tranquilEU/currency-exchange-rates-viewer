import dayjs from 'dayjs';

import type { RootState } from '@/shared/store/store';

import {
	DEFAULT_CURRENCIES,
	DEFAULT_CURRENCY,
	DEFAULT_DATE,
	DEFAULT_DATE_FORMAT
} from '../constants';
import reducer, {
	addRow,
	removeRow,
	selectDisplayedCurrencyRates,
	selectSelectedCurrency,
	selectSelectedDate,
	setSelectedCurrency,
	setSelectedDate
} from '../store/currencySlice';

describe('currencySlice', () => {
	const initialState = {
		displayedCurrencyRates: DEFAULT_CURRENCIES,
		selectedCurrency: DEFAULT_CURRENCY,
		selectedDate: DEFAULT_DATE.format(DEFAULT_DATE_FORMAT)
	};

	describe('reducers', () => {
		it('should setSelectedCurrency', () => {
			const newState = reducer(initialState, setSelectedCurrency('AMD'));
			expect(newState.selectedCurrency).toBe('AMD');
		});

		it('should setSelectedDate', () => {
			const newDate = '2025-10-10';
			const newState = reducer(initialState, setSelectedDate(newDate));
			expect(newState.selectedDate).toBe(newDate);
		});

		it('should addRow', () => {
			const newState = reducer(initialState, addRow('AGP'));
			expect(newState.displayedCurrencyRates).toContain('AGP');
		});

		it('should removeRow', () => {
			const currencyToRemove = DEFAULT_CURRENCIES[0];
			const newState = reducer(initialState, removeRow(currencyToRemove));
			expect(newState.displayedCurrencyRates).not.toContain(currencyToRemove);
		});
	});

	describe('selectors', () => {
		const mockState: RootState = {
			currency: {
				displayedCurrencyRates: ['USD', 'EUR'],
				selectedCurrency: 'GBP',
				selectedDate: '2025-10-10'
			}
		} as RootState;

		it('selectDisplayedCurrencyRates should return displayed currencies', () => {
			expect(selectDisplayedCurrencyRates(mockState)).toEqual(['USD', 'EUR']);
		});

		it('selectSelectedCurrency should return selected currency', () => {
			expect(selectSelectedCurrency(mockState)).toBe('GBP');
		});

		it('selectSelectedDate should return a dayjs object', () => {
			const result = selectSelectedDate(mockState);
			expect(dayjs.isDayjs(result)).toBe(true);
			expect(result.format('YYYY-MM-DD')).toBe('2025-10-10');
		});
	});
});
