import { Box, Button, CircularProgress, Zoom } from "@mui/material";
import AppTextField from "@zhava/core/AppFormComponents/AppTextField";
import ErrorFallback from "@zhava/core/Fallback/ErrorFallback";
import changePassword from "app/auth/mutations/changePassword";
import { ChangePassword } from "app/auth/validations";
import { ErrorBoundary, useMutation } from "blitz";
import { Formik, Form } from "formik";
import { FC, Suspense } from "react";
import { toFormikValidationSchema } from "zod-formik-adapter";


const EditPassword: FC = () => {
  const [editPassword] = useMutation(changePassword, { useErrorBoundary: true });

  const editPaswordSubmit = async (data, { setSubmitting, resetForm }) => {
    try {
      setSubmitting(true);
      await editPassword(data);
      setSubmitting(false);
      resetForm();
    } catch (err) {
      setSubmitting(false);
    }
  }

  return (
    <Suspense fallback={<CircularProgress />} >
      <ErrorBoundary FallbackComponent={ErrorFallback} >
        <Formik
          validateOnChange={true}
          validationSchema={toFormikValidationSchema(ChangePassword)}
          initialValues={{
            currentPassword: '',
            newPassword: ''
          }}
          onSubmit={editPaswordSubmit}
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
                      label="رمزعبور در حال استفاده"
                      name="currentPassword"
                    />
                  </div>
                  <div>
                    <AppTextField
                      sx={{
                        width: "100%",
                        mb: { xs: 4, xl: 6 },
                      }}
                      variant="outlined"
                      label="رمز عبور جدید"
                      name="newPassword"
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

export default EditPassword;
