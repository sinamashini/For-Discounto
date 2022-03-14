import { Box } from "@mui/material"
import { DataGrid } from "@mui/x-data-grid";
import { ObjPackage } from "app/packages/types";
import { FC } from "react"
import Columns from "./Columns";

interface Props {
  rows: ObjPackage[];
}

const PackagesDataGrid: FC<Props> = ({ rows }) => <Box sx={{ width: '100%', px: 0.5, pb: 5 }}>
  <DataGrid
    sx={{ border: 'unset', width: '100%' }}
    rows={rows}
    autoHeight
    columns={Columns}
    density="comfortable"
  />
</Box>;

export default PackagesDataGrid
