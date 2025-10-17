import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getCurrencyColumns } from '@/features/CurrencyExchanger/columns';
import { mapDataToRows } from '@/features/CurrencyExchanger/mapper';

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

import { extractValue } from '@/shared/utils/extractValue';
import { filterCurrencyRates } from '@/shared/utils/filterCurrencyRates';
import { formatCurrency } from '@/shared/utils/formatCurrency';

import type {
	CurrencyChangeEvent,
	CurrencyRateRow
} from '@/shared/types/types';

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

	const filteredCurrencyRates = useMemo(
		() =>
			filterCurrencyRates(
				selectedCurrency,
				displayedCurrencyRates,
				currencyRates
			),
		[selectedCurrency, displayedCurrencyRates, currencyRates]
	);

	const handleRemoveRow = useCallback((currency: string) => {
		setCurrencyToDelete(currency);
		setConfirmOpen(true);
	}, []);

	const rows = useMemo(
		() => mapDataToRows(filteredCurrencyRates || [], currencies),
		[filteredCurrencyRates, currencies]
	);

	const columns = useMemo(
		() =>
			getCurrencyColumns(
				filteredCurrencyRates,
				displayedCurrencyRates,
				dayjs(selectedDate).format(DEFAULT_DATE_FORMAT),
				handleRemoveRow
			),
		[
			filteredCurrencyRates,
			displayedCurrencyRates,
			handleRemoveRow,
			selectedDate
		]
	);

	const handleCurrencyChange = useCallback(
		(e: CurrencyChangeEvent) => {
			const value = extractValue(e);
			if (value) {
				dispatch(setSelectedCurrency(value));
			}
		},
		[dispatch]
	);

	const handleDateChange = useCallback(
		(date: Dayjs | null) => {
			if (date) dispatch(setSelectedDate(date.format(DEFAULT_DATE_FORMAT)));
		},
		[dispatch]
	);

	const handleConfirmDelete = useCallback(() => {
		if (currencyToDelete) {
			dispatch(removeRow(currencyToDelete));
			triggerToast(
				`Removed currency: ${currencyToDelete.toUpperCase()}`,
				'info'
			);
		}
		setConfirmOpen(false);
		setCurrencyToDelete(null);
		setOpen(true);
	}, [currencyToDelete, dispatch, triggerToast, setOpen]);

	const handleCancelDelete = useCallback(() => {
		setConfirmOpen(false);
		setCurrencyToDelete(null);
	}, []);

	const handleAddRow = useCallback(
		(e: CurrencyChangeEvent) => {
			const value = extractValue(e);
			if (value) {
				const currencyRow: CurrencyRateRow = {
					id: (displayedCurrencyRates.length + 1).toString(),
					currency: formatCurrency(value, currencies || {})
				};
				dispatch(addRow(currencyRow.currency.split(' - ')[0].toLowerCase()));
				setAddCurrency(currencyRow.currency);
				triggerToast(`Added currency: ${currencyRow.currency}`, 'success');
				setOpen(true);
			}
		},
		[dispatch, currencies, displayedCurrencyRates.length, triggerToast, setOpen]
	);

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
