import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef, GridRowsProp } from '@mui/x-data-grid';

type TDataGridProps = {
	rows: GridRowsProp;
	columns: GridColDef[];
	isLoading?: boolean;
};

export const DataGridComponent = ({
	rows,
	columns,
	isLoading
}: TDataGridProps) => {
	return (
		<Box sx={{ height: 500, width: '100%' }}>
			<DataGrid rows={rows} loading={isLoading} columns={columns} />
		</Box>
	);
};
