import { useCurrencyExchanger } from '@/features/CurrencyExchanger/useCurrencyExchanger';

import { DataGridComponent } from '@/shared/components/DataGrid';
import { DatePickerComponent } from '@/shared/components/DatePicker';
import { DialogComponent } from '@/shared/components/Dialog';
import { SelectComponent } from '@/shared/components/Select';
import { Toast } from '@/shared/components/Toast';

import {
	DEFAULT_CURRENCY,
	DEFAULT_CURRENCY_OPTION,
	DEFAULT_DATE,
	MIN_DAYS_FROM_START
} from '@/shared/constants';

import { filterCurrencyCodes } from '@/shared/utils/filterCurrencyCodes';

import type { CurrencyRateRow } from '@/shared/types/types';

export const CurrencyExchanger = () => {
	const {
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
		handleConfirmDelete,
		handleCancelDelete
	} = useCurrencyExchanger();

	return (
		<div className="currency-exchanger-container">
			<div className="header-container">
				<h1 className="header-text">Currency Exchange Rates Viewer</h1>
				<img src="/currency.svg" alt="currency" className="currency-icon" />
			</div>
			<div className="controls-container">
				<SelectComponent
					value={selectedCurrency || DEFAULT_CURRENCY}
					options={currencies || DEFAULT_CURRENCY_OPTION}
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
						placeholder="Add New Currency"
						options={filterCurrencyCodes(
							rows.map((r: CurrencyRateRow) => r.currency),
							selectedCurrency,
							currencies
						)}
						onChange={handleAddRow}
					/>
				)}
			</div>
			<DataGridComponent rows={rows} columns={columns} isLoading={isLoading} />
			<DialogComponent
				title="Confirm Deletion"
				confirmText={
					<>
						Are you sure you want to remove{' '}
						<span className="text--bold">
							{currencyToDelete?.toUpperCase()}
						</span>
						?
					</>
				}
				confirmOpen={confirmOpen}
				handleCancelDelete={handleCancelDelete}
				handleConfirmDelete={handleConfirmDelete}
			/>
			<Toast
				open={open}
				message={toastMessage}
				severity={toastSeverity}
				onClose={() => setOpen(false)}
			/>
		</div>
	);
};
