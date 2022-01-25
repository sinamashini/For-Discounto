import React, { ReactNode } from "react";
import Grid from "@mui/material/Grid";
import { useMediaQuery } from "@mui/material";
import { ZhavaTheme } from "../../../types/AppContextPropsType";

interface AppGridContainerProps {
  children: ReactNode;

  [x: string]: any;
}

const AppGridContainer: React.FC<AppGridContainerProps> = ({
  children,
  ...others
}) => {
  const isMDDown = useMediaQuery((theme: ZhavaTheme) =>
    theme.breakpoints.down("md")
  );
  return (
    <Grid container spacing={isMDDown ? 5 : 8} {...others}>
      {children}
    </Grid>
  );
};

export default AppGridContainer;
