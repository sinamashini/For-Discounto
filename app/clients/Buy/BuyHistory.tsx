import { FC } from 'react';
import { Box, Typography } from "@mui/material"
import { DataGrid, GridRenderCellParams } from "@mui/x-data-grid"
import { useQuery } from 'blitz';
import AppDialog from '@zhava/core/AppDialog';
import getBuyHistory from 'app/buyHistory/queries/getBuyHistory';
import { styled } from '@mui/material/styles';
import moment from 'jalali-moment';


const Rial = styled('span')`
  font-size: 10px;
  font-weight: bold;
`

interface Props {
  clientId: number;
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
}
const BuyHistory: FC<Props> = ({ openModal, setOpenModal, clientId }) => {
  const [history, { isLoading }] = useQuery(getBuyHistory, { clientId })

  if (isLoading) return <></>;

  return <AppDialog
    maxWidth="md"
    open={openModal}
    onClose={() => setOpenModal(false)}>
    <Box sx={{
      width: '100%',
      '& .status-USED': {
        bgcolor: '#4e2727F'
      }
    }}>
      <DataGrid
        rows={history}
        autoHeight
        columns={cols}
        getRowClassName={(params) => `status-${params.row.status}`}
      />
    </Box>
  </AppDialog>
}


const cols = [
  {
    field: 'price',
    headerName: 'هزینه',
    width: 200,
    renderCell: (params: GridRenderCellParams) => {
      return <Typography>{params.value.toLocaleString()} {' '} <Rial>  ریال  </Rial></Typography>
    }
  },
  {
    field: 'priceWithDiscount',
    headerName: 'پرداختی با تخفیف',
    width: 200,
    renderCell: (params: GridRenderCellParams) => {
      return <Typography>{params.value.toLocaleString()} {' '} <Rial>  ریال  </Rial></Typography>
    }
  },
  {
    field: 'createdAt',
    headerName: 'تاریخ',
    width: 200,
    renderCell: (params: GridRenderCellParams) => <Typography fontFamily="IRANYekan(FaNum)">{moment(new Date(params.value)).locale('fa').format('YYYY/MM/DD')}</Typography>
  },
  {
    field: 'description',
    headerName: 'بابت',
    width: 400,
    renderCell: (params: GridRenderCellParams) => <>{(!params.value) ? 'ثبت نشده' : params.value}</>
  },
]

export default BuyHistory;
