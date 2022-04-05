import { GridRenderCellParams } from "@mui/x-data-grid";
import { Typography } from '@mui/material'
import LevelsDetailModal from "./LevelsDetailModal";
import PackageTools from "./PackageTools";

export const Columns = [
  {
    field: 'id',
    headerName: 'شناسه',
    hide: true,
    width: 200,
  },
  {
    field: 'name',
    headerName: 'نام',
    width: 200,
  },
  {
    field: 'version',
    headerName: 'ورژن',
    width: 80,
  },
  {
    field: 'maxPayment',
    headerName: "حداکثر پرداخت",
    width: 200,
    renderCell: (params: GridRenderCellParams) => <Typography sx={{ fontSize: '16px' }}>{Number(params.value).toLocaleString()} ریال</Typography>
  },
  {
    field: 'deadLineAfterMaxPayment',
    headerName: "مدت زمان مجاز استفاده",
    width: 200,
    renderCell: (params: GridRenderCellParams) => <Typography sx={{ fontSize: '16px' }}>{params.value} {' '} روز</Typography>
  },
  {
    field: 'numberOfPeopleIncluded',
    headerName: "تعداد افراد مجاز",
    width: 120,
    renderCell: (params: GridRenderCellParams) => <Typography sx={{ fontSize: '16px' }}>{params.value}</Typography>
  },
  {
    field: 'level',
    headerName: 'سطوح',
    width: 100,
    renderCell: (params: GridRenderCellParams) => <LevelsDetailModal
      packages={params.row}
    />

  },
  {
    field: 'tools',
    headerName: 'ابزار',
    width: 200,
    renderCell: (params: GridRenderCellParams) => <PackageTools id={params.row.id} packages={params.row} />
  }
]

export default Columns;
