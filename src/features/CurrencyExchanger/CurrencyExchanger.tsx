import {
	GridActionsCellItem,
	type GridColDef,
	GridDeleteIcon
} from '@mui/x-data-grid';
import type { Dayjs } from 'dayjs';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import type {
	CurrencyRateResponse,
	CurrencyRateRow
} from '../../shared/@types/types';
import { DataGridComponent } from '../../shared/components/DataGrid';
import { DatePickerComponent } from '../../shared/components/DatePicker';
import { SelectComponent } from '../../shared/components/Select';
import {
	DEFAULT_CURRENCY,
	DEFAULT_DATE,
	DEFAULT_DATE_FORMAT,
	DEFAULT_DATE_STRING,
	MAX_ROWS,
	MIN_DAYS_FROM_START,
	MIN_ROWS
} from '../../shared/constants';
import { useGetCurrencies } from '../../shared/hooks/useGetCurrencies';
import { useGetCurrencyRates } from '../../shared/hooks/useGetCurrencyRates';
import type { AppDispatch, RootState } from '../../shared/store/store';
import { filterCurrencyCodes } from '../../shared/utils/filterCurrencyCodes';
import { filterCurrencyRates } from '../../shared/utils/filterCurrencyRates';
import { formatCurrency } from '../../shared/utils/formatCurrency';

export const CurrencyExchanger = () => {
	const displayedCurrencyRates = useSelector(
		(state: RootState) => state.currency.displayedCurrencyRates
	);
	const selectedCurrency = useSelector(
		(state: RootState) => state.currency.selectedCurrency
	);
	const selectedDate = useSelector(
		(state: RootState) => state.currency.selectedDate
	);
	const dispatch = useDispatch<AppDispatch>();

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

	const handleCurrencyChange = (
		e:
			| React.ChangeEvent<
					Omit<HTMLInputElement, 'value'> & {
						value: string;
					}
			  >
			| (Event & {
					target: {
						value: string;
						name: string;
					};
			  })
	) => {
		let value: string | undefined;
		if (typeof e === 'string') {
			value = e;
		} else if (e && 'target' in e) {
			const target = (
				e as
					| React.ChangeEvent<HTMLSelectElement>
					| React.ChangeEvent<HTMLInputElement>
			).target as HTMLInputElement | HTMLSelectElement;
			value = target?.value;
		}
		if (typeof value === 'string') {
			dispatch({ type: 'currency/setSelectedCurrency', payload: value });
		}
	};

	const handleDateChange = (date: Dayjs | null) => {
		if (date) {
			dispatch({
				type: 'currency/setSelectedDate',
				payload: date
			});
		}
	};

	const handleRemoveRow = (currency: string) => {
		dispatch({
			type: 'currency/removeRow',
			payload: currency
		});
	};

	const handleAddRow = (
		e:
			| React.ChangeEvent<
					Omit<HTMLInputElement, 'value'> & {
						value: string;
					}
			  >
			| (Event & {
					target: {
						value: string;
						name: string;
					};
			  })
	) => {
		let value: string | undefined;
		if (typeof e === 'string') {
			value = e;
		} else if (e && 'target' in e) {
			const target = (
				e as
					| React.ChangeEvent<HTMLSelectElement>
					| React.ChangeEvent<HTMLInputElement>
			).target as HTMLInputElement | HTMLSelectElement;
			value = target?.value;
		}

		if (typeof value === 'string') {
			const id = (displayedCurrencyRates.length + 1).toString();
			const currencyRow: CurrencyRateRow = {
				id,
				currency: formatCurrency(value, currencies || {})
			};
			dispatch({
				type: 'currency/addRow',
				payload: currencyRow.currency.split(' - ')[0].toLowerCase()
			});
			setAddCurrency(currencyRow.currency);
		}
	};

	const mapDataToRows = (arr: CurrencyRateResponse[]): CurrencyRateRow[] => {
		const result: Record<string, CurrencyRateRow> = {};
		arr.forEach(({ date, data }) => {
			Object.entries(data).forEach(([currency, value], index) => {
				if (!result[currency]) {
					result[currency] = {
						id: (index + 1).toString(),
						currency: formatCurrency(currency, currencies || {})
					};
				}
				result[currency][date] = value;
			});
		});

		return Object.values(result);
	};

	const rows = mapDataToRows(filteredCurrencyRates || []);

	const columns: GridColDef<CurrencyRateRow>[] = [
		{ field: 'id', headerName: 'ID', width: 40 },
		{ field: 'currency', headerName: 'Currency', width: 200 },
		...(filteredCurrencyRates ?? []).reverse().map(day => ({
			field: day.date,
			headerName: day.date,
			width: 130
		})),
		{
			field: 'delete',
			headerName: '',
			width: 50,
			renderCell: params => {
				if (displayedCurrencyRates.length > MIN_ROWS) {
					return (
						<GridActionsCellItem
							icon={<GridDeleteIcon />}
							label="Delete"
							onClick={() =>
								handleRemoveRow(
									params.row.currency.split(' - ')[0].toLowerCase()
								)
							}
							color="inherit"
						/>
					);
				}
			}
		}
	];

	return (
		<>
			<SelectComponent
				value={selectedCurrency || DEFAULT_CURRENCY}
				options={currencies || {}}
				onChange={e => handleCurrencyChange(e)}
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
					onChange={e => handleAddRow(e)}
				/>
			)}
			<DataGridComponent rows={rows} columns={columns} />
		</>
	);
};
