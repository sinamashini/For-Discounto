import React from "react";
import { Box, Button } from "@mui/material";
import { Form } from "formik";
import IntlMessages from "@zhava/utility/IntlMessages";
import { Fonts } from "shared/constants/AppEnums";
import AppTextField from "@zhava/core/AppFormComponents/AppTextField";
import { ContactObj } from "../types";
import { useQuery } from "blitz";
import { AppLoader } from "@zhava/index";
import getClients from "app/clients/backend/queries/getClients";
import DiscountPart from "./Form/DiscountPart";
import AppTextFieldNumber from "@zhava/core/AppFormComponents/AppTextFieldNumber";

interface AddContactFormProps {
  handleAddContactClose: () => void;
  values: ContactObj;
  setFieldValue: (name: string, value: any) => void;
  selectContact?: ContactObj | null;
}

const AddContactForm: React.FC<AddContactFormProps> = ({
  handleAddContactClose,
  values,
  setFieldValue,
  selectContact
}) => {

  const [clients, { isLoading }] = useQuery(getClients, {
    where: {
      where: {
        isActive: true,
        ...(selectContact?.id && {
          AND: [{
            NOT: [
              { id: selectContact?.id },
              ((selectContact?.parentId && selectContact?.parentId !== 0) ? { id: selectContact.parentId } : {}),
            ]
          }]
        })
      }
    }
  });

  if (isLoading) return <AppLoader />;

  return (
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
            <IntlMessages id="contactApp.personalDetails" />
          </Box>

          <div>
            <AppTextField
              sx={{
                width: "100%",
                mb: { xs: 4, xl: 6 },
              }}
              variant="outlined"
              label="نام"
              name="name"
            />

            <AppTextFieldNumber
              sx={{
                mb: { xs: 4, xl: 6 },
                width: "100%",
              }}
              variant="outlined"
              label={<IntlMessages id="common.phone" />}
              name="contact"
            />

            <AppTextFieldNumber
              sx={{
                mb: { xs: 4, xl: 6 },
                width: "100%",
              }}
              variant="outlined"
              label="کد ملی"
              name="nationalCode"
            />
          </div>
        </Box>

        <Box
        >
          <div>
            <AppTextField
              sx={{
                width: "100%",
                mb: { xs: 4, xl: 6 },
              }}
              variant="outlined"
              label={<IntlMessages id="common.address" />}
              name="address"
            />
          </div>
        </Box>

        <AppTextField
          sx={{
            width: "100%",
            mb: { xs: 4, xl: 6 },
          }}
          variant="outlined"
          label={<IntlMessages id="common.email" />}
          name="email"
        />
      </Box>
      <DiscountPart
        clients={clients}
        selectContact={selectContact}
        values={values}
      />
      <Box>
        <div>
          <AppTextField
            name="notes"
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
          <IntlMessages id="common.save" />
        </Button>
      </Box>
    </Form>
  );
};

export default AddContactForm;
