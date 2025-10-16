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
		renderCell: params =>
			displayedCurrencyRates.length > MIN_ROWS ? (
				<GridActionsCellItem
					icon={<GridDeleteIcon />}
					label="Delete"
					onClick={() =>
						handleRemoveRow(params.row.currency.split(' - ')[0].toLowerCase())
					}
					color="inherit"
				/>
			) : null
	}
];
