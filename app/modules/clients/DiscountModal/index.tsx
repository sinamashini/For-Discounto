import { FC } from 'react';
import { Grid, Box, Button } from '@mui/material';
import StatsCard from '@zhava/core/Stats/StatsCard';
import AppDialog from '@zhava/core/AppDialog';
import { useMutation, useQuery, invalidateQuery } from 'blitz';
import getClientByQuery from '../backend/queries/getClientByQuery';
import { AppInfoView, AppLoader } from '@zhava/index';
import UserAccordion from './UserAccordion';
import doTheDiscount from '../backend/mutations/doTheDiscount';
import { useDispatch } from 'react-redux';
import { fetchError, fetchStart, showMessage } from 'app/redux/actions';
import { GeneralErrors } from 'shared/constants/ErrorsEnums';
import getClients from '../backend/queries/getClients';
import { styled } from '@mui/material/styles';

const Rial = styled('span')`
  font-size: 13px;
  font-weight: bold;
`

interface DiscountProps {
  setOpenModal: (value: boolean) => void;
  openModal: boolean;
  clientId: number;
  sumPrices: number;
  discountPrice: number;
  subsetNumber: number;
  remainPrice: number;
  burnedChildren: any[];
  childerenWithPriceAndPrecent: any[];
}
const DiscountModal: FC<DiscountProps> = ({ clientId, setOpenModal, openModal, sumPrices, discountPrice, subsetNumber, burnedChildren, remainPrice, childerenWithPriceAndPrecent }) => {

  const [confirmDiscount] = useMutation(doTheDiscount);

  const [clientInDiscount, { isLoading }] = useQuery(getClientByQuery, { query: { where: { id: { in: burnedChildren } } } });

  const dispatch = useDispatch();

  if (isLoading) return <AppLoader />;

  const infosAboutClients = childerenWithPriceAndPrecent.map(item => ({ ...item, name: clientInDiscount.find(clients => clients.id === item.clientId)?.name }));

  const handleDiscount = async () => {
    try {
      dispatch(fetchStart())
      await confirmDiscount({ childIds: burnedChildren, price: discountPrice, clientId });
      dispatch(showMessage('تخفیف با موفقیت اعمال شد'))
      invalidateQuery(getClients)
      setOpenModal(false)
    } catch (err) {
      dispatch(fetchError(GeneralErrors.UNEXPECTED))
    }
  };

  return <AppDialog
    maxWidth="md"
    open={openModal}
    onClose={() => setOpenModal(false)}
  ><Grid container justifyContent="space-between" alignItems="center" sx={{ mt: 5 }}>
      <Grid item xs={12} sm={5}>
        <StatsCard
          icon={'/assets/images/dashboard/invoices.svg'}
          value={subsetNumber.toString()}
          bgColor="#e2e7f1"
          heading={"تعداد زیر مجموعه های فعال"}
        />
      </Grid>
      <Grid item xs={12} sm={5}>
        <StatsCard
          icon={'/assets/images/dashboard/total-clients.svg'}
          bgColor="#e2e7f1"
          value={<>{sumPrices?.toLocaleString()}{' '}<Rial> ریال  </Rial></>}
          heading={"میزان خرید زیرمجموعه ها"}
        />
      </Grid>
      <Grid item xs={12} sm={12} sx={{ mt: 5 }}>
        <StatsCard
          icon={'/discountPriceassets/images/dashboard/icon-avg-cost.svg'}
          bgColor="#1bcc38b3"
          value={<>{discountPrice?.toLocaleString()}{' '}<Rial>  ریال  </Rial></>}
          heading={"تخفیف تا این لحظه"}
        />
      </Grid>
      <Grid item xs={12} sm={12} sx={{ mt: 5 }}>
        <StatsCard
          icon={'/discountPriceassets/images/dashboard/icon-avg-cost.svg'}
          bgColor="#cc1b88b3"
          value={<>{remainPrice?.toLocaleString()}{' '}<Rial>  ریال  </Rial></>}
          variant="outlined"
          heading={"میزان باقی مانده تخفیف که بلا استفاده خواهد ماند"}
        />
      </Grid>
      <Box sx={{ width: '100%', mt: 5 }}>
        <UserAccordion clients={clientInDiscount} infosAboutClients={infosAboutClients} />
      </Box>
    </Grid>
    <Box sx={{ mt: 5, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Button variant="outlined" color="info" onClick={() => handleDiscount()}>تایید و اعمال تخفیف</Button>
    </Box>
    <AppInfoView />
  </AppDialog>
}

export default DiscountModal;
