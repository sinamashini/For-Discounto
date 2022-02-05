import { IconButton, Stack, Tooltip } from '@mui/material';
import React, { useState, FC } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { AppConfirmDialog, AppLoader } from '@zhava/index';
import CreateContact from '../CreateContact';
import { GetClientResult } from '../types';
import { useMutation } from 'blitz';
import deleteClient from 'app/modules/clients/backend/mutations/deleteClient';
import { useDispatch } from 'react-redux';
import { showMessage, fetchError } from 'app/redux/actions';
import { mapedToSelectedContent } from '../backend/helpers';
// import CalculateIcon from '@mui/icons-material/Calculate';

interface Props {
  client: GetClientResult[0];
  onDelete: (id: number) => void;
  onUpdate: (opration: 'add' | 'update', data: any) => void;
}

const ContactTools: FC<Props> = ({ client, onDelete, onUpdate }) => {
  const [deleteContact, { isLoading }] = useMutation(deleteClient, {});
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  const dispatch = useDispatch();

  const deleteConfirm = async () => {
    try {
      if (client.id) {
        await deleteContact({ id: client.id });
        onDelete(client.id);
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
    {/* <Tooltip key="dis" title="اعمال تخفیف" arrow>
          <IconButton color="primary" aria-label="" component="span" onClick={() => setOpenModal(true)}>
              <CalculateIcon />
          </IconButton>
    </Tooltip> */}
  </Stack>
    <AppConfirmDialog
      open={isDeleteDialogOpen}
      onDeny={setDeleteDialogOpen}
      onConfirm={deleteConfirm}
      title={`کاربر ${client.name}`}
      dialogTitle="آیا از حذف این کاربر مطمین هستید؟"
    />
    <CreateContact
      isAddContact={openEditDialog}
      selectContact={mapedToSelectedContent(client)}
      onUpdateContact={onUpdate}
      handleAddContactClose={() => setOpenEditDialog(false)}
    />
  </>
}


export default ContactTools;
