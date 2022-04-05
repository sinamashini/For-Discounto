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
import { useMutation, useQuery } from "blitz";
import { useDispatch } from "react-redux";
import { GeneralErrors } from "shared/constants/ErrorsEnums";
import { fetchError, showMessage } from "app/redux/actions";
import getClientMap from "app/clientMap/queries/getClientMap";
import SubSetSlectiveDataGrid from "./SubSetSlectiveDataGrid";
import { GridSelectionModel } from "@mui/x-data-grid";

interface Props {
  client: GetClientResult[0]
}

const BuyPart: FC<Props> = ({ client }) => {
  const [clients, { isLoading }] = useQuery(getClientMap, {
    where: {
      parentId: client.id,
      level: { lte: client?.packageClients[0]?.package.numberOfPeopleIncluded },
      child: {
        packageClients: { every: { status: "ACTIVE" } }
      }
    },
    include: {
      child:
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

  useEffect(() => {
    const peopleIncluded = client?.packageClients[0]?.package?.numberOfPeopleIncluded
    if (!workedOnce && peopleIncluded !== undefined && peopleIncluded > 0) {
      const selctedClients: any[] = [...clients];
      const selectedClients = selctedClients.filter(item => item.status === 'ACTIVE').slice(0, peopleIncluded).map(item => item.childId);
      setWorkedOnce(true);
      setSelectionModel(selectedClients);
    }
  })

  const discountFn = (selectedClients, price: number) => {
    const selectedUsers = selectedClients.map(selected => clients.find((item) => item.childId === selected));
    const percents = [0];
    client.packageClients[0]?.package.level.forEach(client => {
      selectedUsers.forEach(item => {
        if (client.levelNumber === item.level) {
          percents.push(client.percent);
        }
      })
    })
    const sums = percents?.reduce((acc, item) => item += acc);
    const maxPayment = client.packageClients[0]?.package?.maxPayment ?? 0;
    const discount = (price * sums / 100) >= maxPayment ? maxPayment : (price * sums / 100);
    setPriceWithDiscount(price - discount);
  }

  const [buy] = useMutation(userBuy);
  const dispatch = useDispatch();

  const handleBuy = async (data, setSubmitting) => {
    try {
      setSubmitting(true);
      const clientIds = selectionModel;
      await buy({ ...data, clientId: client.id, priceWithDiscount, clientIds })
      setSubmitting(false);
      dispatch(showMessage('خرید با موفقیت ثبت شد'))
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
              <Box
                component="h6"
                sx={{
                  mb: { xs: 4, xl: 6 },
                  fontSize: 14,
                  fontWeight: Fonts.SEMI_BOLD,
                }}
              >
                لیست زیر مجموعه ها
              </Box>
              <div>
                {values.price ? <b>{values.price.toLocaleString()} ریال</b> : null}
                {discountFn(selectionModel, values.price)}
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
              }}
            >

              <SubSetSlectiveDataGrid
                numberOfPeopleIncluded={client.packageClients[0]?.package.numberOfPeopleIncluded ?? 0}
                clients={clients}
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
