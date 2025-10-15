import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

import type { GridRowsProp, GridColDef } from "@mui/x-data-grid";

type TDataTableProps = {
  rows: GridRowsProp;
  columns: GridColDef[];
};

export const DataTable = ({ rows, columns }: TDataTableProps) => {
  return (
    <Box sx={{ height: 500, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
};
