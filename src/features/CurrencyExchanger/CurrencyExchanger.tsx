import type { Dayjs } from 'dayjs';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getCurrencyColumns } from '@/features/CurrencyExchanger/columns';
import { mapDataToRows } from '@/features/CurrencyExchanger/currencymapper';

import { DataGridComponent } from '@/shared/components/DataGrid';
import { DatePickerComponent } from '@/shared/components/DatePicker';
import { SelectComponent } from '@/shared/components/Select';

import {
	addRow,
	removeRow,
	selectDisplayedCurrencyRates,
	selectSelectedCurrency,
	selectSelectedDate,
	setSelectedCurrency,
	setSelectedDate
} from '@/shared/store/currencySlice';

import { useGetCurrencies } from '@/shared/hooks/useGetCurrencies';
import { useGetCurrencyRates } from '@/shared/hooks/useGetCurrencyRates';

import {
	DEFAULT_CURRENCY,
	DEFAULT_DATE,
	DEFAULT_DATE_FORMAT,
	DEFAULT_DATE_STRING,
	MAX_ROWS,
	MIN_DAYS_FROM_START
} from '@/shared/constants';

import type {
	CurrencyChangeEvent,
	CurrencyRateRow
} from '@/shared/@types/types';

import { extractValue } from '@/shared/utils/extractValue';
import { filterCurrencyCodes } from '@/shared/utils/filterCurrencyCodes';
import { filterCurrencyRates } from '@/shared/utils/filterCurrencyRates';
import { formatCurrency } from '@/shared/utils/formatCurrency';

export const CurrencyExchanger = () => {
	const dispatch = useDispatch();

	const displayedCurrencyRates = useSelector(selectDisplayedCurrencyRates);
	const selectedCurrency = useSelector(selectSelectedCurrency);
	const selectedDate = useSelector(selectSelectedDate);

	const { data: currencies } = useGetCurrencies();
	const { data: currencyRates } = useGetCurrencyRates({
		date: selectedDate?.format(DEFAULT_DATE_FORMAT) || DEFAULT_DATE_STRING,
		baseCurrency: selectedCurrency || DEFAULT_CURRENCY
	});

	const [addCurrency, setAddCurrency] = useState<string>('');

	const showAddCurrency = displayedCurrencyRates.length < MAX_ROWS;

	const filteredCurrencyRates = filterCurrencyRates(
		selectedCurrency,
		displayedCurrencyRates,
		currencyRates
	);

	const handleCurrencyChange = (e: CurrencyChangeEvent) => {
		const value = extractValue(e);
		if (value) {
			dispatch(setSelectedCurrency(value));
		}
	};

	const handleDateChange = (date: Dayjs | null) => {
		if (date) {
			dispatch(setSelectedDate(date.format(DEFAULT_DATE_FORMAT)));
		}
	};

	const handleRemoveRow = (currency: string) => {
		dispatch(removeRow(currency));
	};

	const handleAddRow = (e: CurrencyChangeEvent) => {
		const value = extractValue(e);
		if (value) {
			const currencyRow: CurrencyRateRow = {
				id: (displayedCurrencyRates.length + 1).toString(),
				currency: formatCurrency(value, currencies || {})
			};
			dispatch(addRow(currencyRow.currency.split(' - ')[0].toLowerCase()));
			setAddCurrency(currencyRow.currency);
		}
	};

	const rows = mapDataToRows(filteredCurrencyRates || [], currencies);

	const columns = getCurrencyColumns(
		filteredCurrencyRates,
		displayedCurrencyRates,
		handleRemoveRow
	);

	return (
		<>
			<SelectComponent
				value={selectedCurrency || DEFAULT_CURRENCY}
				options={currencies || {}}
				onChange={handleCurrencyChange}
			/>
			<DatePickerComponent
				value={selectedDate ?? undefined}
				minDate={DEFAULT_DATE.subtract(MIN_DAYS_FROM_START, 'day')}
				onChange={handleDateChange}
			/>
			{showAddCurrency && (
				<SelectComponent
					value={addCurrency}
					options={filterCurrencyCodes(
						displayedCurrencyRates,
						selectedCurrency,
						currencies
					)}
					onChange={handleAddRow}
				/>
			)}
			<DataGridComponent rows={rows} columns={columns} />
		</>
	);
};
