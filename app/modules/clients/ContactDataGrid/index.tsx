import React, { FC } from 'react';
import AppsContent from '@zhava/core/AppsContainer/AppsContent';
import { DataGrid } from '@mui/x-data-grid';
import InfoViewGraphql from '@zhava/core/AppInfoView/InfoGraphql';
import contactsColumns from './columns';
import { Box } from '@mui/material';
import { Clients } from '@prisma/client';
import { UpdateContactCache } from '../types';

interface Props {
  clients: Clients[];
  isLoading?: boolean;
  error?: string;
  deleteHandle: (id: number) => void;
  handleAddOrUpdateContact: (client: UpdateContactCache, opration: 'add' | 'update') => void;
}

const ContatctsList: FC<Props> = ({ clients, isLoading, error, deleteHandle, handleAddOrUpdateContact }) => <InfoViewGraphql loading={isLoading} error={error as string}>
  <AppsContent>
    <Box sx={{ width: '100%', padding: 5 }}>
      <DataGrid
        rows={clients}
        autoHeight
        columns={contactsColumns({
          handleDelete: deleteHandle,
          handleAddOrUpdateContact
        })}
        density="comfortable"
      />
    </Box>
  </AppsContent>
</InfoViewGraphql>;

export default ContatctsList;
