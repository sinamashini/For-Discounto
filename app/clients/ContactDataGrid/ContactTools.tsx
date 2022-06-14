import { IconButton, Stack, Tooltip } from '@mui/material';
import React, { useState, FC } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { AppConfirmDialog, AppLoader } from '@zhava/index';
import CreateContact from '../CreateContact';
import { GetClientResult } from '../types';
import { invalidateQuery, useMutation, useRouter } from 'blitz';
import deleteClient from 'app/clients/backend/mutations/deleteClient';
import { useDispatch } from 'react-redux';
import { showMessage, fetchError, fetchStart } from 'app/redux/actions';
import { mapedToSelectedContent } from '../backend/helpers';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import SubsetModal from '../SubsetModal';
import HistoryIcon from '@mui/icons-material/History';
import BuyHistory from '../Buy/BuyHistory';
import getClients from '../backend/queries/getClients';

interface Props {
    client: GetClientResult[0];
    onDelete: (id: number) => Promise<void>;
    onUpdate: (opration: 'add' | 'update', data: any) => Promise<void>;
}

const ContactTools: FC<Props> = ({ client, onDelete, onUpdate }) => {
    const [openHistoryModal, setOpenHistoryModal] = useState(false);
    const [deleteContact, { isLoading }] = useMutation(deleteClient);
    const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [openSubSetModal, setOpenSubSetModal] = useState(false);
    const router = useRouter();

    const dispatch = useDispatch();

    const deleteConfirm = async () => {
        try {
            if (client.id) {
                dispatch(fetchStart())
                await deleteContact({ id: client.id });
                await invalidateQuery(getClients)
                dispatch(showMessage('مراجع حذف شد'));
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
        <Tooltip key="buying" title="خرید" arrow>
            <IconButton color="primary" aria-label="upload picture" component="span" onClick={() => router.push(`/discount/${client.id}`)}>
                <AttachMoneyIcon />
            </IconButton>
        </Tooltip>
        <Tooltip key="subs" title="لیست زیر مجموعه ها" arrow>
            <IconButton color="primary" aria-label="" component="span" onClick={() => setOpenSubSetModal(true)}>
                <PeopleAltIcon />
            </IconButton>
        </Tooltip>
        <Tooltip key="buyhis" title=" سابقه خرید" arrow>
            <IconButton color="primary" aria-label="" component="span" onClick={() => setOpenHistoryModal(true)}>
                <HistoryIcon />
            </IconButton>
        </Tooltip>
        <Tooltip key="delete" title="حذف مراجع" arrow>
            <IconButton color="primary" aria-label="upload picture" component="span" onClick={() => setDeleteDialogOpen(true)}>
                <DeleteIcon />
            </IconButton>
        </Tooltip>

    </Stack>
        {isDeleteDialogOpen &&
            <AppConfirmDialog
                open={isDeleteDialogOpen}
                onDeny={setDeleteDialogOpen}
                onConfirm={deleteConfirm}
                title={`کاربر ${client.name}`}
                dialogTitle="آیا از حذف این کاربر مطمین هستید؟"
            />
        }
        {openEditDialog &&
            <CreateContact
                isAddContact={openEditDialog}
                selectContact={mapedToSelectedContent(client)}
                onUpdateContact={onUpdate}
                handleAddContactClose={() => setOpenEditDialog(false)}
            />
        }

        {openSubSetModal &&
            <SubsetModal
                clientId={client.id}
                openModal={openSubSetModal}
                setOpenModal={setOpenSubSetModal}
            />
        }
        {openHistoryModal &&
            <BuyHistory
                clientId={client.id}
                openModal={openHistoryModal}
                setOpenModal={setOpenHistoryModal}
            />
        }
    </>
}


export default ContactTools;
