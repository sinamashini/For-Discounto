import { SxProps, Theme } from '@mui/material';
import React, { ReactNode } from 'react';
import { AppScrollbar } from '../../../index';

interface AppsContentProps {
  children: ReactNode;
  isDetailView?: boolean;
  fullView?: boolean;
  sx: SxProps<Theme>;
  [x: string]: any;
}

const AppsContent: React.FC<AppsContentProps> = ({
  children,
  isDetailView,
  fullView,
  rest,
  sx
}) => {
  return (
    <AppScrollbar
      sx={{
        width: '100%',
        paddingTop: 8,
        paddingBottom: 8,
        display: 'flex',
        flexDirection: 'column',
        height: {
          sx: `calc(100% - ${isDetailView ? 60 : 129}px)`,
          sm: `calc(100% - ${fullView ? 0 : 60}px)`,
        },

        '& .simplebar-content': {
          height: '100%',
        },
        ...sx
      }}
      {...rest}
    >
      {children}
    </AppScrollbar>
  );
};

export default AppsContent;
