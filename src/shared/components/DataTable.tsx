import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

import type { GridRowsProp, GridColDef } from "@mui/x-data-grid";

type TDataTableProps = {
  rows: GridRowsProp;
  columns: GridColDef[];
};

export const DataTable = ({ rows, columns }: TDataTableProps) => {
  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
};
