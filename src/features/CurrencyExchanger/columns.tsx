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
	handleRemoveRow: (currency: string) => void
): GridColDef<CurrencyRateRow>[] => [
	{
		field: 'id',
		headerName: 'ID',
		width: 40,
		renderHeader: () => <div className="id-column-cell">ID</div>,

		renderCell: params => <div className="id-column-cell">{params.value}</div>
	},
	{ field: 'currency', headerName: 'Currency', flex: 2 },
	...(filteredCurrencyRates ?? []).reverse().map(day => ({
		field: day.date,
		headerName: day.date,
		flex: 1
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
