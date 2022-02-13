import { GridRenderCellParams } from "@mui/x-data-grid";
import { User } from "@prisma/client";
import UserTools from "./UserTools";

export default [
  {
    field: 'id',
    headerName: 'ID',
    hide: true,
    width: 200,
  },
  {
    field: 'name',
    headerName: 'نام',
    width: 200,
  },
  {
    field: 'contact',
    headerName: 'تلفن',
    width: 100,
  },
  {
    field: 'nationalCode',
    headerName: 'کد ملی',
    hide: false,
    width: 100,
  },
  {
    field: 'tools',
    headerName: "ابزار",
    width: 100,
    renderCell: (params: GridRenderCellParams) => <UserTools user={params.row as User} />
  }
]
