import { Typography } from "@mui/material";
import { GridRenderCellParams } from "@mui/x-data-grid";
import ContactTools from "./ContactTools";
interface ColsInput {
  handleAddOrUpdateContact: (opration: 'add' | 'update', data: any) => void;
  handleDelete: (id: number) => void
}

const contactsColumns = ({ handleAddOrUpdateContact, handleDelete }: ColsInput) => [
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
    field: 'parent',
    headerName: 'معرف',
    width: 200,
    renderCell: (params: GridRenderCellParams) => {
      const parentName = params.row?.parent?.name;
      if (parentName) return <>{parentName}</>;
      return <Typography variant="body1" sx={{ color: 'orange' }}>ندارد</Typography>
    }
  },
  {
    field: 'tools',
    headerName: 'ابزار',
    filterable: false,
    sortable: false,
    width: 150,
    renderCell: (params: GridRenderCellParams) => <ContactTools
      client={params.row}
      onDelete={handleDelete}
      onUpdate={handleAddOrUpdateContact}
    />
  },
]

export default contactsColumns;
