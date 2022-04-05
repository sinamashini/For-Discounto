import { Typography, Box } from '@mui/material';
import { DataGrid, GridRenderCellParams, GridRowParams, GridSelectionModel } from '@mui/x-data-grid';
import { ClientsMap } from '@prisma/client';
import { FC, useEffect, useState } from 'react';

interface Props {
  clients: ClientsMap[];
  numberOfPeopleIncluded: number;
  selectionModel: GridSelectionModel;
  setSelectionModel: (selectionModel: GridSelectionModel) => void;
  discountFn: (selectionModel, price: number) => void;
  price: number;
}

const SubSetSlectiveDataGrid: FC<Props> = ({ clients, numberOfPeopleIncluded, selectionModel, setSelectionModel, discountFn, price }) => {

  const handleChangeSelectionModel = (params: GridSelectionModel) => {
    if (params.length < numberOfPeopleIncluded + 1) {
      setSelectionModel(params);
      discountFn(selectionModel, price);
    }
  }

  return <Box sx={{ width: '100%' }}>
    <DataGrid
      autoHeight
      rows={clients.map((client: any) => ({ name: client.child.name, ...client, id: client.childId }))}
      columns={columns}
      checkboxSelection
      isRowSelectable={(params: GridRowParams) => params.row.status === 'ACTIVE'}
      selectionModel={selectionModel}
      onSelectionModelChange={(newSelectionModel) => handleChangeSelectionModel(newSelectionModel)}
    />
  </Box>
}


const columns = [
  {
    field: 'id',
    headerName: 'شناسه',
    hide: true,
    width: 50,
  },
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
    field: 'percent',
    headerName: 'درصد تخفیف',
    width: 200,
    renderCell: (params: GridRenderCellParams) => {
      const level = params.row.child.packageClients[0].package.level.find(item => item.levelNumber === params.row.level);
      return <Typography fontSize={14} fontWeight="bold">{level.percent}%</Typography>
    }
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

export default SubSetSlectiveDataGrid;
