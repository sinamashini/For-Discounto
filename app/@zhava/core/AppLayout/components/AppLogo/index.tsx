import React from 'react';
import {Box} from '@mui/material';
import {useThemeContext} from '../../../../utility/AppContextProvider/ThemeContextProvider';
import { alpha } from '@mui/material/styles';
import { Image } from 'blitz';


interface AppLogoProps {
  color?: string;
}

const AppLogo: React.FC<AppLogoProps> = () => {
  const {theme} = useThemeContext();

  return (
    <Box
      sx={{
        width: '80px !important',
      }}
    >
      <Image src="/assets/logos/Turquoice.png" alt="logo" width={300} height={300} layout="responsive"/>
    </Box>
  );
};

export default AppLogo;
