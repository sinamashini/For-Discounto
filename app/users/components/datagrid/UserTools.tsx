import { IconButton, Stack, Tooltip } from '@mui/material';
import React, { useState, FC } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { User } from '@prisma/client';
import { AppLoader } from '@zhava/index';
import { AppConfirmDialog } from '@zhava/index';
import CreateUser from '../CreateUser';
import { useMutation } from 'blitz';
import { useDispatch } from 'react-redux';
import { fetchError, showMessage } from 'app/redux/actions';
import deleteUser from 'app/users/mutations/deleteUser';

interface Props {
  user: User;
}

const UserTools: FC<Props> = ({ user }) => {
  const [deleteContact, { isLoading }] = useMutation(deleteUser, {});
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  const dispatch = useDispatch();

  const deleteConfirm = async () => {
    try {
      if (user.id) {
        await deleteContact({ id: user.id });
        dispatch(showMessage('کاربر حذف شد'));
      }
    } catch (error) {
      dispatch(fetchError('خطایی رخ داده لطفا مجددا امتحان کنید!'))
    }
  }

  if (isLoading) return <AppLoader />;

  return <><Stack direction="row" alignItems="center" spacing={2}>
    <Tooltip key="edit" title="ویرایش" arrow>
      <IconButton color="primary" aria-label="upload picture" component="span" onClick={() => setOpenEditDialog(true)}>
        <EditIcon />
      </IconButton>
    </Tooltip>
    <Tooltip key="delete" title="حذف" arrow>
      <IconButton color="primary" aria-label="upload picture" component="span" onClick={() => setDeleteDialogOpen(true)}>
        <DeleteIcon />
      </IconButton>
    </Tooltip>

  </Stack>
    <AppConfirmDialog
      open={isDeleteDialogOpen}
      onDeny={setDeleteDialogOpen}
      onConfirm={deleteConfirm}
      title={`کاربر ${user.name}`}
      dialogTitle="آیا از حذف این کارمند مطمین هستید؟"
    />
    <CreateUser
      isUserAdded={openEditDialog}
      selectUser={user}
      handleAddUserClose={() => setOpenEditDialog(false)}
    />
  </>
}


export default UserTools;
