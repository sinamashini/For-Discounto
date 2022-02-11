import { Typography } from "@mui/material"
import { GridRenderCellParams } from "@mui/x-data-grid"

export default [
  {
    field: 'name',
    headerName: 'نام',
    width: 200,
  },
  {
    field: 'level',
    headerName: 'سطح',
    width: 200,
  },
  {
    field: 'status',
    headerName: 'وضعیت',
    width: 200,
    renderCell: (params: GridRenderCellParams) => {
      return <Typography sx={{ color: (params.value === "ACTIVE") ? 'green' : "red" }}>{(params.value === "ACTIVE") ? "فعال" : "غیر فعال"}</Typography>
    }
  }
]
