import React, { FC } from 'react';
import {Form, Formik} from 'formik';
import * as yup from 'yup';
import {useIntl} from 'react-intl';
import IntlMessages from '@zhava/utility/IntlMessages';
import Box from '@mui/material/Box';
import AppTextField from '@zhava/core/AppFormComponents/AppTextField';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import AppInfoView from '@zhava/core/AppInfoView';
import {useAuthMethod} from '@zhava/utility/AuthHooks';
import {Fonts} from 'shared/constants/AppEnums';
import login from "app/auth/mutations/login"
import { AuthenticationError, Link, useMutation, Routes, PromiseReturnType, useRouter } from "blitz"
import { useDispatch } from 'react-redux';
import { fetchError } from 'app/redux/actions';
import { AuthError, GeneralErrors } from 'shared/constants/ErrorsEnums';


const SigninBlitz:FC = () => {
  const [loginMutation, {error}] = useMutation(login)
  const router = useRouter();
  const { messages } = useIntl();
  const dispatch = useDispatch();

  const loginHandler = async (data) => {
    try {
      await loginMutation(data);
      const next = router.query.next ? decodeURIComponent(router.query.next as string) : "/"
      router.push(next)
    } catch (err) {
      if (error instanceof AuthenticationError) {
        dispatch(fetchError(AuthError.WRONG_USER_PASS))
      }
      else {
        dispatch(fetchError(GeneralErrors.UNEXPECTED))
      }
    }
  }

  const onGoToForgetPassword = () => {
    router.push('/forget-password');
  };

  const validationSchema = yup.object({
    email: yup
      .string()
      .email(String(messages['validation.emailFormat']))
      .required(String(messages['validation.emailRequired'])),
    password: yup
      .string()
      .required(String(messages['validation.passwordRequired'])),
  });

  return (
    <Box sx={{flex: 1, display: 'flex', flexDirection: 'column'}}>
      <Box sx={{flex: 1, display: 'flex', flexDirection: 'column', mb: 5}}>
        <Formik
          validateOnChange={true}
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={validationSchema}
          onSubmit={async(data, {setSubmitting}) => {
            setSubmitting(true);
            await loginHandler(data);
            setSubmitting(false);
          }}
        >
          {({isSubmitting}) => (
            <Form style={{textAlign: 'left'}} noValidate autoComplete='off'>
              <Box sx={{mb: {xs: 5, xl: 8}}}>
                <AppTextField
                  placeholder={messages['common.email'] as string}
                  name='email'
                  label={<IntlMessages id='common.email' />}
                  variant='outlined'
                  sx={{
                    width: '100%',
                    '& .MuiInputBase-input': {
                      fontSize: 14,
                    },
                  }}
                />
              </Box>

              <Box sx={{mb: {xs: 3, xl: 4}}}>
                <AppTextField
                  type='password'
                  placeholder={messages['common.password'] as string}
                  label={<IntlMessages id='common.password' />}
                  name='password'
                  variant='outlined'
                  sx={{
                    width: '100%',
                    '& .MuiInputBase-input': {
                      fontSize: 14,
                    },
                  }}
                />
              </Box>

              <Box
                sx={{
                  mb: {xs: 3, xl: 4},
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Checkbox sx={{ml: -3}} />
                  <Box
                    component='span'
                    sx={{
                      color: 'grey.500',
                    }}
                  >
                    <IntlMessages id='common.rememberMe' />
                  </Box>
                </Box>
                <Box
                  component='span'
                  sx={{
                    color: (theme) => theme.palette.primary.main,
                    fontWeight: Fonts.MEDIUM,
                    cursor: 'pointer',
                    display: 'block',
                    textAlign: 'right',
                  }}
                  onClick={onGoToForgetPassword}
                >
                  <IntlMessages id='common.forgetPassword' />
                </Box>
              </Box>

              <div>
                <Button
                  variant='contained'
                  color='primary'
                  type='submit'
                  disabled={isSubmitting}
                  sx={{
                    minWidth: 160,
                    fontWeight: Fonts.REGULAR,
                    fontSize: 16,
                    textTransform: 'capitalize',
                    padding: '4px 16px 8px',
                  }}
                >
                  <IntlMessages id='common.login' />
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Box>

      <Box
        sx={{
          color: 'grey.500',
          mb: {xs: 5, md: 7},
        }}
      >
        <span style={{marginRight: 4}}>
          <IntlMessages id='common.dontHaveAccount' />
        </span>
        <Box
          component='span'
          sx={{
            fontWeight: Fonts.MEDIUM,
            '& a': {
              color: (theme) => theme.palette.primary.main,
              textDecoration: 'none',
            },
          }}
        >
          <Link href='/signup' passHref>
            <IntlMessages id='common.signup' />
          </Link>
        </Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: (theme) => theme.palette.background.default,
          mx: {xs: -5, lg: -10},
          mb: {xs: -6, lg: -11},
          mt: 'auto',
          py: 2,
          px: {xs: 5, lg: 10},
        }}
      >
      </Box>
      <AppInfoView />
    </Box>
  );
};

export default SigninBlitz;
