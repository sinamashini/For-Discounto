import React from 'react';
import { Box } from '@mui/material';
import { useThemeContext } from '../../../../utility/AppContextProvider/ThemeContextProvider';
import { alpha } from '@mui/material/styles';
import { Image } from 'blitz';


interface AppLogoProps {
    color?: string;
    logoWidth?: string;
}

const AppLogo: React.FC<AppLogoProps> = ({ logoWidth }) => {
    const { theme } = useThemeContext();

    return (
        <Box
            sx={{
                width: `${logoWidth} !important`,
            }}
        >
            <Image src="/assets/logos/Turquoice.png" alt="logo" width={300} height={300} layout="responsive" />
        </Box>
    );
};

AppLogo.defaultProps = {
    logoWidth: '80px',
}

export default AppLogo;
