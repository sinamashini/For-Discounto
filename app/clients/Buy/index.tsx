import { Box } from "@mui/system";
import AppTextField from "@zhava/core/AppFormComponents/AppTextField";
import { Form, Formik } from "formik";
import { FC, useEffect, useState } from "react";
import { Fonts } from "shared/constants/AppEnums";
import { GetClientResult } from "../types";
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { BuyValidate } from "../../buyHistory/validation";
import { Button, TextField } from "@mui/material";
import userBuy from "app/buyHistory/mutations/userBuy";
import { invalidateQuery, useMutation, useQuery } from "blitz";
import { useDispatch } from "react-redux";
import { GeneralErrors } from "shared/constants/ErrorsEnums";
import { fetchError, showMessage } from "app/redux/actions";
import getClientMap from "app/clientMap/queries/getClientMap";
import SubSetSlectiveDataGrid, { validatePayment } from "./SubSetSlectiveDataGrid";
import { GridSelectionModel } from "@mui/x-data-grid";
import getClients from "../backend/queries/getClients";

interface Props {
  client: GetClientResult[0]
}

const BuyPart: FC<Props> = ({ client }) => {
  const [clients, { isLoading, refetch }] = useQuery(getClientMap, {
    where: {
      childId: client.id,
      status: "ACTIVE",
      level: { lte: client?.packageClients[0]?.package.level.length },
      parent: {
        packageClients: { every: { status: "ACTIVE" } },
      }
    },
    include: {
      parent:
      {
        include: {
          packageClients:
          {
            include: {
              package:
              {
                include: { level: true }
              }
            }
          }
        }
      }
    }
  });

  const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);
  const [priceWithDiscount, setPriceWithDiscount] = useState(0);
  const [workedOnce, setWorkedOnce] = useState(false);

  const nonRelativeClient = clients.find((item: any) => item.parent.packageClients[0].package.level.filter(item => item.levelNumber === item.level));

  useEffect(() => {
    const peopleIncluded = client?.packageClients[0]?.package?.numberOfPeopleIncluded
    if (!workedOnce && peopleIncluded !== undefined && peopleIncluded > 0) {
      const selctedClients: any[] = [...clients];
      const selectedClients = selctedClients.filter(item => item.status === 'ACTIVE' && nonRelativeClient?.id !== item.id).slice(0, peopleIncluded).map(item => item.parentId);
      setWorkedOnce(true);
      setSelectionModel(selectedClients);
    }
  })

  const discountFn = (price: number) => {
    const maxPayment = client.packageClients[0]?.package?.maxPayment ?? 0;
    const clientDiscountFromLastBuy = client.remainDiscountAmount ?? 0;
    const clientDiscountAmount = clientDiscountFromLastBuy >= maxPayment ? maxPayment : clientDiscountFromLastBuy;
    const priceToPay = (price - clientDiscountAmount) <= 0 ? 0 : price - clientDiscountAmount;
    setPriceWithDiscount(priceToPay);
  }

  const [buy] = useMutation(userBuy);
  const dispatch = useDispatch();

  const handleBuy = async (data, setSubmitting) => {
    try {
      setSubmitting(true);
      const clientIds = selectionModel;
      const parentWithPrice = makeThedataReadyForDiscount(clients, selectionModel, data.price);
      await buy({
        ...data,
        clientId: client.id,
        priceWithDiscount,
        ...(clientIds && { clientIds: [...clientIds] }),
        ...(parentWithPrice && { parentWithPrice: [...parentWithPrice] })
      })
      setSubmitting(false);
      dispatch(showMessage('خرید با موفقیت ثبت شد'))
      invalidateQuery(getClients);
      refetch();
    } catch (err) {
      dispatch(fetchError(GeneralErrors.UNEXPECTED));
    }
  }

  if (isLoading) return <></>;

  return (
    <Formik
      validateOnChange={true}
      initialValues={{
        price: 0,
        description: ''
      }}
      validationSchema={toFormikValidationSchema(BuyValidate)}
      onSubmit={async (data, { setSubmitting }) => await handleBuy(data, setSubmitting)}
    >
      {({ values }) => (
        <Form noValidate autoComplete="off">
          <Box
            sx={{
              padding: 5,
              ml: -6,
              mr: -6,
            }}
          >
            <Box
              sx={{
                px: 5,
                mx: -5,
              }}
            >

              <div>
                {values.price ? <b>{values.price.toLocaleString()} ریال</b> : null}
                {values?.price >= 0 ? discountFn(values.price) : null}
                <AppTextField
                  sx={{
                    width: "100%",
                    mt: 2,
                    mb: { xs: 4, xl: 3 },
                  }}
                  variant="outlined"
                  label="قیمت"
                  type="number"
                  name="price"
                  InputProps={{
                    endAdornment: (<Box sx={{ pl: 2 }}>ریال</Box>)
                  }}
                />
              </div>
              <div>
                <TextField
                  sx={{
                    width: "100%",
                    mt: 2,
                    '& input': {
                      fontSize: '18px',
                      fontWeight: "bold",
                    },
                    '& .Mui-disabled': {
                      color: 'green',
                      borderColor: 'green'
                    },
                    mb: { xs: 4, xl: 3 },
                  }}
                  variant="outlined"
                  label="قیمت تمام شده با تخفیف"
                  name="ds"
                  disabled
                  inputMode="decimal"
                  value={priceWithDiscount.toLocaleString()}
                  InputProps={{
                    endAdornment: (<Box sx={{ pl: 2 }}>ریال</Box>)
                  }}
                />
              </div>
            </Box>
            <Box
              sx={{
                mt: 3,
                mb: { xs: 4, xl: 6 },
              }}>
              <Box
                component="h6"
                sx={{
                  mb: { xs: 4, xl: 6 },
                  fontSize: 14,
                  fontWeight: Fonts.SEMI_BOLD,
                }}
              >
                سرشاخه ها
              </Box>
              <SubSetSlectiveDataGrid
                maxPayment={client.packageClients[0]?.package?.maxPayment ?? 0}
                numberOfPeopleIncluded={client.packageClients[0]?.package.numberOfPeopleIncluded ?? 0}
                clients={clients.filter((item: any) => item.id !== nonRelativeClient?.id)}
                selectionModel={selectionModel}
                discountFn={discountFn}
                price={values.price}
                setSelectionModel={setSelectionModel}
              />
            </Box>
            <Box>
              <div>
                <AppTextField
                  name="description"
                  multiline
                  sx={{
                    width: "100%",
                  }}
                  rows="4"
                  variant="outlined"
                  placeholder={"توضیح"}
                />
              </div>
            </Box>
            <Box
              sx={{
                mt: 5,
                pb: 4,
                mx: -1,
                textAlign: "right",
              }}
            >
              <Button
                sx={{
                  position: "relative",
                  minWidth: 100,
                }}
                color="primary"
                variant="outlined"
                type="submit"
              >
                تایید
              </Button>
            </Box>
          </Box>
        </Form>
      )}
    </Formik>
  );
}

export default BuyPart;

const makeThedataReadyForDiscount = (fathers, selectedModel, priceAmount) => {
  const selectedClients: any[] = [];
  const clients = fathers.filter(item => selectedModel.find(father => father === item.parentId));
  clients.forEach(client => {
    const maxPayment = client.parent.packageClients[0].package.maxPayment;
    const level = client.parent.packageClients[0].package.level.find(item => item.levelNumber === client.level);
    const profit = level.percent * priceAmount / 100;
    const { price } = validatePayment(profit, maxPayment);
    selectedClients.push({ id: client.parentId, discount: price })
  });
  return selectedClients;
}
