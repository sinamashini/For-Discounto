import React, { FC } from 'react';
import { Box, MenuItem, Select, Typography } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { Field } from "formik";
import { Fonts } from 'shared/constants/AppEnums';
import { ContactObj } from '../../types';
import { Clients } from '@prisma/client';
import { useQuery } from 'blitz';
import getPackages from 'app/packages/queries/getPackages';
import getClients from '../../backend/queries/getClients';
import { nationalCode } from '../../backend/validation';
interface Props {
  values: ContactObj;
  clients: Clients[];
  selectContact?: ContactObj | null;
}

const DiscountPart: FC<Props> = ({ clients, values, selectContact }) => {
  const [clientPackages, { isLoading }] = useQuery(getPackages, { query: { where: { status: "ACTIVE" } } })
  if (isLoading) return <></>;
  return <><Box
    sx={{
      pb: 5,
      px: 5,
      mx: -5,
      mb: 5,
      borderTop: (theme) => `1px solid ${theme.palette.divider}`,
    }}
  >
    <Box
      component="h6"
      sx={{
        mb: { xs: 4, xl: 6 },
        mt: { xs: 4, xl: 6 },
        fontSize: 14,
        fontWeight: Fonts.SEMI_BOLD,
      }}
    >
      اطلاعات مربوط به تخفیف مشتری
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
        <Typography sx={{ fontSize: '10px', color: 'orange', fontWeight: 'bold' }}>توجه داشته باشید در صورت انتخاب پکیج امکان ویرایش فقط توسط مدیر وجود دارد</Typography>

        <InputLabel id="packages-select-outlined-packages">
          پکیج
        </InputLabel>
        <Field
          name="packageId"
          label="پکیج"
          labelId="packages-select-outlined-packages"
          as={Select}
          disabled={selectContact && selectContact.packageId !== undefined}
          sx={{
            width: "100%",
            mb: { xs: 4, xl: 6 },
          }}
        >
          <MenuItem
            value={undefined}
            key={0}
            sx={{
              cursor: "pointer",
            }}
          >
            هیچ
          </MenuItem>
          {clientPackages?.map((pac) =>
            <MenuItem
              value={pac.id}
              key={pac.id}
              sx={{
                cursor: "pointer",
              }}
            >
              {pac.name}
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
      <FormControl
        variant="outlined"
        sx={{
          width: "100%",
        }}
      >
        <Typography sx={{ fontSize: '10px', color: 'orange', fontWeight: 'bold' }}>توجه داشته باشید در صورت انتخاب معرف امکان ویرایش فقط توسط مدیر وجود دارد</Typography>
        <InputLabel id="clients-select-outlined-clients">
          معرف
        </InputLabel>
        <Field
          name="parentId"
          label="معرف"
          labelId="clients-select-outlined-clients"
          as={Select}
          disabled={selectContact && selectContact.parentId !== null}
          sx={{
            width: "100%",
            mb: { xs: 4, xl: 6 },
          }}
        >
          <MenuItem
            value={undefined}
            key={0}
            sx={{
              cursor: "pointer",
            }}
          >
            هیچ
          </MenuItem>
          {clients?.map((client) =>
            <MenuItem
              value={client.id}
              key={client.id}
              sx={{
                cursor: "pointer",
              }}
            >
              {`${client.name}-${client.nationalCode}-${client.contact}`}
            </MenuItem>
          )}
        </Field>
      </FormControl>
    </Box>

  </Box>
  </>;
}

export default DiscountPart;
