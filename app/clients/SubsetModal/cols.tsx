import { Tooltip, Typography } from "@mui/material"
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
    width: 400,
    renderCell: (params: GridRenderCellParams) => {
      const statusToShow = { ACTIVE: "فعال", DEACTIVE: "غیر فعال", "USED_AND_DEACTIVE": "استفاده شده و در حال حاضر مراجع غیر فعال شده یا زیر مجموعه شخص دیگری است", USED: "استفاده شده" }[params.value] ?? 'نا مشخص'
      return <Tooltip title={statusToShow}><Typography sx={{ color: (params.value === "ACTIVE") ? 'green' : "red", fontSize: '11px' }}>{statusToShow}</Typography></Tooltip>
    }
  }
]
