import React, { FC } from 'react';
import { Box, MenuItem, Select } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { Field } from "formik";
import { Fonts } from 'shared/constants/AppEnums';
import { ContactObj } from '../../types';
import { Clients } from '@prisma/client';

interface Props {
  values: ContactObj;
  clients: Clients[];
  selecteContact?: ContactObj;
}

const DiscountPart: FC<Props> = ({ clients }) => {
  return <><Box
    sx={{
      pb: 5,
      px: 5,
      mx: -5,
      mb: 5,
      borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
    }}
  >
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
      component="h6"
      sx={{
        mb: { xs: 4, xl: 6 },
        fontSize: 14,
        fontWeight: Fonts.SEMI_BOLD,
      }}
    >
      اطلاعات مربوط به تخفیف مشتری
    </Box>
  </Box>
  </>;
}

export default DiscountPart;
