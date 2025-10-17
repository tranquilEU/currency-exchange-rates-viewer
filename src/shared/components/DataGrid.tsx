import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef, GridRowsProp } from '@mui/x-data-grid';
import { memo } from 'react';

type TDataGridProps = {
	rows: GridRowsProp;
	columns: GridColDef[];
	isLoading?: boolean;
};

export const DataGridComponent = memo(
	({ rows, columns, isLoading }: TDataGridProps) => {
		return (
			<Box sx={{ height: 475, width: '100%' }}>
				<DataGrid
					className="table"
					rows={rows}
					loading={isLoading}
					columns={columns}
					hideFooter
				/>
			</Box>
		);
	}
);
