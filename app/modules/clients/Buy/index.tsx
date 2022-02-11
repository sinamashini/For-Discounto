import { Box } from "@mui/system";
import AppDialog from "@zhava/core/AppDialog";
import AppTextField from "@zhava/core/AppFormComponents/AppTextField";
import { Form, Formik } from "formik";
import { FC } from "react";
import { Fonts } from "shared/constants/AppEnums";
import { GetClientResult } from "../types";
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { BuyValidate } from "../../../buyHistory/validation";
import { Button } from "@mui/material";
import userBuy from "app/buyHistory/mutations/userBuy";
import { useMutation } from "blitz";
import { useDispatch } from "react-redux";
import { GeneralErrors } from "shared/constants/ErrorsEnums";
import { fetchError, showMessage } from "app/redux/actions";
import { AppInfoView } from "@zhava/index";

interface Props {
  setOpenModal: (value: boolean) => void;
  openModal: boolean;
  client: GetClientResult[0]
}

const BuyModal: FC<Props> = ({ setOpenModal, openModal, client }) => {
  const [buy] = useMutation(userBuy);
  const dispatch = useDispatch();
  return (
    <AppDialog
      maxWidth="md"
      open={openModal}
      onClose={() => setOpenModal(false)}
    >
      <Formik
        validateOnChange={true}
        initialValues={{
          price: 0,
          description: ''
        }}
        validationSchema={toFormikValidationSchema(BuyValidate)}
        onSubmit={async (data, { setSubmitting, resetForm }) => {
          try {
            setSubmitting(true);
            await buy({ ...data, clientId: client.id })
            setSubmitting(false);
            dispatch(showMessage('خرید با موفقیت ثبت شد'))
          } catch (err) {
            dispatch(fetchError(GeneralErrors.UNEXPECTED));
          }
        }}
      >
        {({ values, setFieldValue }) => (
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
                  خرید کاربر
                </Box>

                <div>
                  <AppTextField
                    sx={{
                      width: "100%",
                      mb: { xs: 4, xl: 6 },
                    }}
                    variant="outlined"
                    label="قیمت"
                    type="number"
                    name="price"
                  />
                </div>
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
      <AppInfoView />
    </AppDialog>
  );
}

export default BuyModal;
