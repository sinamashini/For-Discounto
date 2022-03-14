import React, { FC } from 'react';
import { Form, Formik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { GeneralErrors } from 'shared/constants/ErrorsEnums';
import { fetchError, fetchStart, showMessage } from 'app/redux/actions';
import { useDispatch } from 'react-redux';
import { Fonts } from 'shared/constants/AppEnums';
import { Box, Button, Typography, Zoom } from '@mui/material';
import { invalidateQuery, useMutation } from 'blitz';
import { ObjPackage } from '../types';
import AppTextField from '@zhava/core/AppFormComponents/AppTextField';
import addPackage from '../mutations/addPackage';
import LevelInput from './Levels';
import { AddPackage } from '../validation';
import getPackages from '../queries/getPackages';
import editPackage from '../mutations/editPackage';


interface CreatePackageProps {
  selectPackage?: ObjPackage;
}

const CreatePackage: FC<CreatePackageProps> = ({
  selectPackage,
}) => {
  const dispatch = useDispatch();

  const [insertPackage] = useMutation(addPackage);
  const [updatePackage] = useMutation(editPackage);

  return (
    <Box sx={{ width: '100%', padding: 5 }}>
      <Formik
        validateOnChange
        initialValues={{
          name: selectPackage ? selectPackage.name : '',
          maxPayment: selectPackage ? selectPackage.maxPayment : 0,
          deadLineAfterMaxPayment: selectPackage ? selectPackage.deadLineAfterMaxPayment : 0,
          levels: selectPackage ? selectPackage.level : undefined,
        }}
        validationSchema={toFormikValidationSchema(AddPackage)}
        onSubmit={async (data, { setSubmitting, resetForm }) => {
          try {
            setSubmitting(true);
            dispatch(fetchStart());
            const opration = selectPackage !== undefined ? 'update' : 'add';
            if (opration === 'add') {
              await insertPackage(data as any);
              resetForm();
              dispatch(showMessage('پکیج با موفقیت اضافه شد'))
            } else {
              if (selectPackage?.id) {
                await updatePackage({ id: selectPackage?.id, ...data } as any);
                dispatch(showMessage('پکیج با موفقیت ویرایش شد'))
              }
            }
            invalidateQuery(getPackages);
            setSubmitting(false);
          } catch (err) {
            dispatch(fetchError(GeneralErrors.UNEXPECTED))
          }
        }}
      >
        {({ values, setFieldValue, isSubmitting, setFieldError, errors, setFieldTouched }) => (
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
                  مشخصات پکیج
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
                {values.maxPayment > 0 ?
                  <b>{Number(values.maxPayment).toLocaleString()} ریال</b> : null
                }
                <div>
                  <AppTextField
                    sx={{
                      width: "100%",
                      mb: { xs: 4, xl: 6 },
                    }}
                    type="number"
                    variant="outlined"
                    label="حداکثر پرداخت"
                    name="maxPayment"
                  />
                </div>
                <div>
                  <AppTextField
                    sx={{
                      width: "100%",
                      mb: { xs: 4, xl: 6 },
                    }}
                    type="number"
                    variant="outlined"
                    label="مدت زمان استفاده (روز)"
                    name="deadLineAfterMaxPayment"
                  />
                </div>
                <LevelInput levelsOfPackage={values.levels} setlevelsOfPackage={setFieldValue} setFieldError={setFieldError} setFieldTouched={setFieldTouched} />
                <Typography sx={{ color: 'red' }}>{errors.levels === "Required" ? 'لطفا سطح افراد و تخفیف را مشخص کنید' : errors.levels}</Typography>
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
    </Box >
  );
};

export default CreatePackage;
