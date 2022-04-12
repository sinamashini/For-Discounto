import React, { FC, createRef, useState } from 'react';
import AppsContent from '@zhava/core/AppsContainer/AppsContent';
import { DataGrid, GridFilterPanel, GridToolbar } from '@mui/x-data-grid';
import contactsColumns from './columns';
import { Box } from '@mui/material';
import { GetClientResult } from '../types';
import AppsHeader from '@zhava/core/AppsContainer/AppsHeader';
import { AppSearchBar } from '@zhava/index';
import { useRouter } from 'blitz';

interface Props {
  clients: GetClientResult;
  deleteHandle: (id: number) => void;
  handleAddOrUpdateContact: (opration: 'add' | 'update', data: any) => Promise<void>;
}

const ContatctsList: FC<Props> = ({ clients, deleteHandle, handleAddOrUpdateContact }) => {
  const contentRef = createRef();
  const [keyword, setKeyword] = useState('');

  const router = useRouter();

  const { status = "all" } = router.query;

  const handleSearch = (filterText: string) => {
    setKeyword(filterText);
    setTimeout(() => router.push({
      pathname: "/clients/[status]", query: {
        status,
        keyword: filterText
      }
    }), 1000);
  }
  return <Box
    sx={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    }}
    ref={contentRef}
  >
    <AppsHeader>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: { xs: "100%", sm: "auto" },
        }}
      >
        <Box sx={{ mr: 5 }}>
          <AppSearchBar
            iconPosition="right"
            overlap={false}
            value={keyword}
            onChange={(event: any) => handleSearch(event.target.value)}
            placeholder={"جستجوی کاربر"}
          />
        </Box>
      </Box>
    </AppsHeader>
    <AppsContent sx={{ pt: 0 }}>
      <Box sx={{ width: '100%', px: 0.5, pb: 5 }}>
        <DataGrid
          sx={{ border: 'unset', width: '100%' }}
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
  </Box>
}

export default ContatctsList;
