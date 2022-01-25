import React, { ReactNode } from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import ErrorIcon from "./ErrorIcon";

class AppErrorBoundary extends React.Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
            flex: 1,
            textAlign: "center",
            "& svg": {
              width: "100%",
              maxWidth: 400,
              color: (theme) => theme.palette.primary.main,
            },
          }}
        >
          <ErrorIcon />
          <Typography
            variant="h2"
            component="h2"
            style={{ fontSize: 30, marginTop: 16 }}
          >
            اوه مث که یه مشکلی پیش اومده
          </Typography>
          <Typography style={{ fontSize: 14, marginTop: 12 }}>
           یه بار صفحه رو ریفرش کن ببین درست میشه
          </Typography>
          <Typography style={{ fontSize: 14, marginTop: 6 }}>
            اگه نمیشه به اون برنامه نویسی که منو نوشته خبر بده تا درستش کنه
          </Typography>
        </Box>
      );
    } else {
      return this.props.children;
    }
  }
}

export default AppErrorBoundary;
