import { Backdrop, CircularProgress } from '@mui/material';
import { FC } from 'react';

interface AppLoaderProps {
  isLoading?: boolean;
}

const AppLoaderHandler: FC<AppLoaderProps> = ({ isLoading, children }) => {
  if (isLoading) return <Backdrop
    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
    open={isLoading}
  >
    <CircularProgress color="inherit" />
  </Backdrop>
  return <>{children}</>
}

export default AppLoaderHandler;

AppLoaderHandler.defaultProps = { isLoading: false }
