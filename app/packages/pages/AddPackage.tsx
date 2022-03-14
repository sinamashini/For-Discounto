import React, { createRef, FC } from 'react';
import { Box, Zoom, Button } from '@mui/material';
import AppsContainer from '@zhava/core/AppsContainer';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useRouter } from 'blitz';
import CreatePackage from '../components/CreatePackage';
import AppsHeader from '@zhava/core/AppsContainer/AppsHeader';
import AppsContent from '@zhava/core/AppsContainer/AppsContent';

const AddPackage: FC = () => {
  const router = useRouter();
  const contentRef = createRef();

  return (<AppsContainer
    title={"اضافه کردن پکیج"}
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
        <CreatePackage />
      </AppsContent>
    </Box>
  </AppsContainer>
  );
};

export default AddPackage;
