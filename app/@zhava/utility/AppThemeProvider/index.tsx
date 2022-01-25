import React, { ReactElement } from "react";
import {
  createTheme,
  StyledEngineProvider,
  ThemeProvider,
} from "@mui/material/styles";
import AppLocale from "shared/localization";
import { useThemeContext } from "../AppContextProvider/ThemeContextProvider";
import { useLocaleContext } from "../AppContextProvider/LocaleContextProvide";
// import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateAdapter from '@mui/lab/AdapterMoment';

interface AppThemeProviderProps {
  children: ReactElement;
}

const AppThemeProvider: React.FC<AppThemeProviderProps> = (props) => {
  const { theme } = useThemeContext();
  const { locale } = useLocaleContext();
  const { muiLocale } = AppLocale[locale.locale];

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={createTheme(theme, muiLocale)}>
        <LocalizationProvider dateAdapter={DateAdapter}>
          {props.children}
        </LocalizationProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default AppThemeProvider;
