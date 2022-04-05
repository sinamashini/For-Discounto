import { AppList } from '@zhava/index';
import AppDialog from '@zhava/core/AppDialog';
import getClientMap from 'app/clientMap/queries/getClientMap';
import { useQuery } from 'blitz';
import { FC } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import cols from './cols';
import { Box } from '@mui/material';
interface Props {
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
  clientId: number;
}

const SubsetModal: FC<Props> = ({ openModal, setOpenModal, clientId }) => {
  const [clients, { isLoading }] = useQuery(getClientMap, { where: { parentId: clientId }, include: { child: true, } });

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
        rows={clients.map((client: any) => ({ name: client.child.name, ...client }))}
        autoHeight
        columns={cols}
        getRowClassName={(params) => `status-${params.row.status}`}
      />
    </Box>
  </AppDialog>
}

export default SubsetModal;
