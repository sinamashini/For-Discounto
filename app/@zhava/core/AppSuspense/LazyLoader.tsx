import { FC, useEffect, useState } from 'react';
import AppLoader from '../AppLoader';
import Backdrop from '@mui/material/Backdrop';
import { CircularProgress } from '@mui/material';


export interface LazyLoaderProps {
    delay?: number;
}

const LazyLoader: FC<LazyLoaderProps> = ({
    delay = 5,
    ...props
}) => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setShow(true);
        }, delay);
        return () => {
            clearTimeout(timeout);
        };
    }, [delay]);

    return show ? <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open
    >
        <CircularProgress color="inherit" />
    </Backdrop> : null;
};

export { LazyLoader as default };
