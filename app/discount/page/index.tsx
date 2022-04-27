import { Head, useQuery, useRouter } from 'blitz';
import { FC } from 'react';
import AppsContainer from "@zhava/core/AppsContainer";
import getClients from 'app/clients/backend/queries/getClients';
import { useDispatch } from 'react-redux';
import { fetchError, fetchStart, fetchSuccess } from 'app/redux/actions';
import { GeneralErrors } from 'shared/constants/ErrorsEnums';
import AppLoaderHandler from '@zhava/core/AppLoaderHandler';
import { Box, Button, Grid, Typography, Zoom } from '@mui/material';
import BuyPart from 'app/clients/Buy';
import StatsCard from '@zhava/core/Stats/StatsCard';
import AppsContent from '@zhava/core/AppsContainer/AppsContent';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { makeHeader } from '@zhava/utility/helper/Utils';

const DiscountPage: FC = () => {
  const router = useRouter();
  const { clientId = '1' } = router.query;

  const [clients, { isLoading, error, setQueryData, refetch, isFetching }] = useQuery(getClients, {
    where: {
      where: {
        id: parseInt(clientId as string),
      }
    }
  });

  const dispatch = useDispatch();

  if (isLoading && !isFetching) {
    dispatch(fetchStart())
  }

  if (!isLoading) {
    dispatch(fetchSuccess())
  }

  if (error) {
    dispatch(fetchError(GeneralErrors.UNEXPECTED));
  }

  const prevBtn = <Zoom in style={{ transitionDelay: "300ms" }}>
    <Button
      variant="outlined"
      color="primary"
      sx={{
        mx: 5,
        width: '5%',
        borderRadius: 8,
        "& .MuiSvgIcon-root": {
          fontSize: 26,
        },
      }}
      startIcon={<ArrowForwardIcon sx={{ ml: 2 }} />}
      onClick={() => router.push('/clients/all')}
    />
  </Zoom>

  const clientName = clients[0]?.name ?? '';
  return <AppsContainer
    title={`  عملیات خرید برای ${clientName} `}
    actionButtons={prevBtn}
    fullView={true}
  >
    <Head>
      <title> {makeHeader(`خرید  ${clientName}`)}</title>
    </Head>
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        px: 5,
        py: 2,
        flexDirection: 'column',
      }}
    >
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid xs={12} md={2} item>
          <StatsCard
            heading={
              'پکیج:'
            }
            bgColor="#e2e7f1"
            value={clients[0]?.packageClients[0]?.package.name ?? ''}
            icon={'/discountPriceassets/images/dashboard/icon-avg-cost.svg'}
          />
        </Grid>
        <Grid xs={12} md={3} item>
          <StatsCard
            heading={
              'تخفیف:'
            }
            bgColor="#e2e7f1"
            value={clients[0]?.remainDiscountAmount.toLocaleString() ?? '0'}
            icon={'/discountPriceassets/images/dashboard/icon-avg-cost.svg'}
          />
        </Grid>
        <Grid xs={12} md={3} item>
          <StatsCard
            heading={
              'حداکثر تخفیف مجاز‍:'
            }
            bgColor="#e2e7f1"
            value={`${clients[0]?.packageClients[0]?.package.maxPayment.toLocaleString()} ریال ` ?? '0 ریال'}
            icon={'/discountPriceassets/images/dashboard/icon-avg-cost.svg'}
          />
        </Grid>
        <Grid xs={12} md={2} item>
          <StatsCard
            heading={
              'تعداد افراد مجاز:'
            }
            bgColor="#e2e7f1"
            value={clients[0]?.packageClients[0]?.package.numberOfPeopleIncluded.toString() ?? '0'}
            icon={'/discountPriceassets/images/dashboard/icon-avg-cost.svg'}
          />
        </Grid>
      </Grid>
      <AppLoaderHandler isLoading={isLoading}>
        <AppsContent sx={{
          px: 5,
          py: 5,
        }}>

          {clients[0] ?
            <BuyPart
              client={clients[0]}
            /> : <Typography>کاربری با این مشخصات وجود ندارد!</Typography>}
        </AppsContent>
      </AppLoaderHandler>
    </Box>
  </AppsContainer>
}

export default DiscountPage;

