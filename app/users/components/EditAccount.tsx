import { Box, Button, CircularProgress, Zoom } from '@mui/material';
import { FC, Suspense, useState } from 'react';
import { Form, Formik } from 'formik';
import { useQuery, ErrorBoundary, useMutation } from 'blitz';
import getCurrentUser from '../queries/getCurrentUser';
import ErrorFallback from '@zhava/core/Fallback/ErrorFallback';
import AppTextField from '@zhava/core/AppFormComponents/AppTextField';
import { EditUserSelfAccount } from 'app/auth/validations';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import updateAccountByUser from '../mutations/updateAccountByUser';
import { GeneralSuccess } from 'shared/constants/SuccessEnum';
import SuccessFallback from '@zhava/core/Fallback/SuccessFallback';


const EditAccount: FC = () => {
  return (<Box sx={{ width: '100%', padding: 5 }}>
    <EditUserPart />
  </Box>)
}

export default EditAccount;


const EditUserPart: FC = () => {
  const [currentUser] = useQuery(getCurrentUser, null, { useErrorBoundary: true });
  const [editUser] = useMutation(updateAccountByUser, { useErrorBoundary: true });
  const [message, setMessage] = useState('');
  const editUserSubmit = async (data, { setSubmitting }) => {
    try {
      setSubmitting(true);
      await editUser(data);
      setSubmitting(false);
      setMessage(GeneralSuccess.UPDATE);
    } catch (err) {
      setMessage('');
      setSubmitting(false);
    }
  }


  return (
    <Suspense fallback={<CircularProgress />} >
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <SuccessFallback message={message} />
        <Formik
          validateOnChange={true}
          validationSchema={toFormikValidationSchema(EditUserSelfAccount)}
          initialValues={{
            name: currentUser?.name ?? '',
            email: currentUser?.email ?? '',
            contact: currentUser?.contact ?? '',
            nationalCode: currentUser?.nationalCode ?? '',
          }}
          onSubmit={editUserSubmit}
        >
          {({ isSubmitting }) => (
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
                  }}>
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
                      type="email"
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
                      label="کد ملی"
                      name="nationalCode"
                      disabled={true}
                    />
                  </div>
                  <Box sx={{ textAlign: 'center', mt: 20 }}>
                    <Zoom in style={{ transitionDelay: "300ms" }}>
                      <Button
                        variant="outlined"
                        type="submit"
                        disabled={isSubmitting}
                        color="primary"
                        sx={{
                          textAlign: 'center',
                          borderRadius: 8,
                          fontSize: 20,
                        }}
                      >
                        ثبت
                      </Button>
                    </Zoom>
                  </Box>
                </Box>
              </Box>
            </Form>
          )}
        </Formik>
      </ErrorBoundary>
    </Suspense>
  )
}

