import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import React, { FC, useState } from "react";
import IntlMessages from "@zhava/utility/IntlMessages";
import AppScrollbar from "@zhava/core/AppScrollbar";
import AppsSideBarFolderItem from "@zhava/core/AppsSideBarFolderItem";
import AppList from "@zhava/core/AppList";
import ListEmptyResult from "@zhava/core/AppList/ListEmptyResult";
import SidebarPlaceholder from "@zhava/core/AppSkeleton/SidebarListSkeleton";
import AddIcon from "@mui/icons-material/Add";
import { Zoom } from "@mui/material";
import { AppInfoView } from "@zhava/index";
import CreateUser from './CreateUser';

const folderList = [
  { id: 1, alias: 'all', name: 'همه', path: '/users/all' },
  { id: 2, alias: 'admin', name: 'مدیر', path: '/users/ADMIN' },
  { id: 3, alias: 'editor', name: 'معاون', path: '/users/EDITOR' },
  { id: 4, alias: 'user', name: 'اپراتور', path: '/users/USER' },

]


const UserSidebar: FC = () => {
  const [openUserModal, setOpenUserModal] = useState(false);

  const handleAddUserOpen = () => {
    setOpenUserModal(true);
  };

  const handleAddUserClose = () => {
    setOpenUserModal(false);
  };

  return (
    <>
      <Box
        sx={{
          textAlign: 'center',
          pt: { xs: 4, md: 5 },
          pb: 2.5,
        }}
      >
        <Zoom in style={{ transitionDelay: "300ms" }}>
          <Button
            variant="outlined"
            color="primary"
            sx={{
              padding: "8px 28px",
              borderRadius: 8,
              "& .MuiSvgIcon-root": {
                fontSize: 26,
              },
            }}
            startIcon={<AddIcon sx={{ ml: 2 }} />}
            onClick={handleAddUserOpen}
          >
            اضافه کردن کارمند
          </Button>
        </Zoom>
      </Box>

      <AppScrollbar className="scroll-app-sidebar">
        <Box
          sx={{
            pr: 4,
            pb: { xs: 4, md: 5, lg: 6.2 },
          }}
        >
          <List
            sx={{
              mb: { xs: 2, xl: 5 },
            }}
            component="nav"
            aria-label="main task folders"
          >
            <AppList
              animation="transition.slideLeftIn"
              data={folderList}
              ListEmptyComponent={
                <ListEmptyResult
                  loading={true}
                  placeholder={
                    <Box
                      sx={{
                        px: { xs: 4, md: 5, lg: 6.2 },
                      }}
                    >
                      <SidebarPlaceholder />
                    </Box>
                  }
                />
              }
              renderRow={(item) => (
                <AppsSideBarFolderItem
                  key={item.id}
                  item={item}
                  path={item.path}
                />
              )}
            />
          </List>
          <CreateUser
            isUserAdded={openUserModal}
            handleAddUserClose={handleAddUserClose}
          />
        </Box>
        <AppInfoView />
      </AppScrollbar>
    </>
  );
};

export default UserSidebar;
