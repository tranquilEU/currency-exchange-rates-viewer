import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import dayjs from 'dayjs';

import {
	DEFAULT_CURRENCIES,
	DEFAULT_CURRENCY,
	DEFAULT_DATE,
	DEFAULT_DATE_FORMAT
} from '../constants';
import type { RootState } from './store';

interface CurrencyState {
	displayedCurrencyRates: string[];
	selectedCurrency: string;
	selectedDate: string;
}

const initialState: CurrencyState = {
	displayedCurrencyRates: DEFAULT_CURRENCIES,
	selectedCurrency: DEFAULT_CURRENCY,
	selectedDate: DEFAULT_DATE.format(DEFAULT_DATE_FORMAT)
};

const currencySlice = createSlice({
	name: 'currency',
	initialState,
	reducers: {
		setSelectedCurrency: (state, action: PayloadAction<string>) => {
			state.selectedCurrency = action.payload;
		},
		setSelectedDate: (state, action: PayloadAction<string>) => {
			state.selectedDate = action.payload;
		},
		addRow: (state, action: PayloadAction<string>) => {
			if (!state.displayedCurrencyRates.includes(action.payload)) {
				state.displayedCurrencyRates.push(action.payload);
			}
		},
		removeRow: (state, action: PayloadAction<string>) => {
			state.displayedCurrencyRates = state.displayedCurrencyRates.filter(
				currency => currency !== action.payload
			);
		}
	}
});

export const { setSelectedCurrency, setSelectedDate, addRow, removeRow } =
	currencySlice.actions;

export const selectDisplayedCurrencyRates = (state: RootState) =>
	state.currency.displayedCurrencyRates;

export const selectSelectedCurrency = (state: RootState) =>
	state.currency.selectedCurrency;

export const selectSelectedDate = (state: RootState) =>
	dayjs(state.currency.selectedDate);

export default currencySlice.reducer;
