import React, { FC } from 'react';
import { Field, Form, Formik } from 'formik';
import AppDialog from '@zhava/core/AppDialog';
import { AddClient } from 'app/modules/clients/backend/validation';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { GeneralErrors } from 'shared/constants/ErrorsEnums';
import { fetchError, fetchStart } from 'app/redux/actions';
import { useDispatch } from 'react-redux';
import { User } from '@prisma/client';
import { Fonts } from 'shared/constants/AppEnums';
import AppTextField from '@zhava/core/AppFormComponents/AppTextField';
import { Box, FormControl, InputLabel, MenuItem, Select, Button } from '@mui/material';
import { keys } from 'lodash';
import { useMutation } from 'blitz';
import updateUser from '../mutations/updateUser';
import addUser from '../mutations/addUser';

const roles = {
  USER: 'اپراتور',
  EDITOR: 'معاون',
  ADMIN: 'مدیر'
}

interface CreateContactProps {
  isUserAdded: boolean;
  handleAddUserClose: () => void;
  selectUser?: Partial<User>;
  onUpdateUser?: (opration: 'add' | 'update', data: any) => void;
}

const CreateContact: FC<CreateContactProps> = ({
  isUserAdded,
  handleAddUserClose,
  selectUser,
  onUpdateUser,
}) => {
  const dispatch = useDispatch();

  const [add] = useMutation(addUser);
  const [update] = useMutation(updateUser);

  return (
    <AppDialog
      maxWidth="md"
      open={isUserAdded}
      onClose={() => handleAddUserClose()}
    >
      <Formik
        validateOnChange={true}
        initialValues={{
          name: selectUser ? selectUser.name : '',
          email: selectUser ? selectUser.email : '',
          contact: selectUser ? selectUser.contact : '',
          nationalCode: selectUser ? selectUser.nationalCode : '',
          role: selectUser ? selectUser.role : "USER"
        }}
        validationSchema={toFormikValidationSchema(AddClient)}
        onSubmit={async (data, { setSubmitting, resetForm }) => {
          try {
            setSubmitting(true);
            dispatch(fetchStart());
            const opration = selectUser !== undefined ? 'update' : 'add';
            if (onUpdateUser) {
              if (opration === 'add') {
                await add(data as any);
                resetForm();
              } else {
                if (selectUser?.id) {
                  await update({ id: selectUser?.id, ...data } as any);
                }
              }
            }
            handleAddUserClose()
            setSubmitting(false);
          } catch (err) {
            dispatch(fetchError(GeneralErrors.UNEXPECTED))
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
                  اطلاعات کارمند
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
                </div>
                <div>
                  <AppTextField
                    sx={{
                      width: "100%",
                      mb: { xs: 4, xl: 6 },
                    }}
                    variant="outlined"
                    label="ایمیل"
                    name="email"
                  />
                </div>
                <div>
                  <AppTextField
                    sx={{
                      width: "100%",
                      mb: { xs: 4, xl: 6 },
                    }}
                    variant="outlined"
                    label="موبایل"
                    name="contact"
                  />
                </div>
                <div>
                  <AppTextField
                    sx={{
                      width: "100%",
                      mb: { xs: 4, xl: 6 },
                    }}
                    variant="outlined"
                    label="کدملی"
                    name="nationalCode"
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

                  <InputLabel id="packages-select-outlined-packages">
                    نقش
                  </InputLabel>
                  <Field
                    name="role"
                    label="پکیج"
                    labelId="packages-select-outlined-packages"
                    as={Select}
                    sx={{
                      width: "100%",
                      mb: { xs: 4, xl: 6 },
                    }}
                  >
                    {keys(roles).map((role) =>
                      <MenuItem
                        value={role}
                        key={role}
                        sx={{
                          cursor: "pointer",
                        }}
                      >
                        {roles[role]}
                      </MenuItem>
                    )}
                  </Field>
                </FormControl>
              </Box>
              <Button type="submit" variant="contained" color="info">
                ثبت
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </AppDialog>
  );
};

export default CreateContact;
