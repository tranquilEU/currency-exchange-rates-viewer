import type { Dayjs } from 'dayjs';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getCurrencyColumns } from '@/features/CurrencyExchanger/columns';
import { mapDataToRows } from '@/features/CurrencyExchanger/currencymapper';

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
import { useToast } from '@/shared/hooks/useToast';

import {
	DEFAULT_CURRENCY,
	DEFAULT_DATE_FORMAT,
	DEFAULT_DATE_STRING,
	MAX_ROWS
} from '@/shared/constants';

import type {
	CurrencyChangeEvent,
	CurrencyRateRow
} from '@/shared/@types/types';

import { extractValue } from '@/shared/utils/extractValue';
import { filterCurrencyRates } from '@/shared/utils/filterCurrencyRates';
import { formatCurrency } from '@/shared/utils/formatCurrency';

export const useCurrencyExchanger = () => {
	const dispatch = useDispatch();

	const displayedCurrencyRates = useSelector(selectDisplayedCurrencyRates);
	const selectedCurrency = useSelector(selectSelectedCurrency);
	const selectedDate = useSelector(selectSelectedDate);

	const [addCurrency, setAddCurrency] = useState('');
	const [confirmOpen, setConfirmOpen] = useState(false);
	const [currencyToDelete, setCurrencyToDelete] = useState<string | null>(null);

	const { open, setOpen, toastMessage, toastSeverity, triggerToast } =
		useToast();

	const { data: currencies } = useGetCurrencies({ triggerToast });
	const { data: currencyRates, isLoading } = useGetCurrencyRates({
		date: selectedDate?.format(DEFAULT_DATE_FORMAT) || DEFAULT_DATE_STRING,
		baseCurrency: selectedCurrency || DEFAULT_CURRENCY,
		triggerToast
	});

	const showAddCurrency = displayedCurrencyRates.length < MAX_ROWS;

	const filteredCurrencyRates = filterCurrencyRates(
		selectedCurrency,
		displayedCurrencyRates,
		currencyRates
	);

	const rows = mapDataToRows(filteredCurrencyRates || [], currencies);
	const columns = getCurrencyColumns(
		filteredCurrencyRates,
		displayedCurrencyRates,
		handleRemoveRow
	);

	function handleCurrencyChange(e: CurrencyChangeEvent) {
		const value = extractValue(e);
		if (value) dispatch(setSelectedCurrency(value));
	}

	function handleDateChange(date: Dayjs | null) {
		if (date) dispatch(setSelectedDate(date.format(DEFAULT_DATE_FORMAT)));
	}

	function handleRemoveRow(currency: string) {
		setCurrencyToDelete(currency);
		setConfirmOpen(true);
	}

	function handleConfirmDelete() {
		if (currencyToDelete) {
			dispatch(removeRow(currencyToDelete));
			triggerToast(`Removed ${currencyToDelete.toUpperCase()}`, 'info');
		}
		setConfirmOpen(false);
		setCurrencyToDelete(null);
		setOpen(true);
	}

	function handleCancelDelete() {
		setConfirmOpen(false);
		setCurrencyToDelete(null);
	}

	function handleAddRow(e: CurrencyChangeEvent) {
		const value = extractValue(e);
		if (value) {
			const currencyRow: CurrencyRateRow = {
				id: (displayedCurrencyRates.length + 1).toString(),
				currency: formatCurrency(value, currencies || {})
			};
			dispatch(addRow(currencyRow.currency.split(' - ')[0].toLowerCase()));
			setAddCurrency(currencyRow.currency);
			triggerToast(`Added ${currencyRow.currency}`, 'success');
			setOpen(true);
		}
	}

	return {
		addCurrency,
		confirmOpen,
		currencyToDelete,
		open,
		toastMessage,
		toastSeverity,
		showAddCurrency,
		rows,
		columns,
		selectedCurrency,
		selectedDate,
		currencies,
		isLoading,
		setOpen,
		handleCurrencyChange,
		handleDateChange,
		handleAddRow,
		handleRemoveRow,
		handleConfirmDelete,
		handleCancelDelete
	};
};
