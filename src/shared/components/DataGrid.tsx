import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

import type { GridRowsProp, GridColDef } from "@mui/x-data-grid";

type TDataGridProps = {
  rows: GridRowsProp;
  columns: GridColDef[];
};

export const DataGridComponent = ({ rows, columns }: TDataGridProps) => {
  return (
    <Box sx={{ height: 500, width: "100%" }}>
      <DataGrid rows={rows} columns={columns} />
    </Box>
  );
};
