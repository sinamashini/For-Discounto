import React from "react";
import orange from "@mui/material/colors/orange";
import { useAuthMethod, useAuthUser } from "../../../../utility/AuthHooks";
import { Box, Link } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Fonts } from "../../../../../shared/constants/AppEnums";
import AppLoader from '@zhava/core/AppLoader';

interface UserInfoProps {
  color?: string;
}

const UserInfo: React.FC<UserInfoProps> = ({ color = "text.secondary" }) => {
  const { logout } = useAuthMethod();
  const { user , isLoading } = useAuthUser();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  if (!user || isLoading) return <AppLoader />;

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const getUserAvatar = () => {
    if (user.name) {
      return user.name.charAt(0).toUpperCase();
    }
    if (user.email) {
      return user.email.charAt(0).toUpperCase();
    }
  };

  return (
    <>
      <Box
        onClick={handleClick}
        sx={{
          py: 3,
          px: 3,
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
        }}
        className="user-info-view"
      >
        <Box sx={{ py: 0.5 }}>
            <Avatar
              sx={{
                height: 40,
                width: 40,
                fontSize: 24,
                backgroundColor: '#ff954e',
              }}
            >
              {getUserAvatar()}
            </Avatar>
        </Box>
        <Box
          sx={{
            width: { xs: "calc(100% - 62px)", xl: "calc(100% - 72px)" },
            ml: 4,
            color: color,
          }}
          className="user-info"
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                mb: 0,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                fontSize: 16,
                fontWeight: Fonts.MEDIUM,
                color: "inherit",
              }}
              component="span"
            >
              {user.name ? user.name : "کاربر"}
            </Box>
            <Box
              sx={{
                ml: 3,
                color: "inherit",
                display: "flex",
              }}
            >
              <ExpandMoreIcon />
            </Box>
          </Box>
          <Box
            sx={{
              mt: -0.5,
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              color: "inherit",
            }}
          >
            مدیر
          </Box>
        </Box>
      </Box>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem
          component={Link}
          href="/my-account"
          onClick={() => {
            handleClose();
          }}
        >
          حساب کاربری
        </MenuItem>
        <MenuItem onClick={async() => await logout()}>خروج</MenuItem>
      </Menu>
    </>
  );
};

export default UserInfo;
