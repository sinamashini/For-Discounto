import { IconButton, Stack, Tooltip } from '@mui/material';
import React, { useState, FC } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { AppConfirmDialog } from '@zhava/index';
import { invalidateQuery, useMutation, useRouter } from 'blitz';
import deletePackage from 'app/packages/mutations/deletePackage';
import { useDispatch } from 'react-redux';
import { fetchError, fetchStart, showMessage } from 'app/redux/actions';
import getPackages from 'app/packages/queries/getPackages';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import addPackage from 'app/packages/mutations/addPackage';
import { ObjPackage } from 'app/packages/types';

interface Props {
  packages: ObjPackage;
  id: number
}

const PackageTools: FC<Props> = ({ id, packages }) => {
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [delPac] = useMutation(deletePackage);
  const [createCopyPackage] = useMutation(addPackage);
  const dispatch = useDispatch();

  const handleDelete = async (id: number) => {
    try {
      dispatch(fetchStart())
      await delPac({ id });
      dispatch(showMessage('پکیج با موفقیت حذف شد'))
      invalidateQuery(getPackages);
    } catch (err) {
      dispatch(fetchError(err.message))
    }
  }

  const handleCopyProject = async () => {
    try {
      dispatch(fetchStart())
      const levels = packages.level.map(item => ({ levelNumber: item.levelNumber, percent: item.percent }));
      const copyPackage = { ...packages, name: `${packages.name} کپی`, createdAt: new Date(), version: 1, levels };
      await createCopyPackage(copyPackage as any);
      invalidateQuery(getPackages);
      dispatch(showMessage('پکیج با موفقیت ایجاد شد'))
    } catch (err) {
      dispatch(fetchError(err.message))
    }
  }

  const router = useRouter();

  const deleteConfirm = async () => await handleDelete(id);

  return <><Stack direction="row" alignItems="center" spacing={2}>
    <Tooltip key="edit" title="ویرایش" arrow>
      <IconButton color="primary" aria-label="edit" component="span" onClick={() => router.push({
        pathname: '/packages/edit/[packageId]',
        query:
          { packageId: id }
      })}>
        <EditIcon />
      </IconButton>
    </Tooltip>
    <Tooltip key="delete" title="حذف" arrow>
      <IconButton color="primary" aria-label="delete" component="span" onClick={() => setDeleteDialogOpen(true)}>
        <DeleteIcon />
      </IconButton>
    </Tooltip>
    <Tooltip key="delete" title="ایجاد پکیج مشابه" arrow>
      <IconButton color="primary" aria-label="copy" component="span" onClick={() => handleCopyProject()}>
        <FileCopyIcon />
      </IconButton>
    </Tooltip>

  </Stack>
    <AppConfirmDialog
      open={isDeleteDialogOpen}
      onDeny={setDeleteDialogOpen}
      onConfirm={deleteConfirm}
      title="حذف پکیج"
      dialogTitle="آیا از حذف این پکیج مطمین هستید؟"
    />
  </>
}


export default PackageTools;
