import React from "react";
import Box from "@mui/material/Box";
import AuthWrapper from "../AuthWrapper";
import SigninBlitz from "./SigninBlitz";
import AppLogo from "@zhava/core/AppLayout/components/AppLogo";

const Signin = () => {
  return (
    <AuthWrapper>
      <Box sx={{ width: "100%", mt: 20 }}>
        <Box sx={{ mb: { xs: 6, xl: 8 } }}>
          <Box
            sx={{
              mb: 5,
              display: "flex",
              alignItems: "center",
            }}
          >
            <AppLogo />
          </Box>
        </Box>

        <SigninBlitz />
      </Box>
    </AuthWrapper>
  );
};

export default Signin;
