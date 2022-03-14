import { IconButton, Stack, Tooltip } from '@mui/material';
import React, { useState, FC } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { AppConfirmDialog, AppLoader } from '@zhava/index';
import CreateContact from '../CreateContact';
import { GetClientResult } from '../types';
import { invoke, useMutation } from 'blitz';
import deleteClient from 'app/modules/clients/backend/mutations/deleteClient';
import { useDispatch } from 'react-redux';
import { showMessage, fetchError } from 'app/redux/actions';
import { mapedToSelectedContent } from '../backend/helpers';
import CalculateIcon from '@mui/icons-material/Calculate';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import BuyModal from '../Buy';
import DiscountModal from '../DiscountModal';
import getClientMap from 'app/clientMap/queries/getClientMap';
import getPackages from 'app/packages/queries/getPackages';
import calculatePercent from '@zhava/utility/helper/calculatePercent';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import SubsetModal from '../SubsetModal';
interface Props {
  client: GetClientResult[0];
  onDelete: (id: number) => void;
  onUpdate: (opration: 'add' | 'update', data: any) => void;
}

const calculatePrices = async (clientId: number, packageId: number) => {
  const relatedClients = await invoke(getClientMap, {
    where: { parentId: clientId, status: "ACTIVE" },
    include: { child: { include: { buyHistory: true, packageClients: { include: { package: true } } } } }
  });

  const relatedCopy: any[] = [...relatedClients];

  const prices = relatedCopy?.map(client => client.child?.buyHistory?.map((history) => ({ clientId: client.childId, price: history.price, level: client.level }))).filter(item => item.length);
  let sumPrices = 0
  prices.length && prices.map(item => item[0]).forEach(item => {
    sumPrices += item.price;
  })

  const { discount, burnedChilds } = await caclculateDiscount(packageId, prices)
  return { sumPrices, subsetNumber: relatedClients.length, discount, burnedChilds };
}

const caclculateDiscount = async (packageId: number, clientsWithPrices: any[]) => {
  const clientPackage = await invoke(getPackages, { query: { where: { id: packageId }, include: { level: true } } });
  let discount = 0;
  let burnedChilds: any = [];
  clientsWithPrices.map(item => item[0]).forEach(child => {
    if (clientPackage) {
      const levelPercent = clientPackage[0]?.level.filter(item => item.levelNumber === child.level);
      if (levelPercent && clientPackage[0] && levelPercent[0] && discount <= clientPackage[0].maxPayment) {
        discount += calculatePercent(child.price, levelPercent[0].percent)
        burnedChilds.push(child.clientId);
      }
    }
  })
  return { discount, burnedChilds }
}

const ContactTools: FC<Props> = ({ client, onDelete, onUpdate }) => {
  const [deleteContact, { isLoading }] = useMutation(deleteClient, {});
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [buyModal, setBuyModal] = useState(false);
  const [openDiscount, setOpenDiscount] = useState(false);
  const [discountObject, setDiscountObject] = useState<any>(undefined);
  const [openSubSetModal, setOpenSubSetModal] = useState(false);

  const handleDiscount = async () => {
    const packagesOfUser = client.packageClients;
    if (packagesOfUser && packagesOfUser[0]) {
      const discount = await calculatePrices(client.id, packagesOfUser[0]?.packageId)
      setDiscountObject(discount)
      setOpenDiscount(true);
    }
  }

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
    <Tooltip key="buying" title="خرید" arrow>
      <IconButton color="primary" aria-label="upload picture" component="span" onClick={() => setBuyModal(true)}>
        <AttachMoneyIcon />
      </IconButton>
    </Tooltip>
    <Tooltip key="subs" title="لیست زیر مجموعه ها" arrow>
      <IconButton color="primary" aria-label="" component="span" onClick={() => setOpenSubSetModal(true)}>
        <PeopleAltIcon />
      </IconButton>
    </Tooltip>
    <Tooltip key="dissss" title="اعمال تخفیف" arrow>
      <IconButton color="primary" aria-label="" component="span" onClick={() => handleDiscount()}>
        <CalculateIcon />
      </IconButton>
    </Tooltip>

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
    <BuyModal
      openModal={buyModal}
      setOpenModal={setBuyModal}
      client={client}
    />

    <SubsetModal clientId={client.id} openModal={openSubSetModal} setOpenModal={setOpenSubSetModal} />

    {discountObject &&
      <DiscountModal
        clientId={client.id}
        openModal={openDiscount}
        setOpenModal={setOpenDiscount}
        subsetNumber={discountObject.subsetNumber}
        discountPrice={discountObject.discount}
        sumPrices={discountObject.sumPrices}
        burnedChildren={discountObject.burnedChilds}
      />
    }
  </>
}


export default ContactTools;
