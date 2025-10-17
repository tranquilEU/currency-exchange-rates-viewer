import {
	GridActionsCellItem,
	type GridColDef,
	GridDeleteIcon
} from '@mui/x-data-grid';

import { MIN_ROWS } from '@/shared/constants';

import type {
	CurrencyRateResponse,
	CurrencyRateRow
} from '@/shared/@types/types';

export const getCurrencyColumns = (
	filteredCurrencyRates: CurrencyRateResponse[] | undefined,
	displayedCurrencyRates: string[],
	selectedDate: string | null,
	handleRemoveRow: (currency: string) => void
): GridColDef<CurrencyRateRow>[] => [
	{
		field: 'id',
		headerName: 'ID',
		width: 40,
		renderHeader: () => <div className="id-column-cell">ID</div>,

		renderCell: params => <div className="id-column-cell">{params.value}</div>
	},
	{
		field: 'currency',
		headerName: 'Currency',
		flex: 2,
		renderCell: params => (
			<div className="text--bold text--primary">{params.value}</div>
		)
	},
	...(filteredCurrencyRates ?? []).reverse().map(day => ({
		field: day.date,
		headerName: day.date,
		flex: 1,
		renderHeader: () => (
			<div
				className={day.date === selectedDate ? 'text--bold text--primary' : ''}
			>
				{day.date}
			</div>
		)
	})),
	{
		field: 'delete',
		headerName: '',
		width: 50,
		renderCell: params =>
			displayedCurrencyRates.length > MIN_ROWS ? (
				<GridActionsCellItem
					icon={<GridDeleteIcon />}
					label="Delete"
					className="delete"
					onClick={() =>
						handleRemoveRow(params.row.currency.split(' - ')[0].toLowerCase())
					}
				/>
			) : null
	}
];
