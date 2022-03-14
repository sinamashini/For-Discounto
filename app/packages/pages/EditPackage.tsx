import React, { createRef, FC } from 'react';
import { Box, Zoom, Button } from '@mui/material';
import AppsContainer from '@zhava/core/AppsContainer';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useQuery, useRouter } from 'blitz';
import CreatePackage from '../components/CreatePackage';
import AppsHeader from '@zhava/core/AppsContainer/AppsHeader';
import AppsContent from '@zhava/core/AppsContainer/AppsContent';
import getPackage from '../queries/getPackage';
import { AppLoader } from '@zhava/index';
import { ObjPackage } from '../types';

const EditPackage: FC = () => {
  const router = useRouter();
  const contentRef = createRef();
  const { packageId } = router.query;

  const [pac, { isLoading }] = useQuery(getPackage, { query: { where: { id: parseInt(packageId as string) } } })

  if (!packageId) {
    router.push('/packages/management');
    return <></>;
  }


  if (isLoading) return <AppLoader />

  return (<AppsContainer
    title={"ویرایش پکیج"}
    fullView={true}
  >
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
      ref={contentRef}
    >
      <AppsHeader>
        <Box sx={{ width: '100%', pl: 3 }}>
          <Zoom in style={{ transitionDelay: "300ms" }}>
            <Button
              variant="outlined"
              color="primary"
              sx={{
                float: 'left',
                padding: "8px 28px",
                borderRadius: 8,
                "& .MuiSvgIcon-root": {
                  fontSize: 26,
                },
              }}
              startIcon={<ArrowForwardIcon sx={{ ml: 2 }} />}
              onClick={() => router.push('/packages/management')}
            >
              بازگشت به  پکیج ها
            </Button>
          </Zoom>
        </Box>
      </AppsHeader>
      <AppsContent sx={{ pt: 0 }}>
        <CreatePackage selectPackage={pac as ObjPackage} />
      </AppsContent>
    </Box>
  </AppsContainer>
  );
};

export default EditPackage;
