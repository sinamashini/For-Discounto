import React, { FC, createRef, useState } from 'react';
import AppsContent from '@zhava/core/AppsContainer/AppsContent';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import AppsHeader from '@zhava/core/AppsContainer/AppsHeader';
import { AppLoader, AppSearchBar } from '@zhava/index';
import { useQuery, useRouter } from 'blitz';
import getAllUsers from '../queries/getAllUsers';
import { Role } from 'types';
import UserCols from './datagrid/UserCols';


const UsersList: FC = () => {
  const contentRef = createRef();
  const [keyword, setKeyword] = useState('');
  const router = useRouter();
  const { role = "all" } = router.query

  const [users, { isLoading }] = useQuery(getAllUsers, {
    where: {
      ...(role !== 'all' && { role: role as Role }),
      OR: [
        { name: keyword, },
        { nationalCode: keyword },
        { contact: keyword },
        { email: keyword }]
    }
  })

  if (isLoading) return <AppLoader />

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
            placeholder={"جستجوی کارمند"}
          />
        </Box>
      </Box>
    </AppsHeader>
    <AppsContent sx={{ pt: 0 }}>
      <Box sx={{ width: '100%', px: 0.5, pb: 5 }}>
        <DataGrid
          sx={{ border: 'unset', width: '100%' }}
          rows={users}
          autoHeight
          columns={UserCols}
          density="comfortable"
        />
      </Box>
    </AppsContent>
  </Box>
}

export default UsersList;
