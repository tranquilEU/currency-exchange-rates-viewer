import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Dayjs } from 'dayjs';

import {
	DEFAULT_CURRENCIES,
	DEFAULT_CURRENCY,
	DEFAULT_DATE
} from '../constants';

interface CurrencyState {
	displayedCurrencyRates: string[];
	selectedCurrency: string;
	selectedDate: Dayjs;
}

const initialState: CurrencyState = {
	displayedCurrencyRates: DEFAULT_CURRENCIES,
	selectedCurrency: DEFAULT_CURRENCY,
	selectedDate: DEFAULT_DATE
};

const currencySlice = createSlice({
	name: 'currency',
	initialState,
	reducers: {
		setSelectedCurrency: (state, action: PayloadAction<string>) => {
			state.selectedCurrency = action.payload;
		},
		setSelectedDate: (state, action: PayloadAction<Dayjs>) => {
			state.selectedDate = action.payload;
		},
		addRow: (state, action: PayloadAction<string>) => {
			state.displayedCurrencyRates = [
				...state.displayedCurrencyRates,
				action.payload
			];
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
export default currencySlice.reducer;
