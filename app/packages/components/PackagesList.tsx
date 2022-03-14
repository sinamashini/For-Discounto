import React, { createRef, useState, FC } from 'react';
import { Box, Zoom, Button } from '@mui/material';
import AppsHeader from '@zhava/core/AppsContainer/AppsHeader';
import AppsContent from '@zhava/core/AppsContainer/AppsContent';
import AddIcon from "@mui/icons-material/Add";
import { invalidateQuery, invoke, useQuery, useRouter } from "blitz";
import { AppSearchBar } from '@zhava/index';
import PackagesDataGrid from './PackagesDataGrid';
import getPackages from '../queries/getPackages';
import AppLoaderHandler from '@zhava/core/AppLoaderHandler';
import { ObjPackage } from '../types';

const PackagesList: FC = () => {
  const router = useRouter();
  const contentRef = createRef();
  const [keyword, setKeyword] = useState('');
  const [packages, { isLoading }] = useQuery(getPackages, {
    query: {
      where: { status: "ACTIVE", ...(keyword !== '' && { name: keyword }) },
      orderBy: { createdAt: 'desc' }
    }
  });


  const handleSearch = (filterText: string) => {
    setTimeout(() => setKeyword(filterText), 500);
  }

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
      ref={contentRef}
    > <AppLoaderHandler isLoading={isLoading}>
        <AppsHeader>
          <Box sx={{ width: '100%', pr: 3 }}>
            <Zoom in style={{ transitionDelay: "300ms" }}>
              <Button
                variant="outlined"
                color="primary"
                sx={{
                  padding: "8px 28px",
                  borderRadius: 8,
                  "& .MuiSvgIcon-root": {
                    fontSize: 26,
                  },
                }}
                startIcon={<AddIcon sx={{ ml: 2 }} />}
                onClick={() => router.replace("/packages/add-package")}
              >
                اضافه کردن پکیج
              </Button>
            </Zoom>
          </Box>
          <Box sx={{ mr: 5 }}>
            <AppSearchBar
              iconPosition="right"
              overlap={false}
              value={keyword}
              onChange={(event: any) => handleSearch(event.target.value)}
              placeholder={"جستجوی پکیج"}
            />
          </Box>
        </AppsHeader>
        <AppsContent sx={{ pt: 0 }}>
          <PackagesDataGrid rows={packages as ObjPackage[]} />
        </AppsContent>
      </AppLoaderHandler>
    </Box>
  );
};

export default PackagesList;
