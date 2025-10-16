import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { CurrencyRateRow } from "../@types/types";
import { DEFAULT_CURRENCY, DEFAULT_DATE } from "../constants";
import type { Dayjs } from "dayjs";

interface CurrencyState {
  defaultCurrencies: string[];
  selectedCurrency: string;
  selectedDate: Dayjs;
  rows: CurrencyRateRow[];
}

const initialState: CurrencyState = {
  defaultCurrencies: ["usd", "eur", "jpy", "chf", "cad", "aud", "zar"],
  selectedCurrency: DEFAULT_CURRENCY,
  selectedDate: DEFAULT_DATE,
  rows: [],
};

const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    setSelectedCurrency: (state, action: PayloadAction<string>) => {
      state.selectedCurrency = action.payload;
    },
    setSelectedDate: (state, action: PayloadAction<Dayjs>) => {
      state.selectedDate = action.payload;
    },
    addRow: (state) => {
      state.rows.push({
        id: String(state.rows.length),
        currency: "usd",
        amount: 0,
      });
    },
    removeRow: (state, action: PayloadAction<number>) => {
      state.rows = state.rows.filter(
        (row) => row.id !== String(action.payload)
      );
    },
  },
});

export const { setSelectedCurrency, setSelectedDate, addRow, removeRow } =
  currencySlice.actions;
export default currencySlice.reducer;
