import { Backdrop, CircularProgress } from '@mui/material';
import { FC } from 'react';

interface AppLoaderProps {
    isLoading: boolean;
}

const AppLoaderTransparent: FC<AppLoaderProps> = ({ isLoading, children }) => {
    return <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
    >
        <CircularProgress color="inherit" />
    </Backdrop>

}

export default AppLoaderTransparent;

