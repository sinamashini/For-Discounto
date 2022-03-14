import React, { FC } from 'react';
import { Field, Form, Formik } from 'formik';
import AppDialog from '@zhava/core/AppDialog';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { GeneralErrors } from 'shared/constants/ErrorsEnums';
import { fetchError, fetchStart, showMessage } from 'app/redux/actions';
import { useDispatch } from 'react-redux';
import { User } from '@prisma/client';
import { Fonts } from 'shared/constants/AppEnums';
import AppTextField from '@zhava/core/AppFormComponents/AppTextField';
import { Box, FormControl, InputLabel, MenuItem, Select, Button } from '@mui/material';
import { keys } from 'lodash';
import { useMutation, useRouter } from 'blitz';
import updateUser from '../mutations/updateUser';
import addUser from '../mutations/addUser';
import { AddUser } from 'app/auth/validations';
import { addToUsersCache, updateUsersCache } from '../updateUserQuerCache';

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
  const router = useRouter();
  const { query } = router;

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
          role: selectUser ? selectUser.role : ''
        }}
        validationSchema={toFormikValidationSchema(AddUser)}
        onSubmit={async (data, { setSubmitting, resetForm }) => {
          try {
            setSubmitting(true);
            dispatch(fetchStart());
            const opration = selectUser !== undefined ? 'update' : 'add';
            if (opration === 'add') {
              const res = await add(data as any);
              await addToUsersCache(query, res);
              resetForm();
            }
            if (opration === 'update') {
              await update({ id: selectUser?.id, ...data } as any);
              await addToUsersCache(query, { id: selectUser?.id, ...data });
            }
            handleAddUserClose()
            dispatch(showMessage('کارمند با موفقیت اضافه شد'));
            setSubmitting(false);
          } catch (err) {
            dispatch(fetchError(GeneralErrors.UNEXPECTED))
          }
        }}
      >
        {({ values, setFieldValue, isSubmitting, errors }) => (
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
                    label="role"
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
              <Button type="submit" disabled={isSubmitting} variant="contained" color="info">
                ثبت
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </AppDialog >
  );
};

export default CreateContact;
