import React from "react";
import { Box, Button, MenuItem, Select } from "@mui/material";
import { Form, Field } from "formik";
import IntlMessages from "@zhava/utility/IntlMessages";
import { Fonts } from "shared/constants/AppEnums";
import AppTextField from "@zhava/core/AppFormComponents/AppTextField";
import { ContactObj } from "../types";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { useQuery } from "blitz";
import getClients from "app/clients/queries/getClients";
import { AppLoader } from "@zhava/index";

interface AddContactFormProps {
  handleAddContactClose: () => void;
  values: ContactObj;
}

const AddContactForm: React.FC<AddContactFormProps> = ({
  handleAddContactClose,
  values
}) => {
  const [clients, { isLoading }] = useQuery(getClients, { status: 'all'});

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

            <AppTextField
              sx={{
                mb: { xs: 4, xl: 6 },
                width: "100%",
              }}
              variant="outlined"
              label={<IntlMessages id="common.phone" />}
              name="contact"
            />

          <AppTextField
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
          pb: 4,
          mx: -1,
          textAlign: "right",
        }}
      >
         <FormControl
                  variant="outlined"
                  sx={{
                    width: "100%",
                  }}
                >
          <InputLabel id="clients-select-outlined-clients">
                معرف
          </InputLabel>
          <Field
            name="parentId"
            label="معرف"
            labelId="clients-select-outlined-clients"
            as={Select}
            sx={{
              width: "100%",
              mb: { xs: 4, xl: 6 },
            }}
          >
            {clients?.map((client) =>
              <MenuItem
                value={client.id}
                key={client.id}
                sx={{
                  cursor: "pointer",
                  }}
                >
                {client.name}
              </MenuItem>
            )}
          </Field>
          </FormControl>
      </Box>

      <Box
        sx={{
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
