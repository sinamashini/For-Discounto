import React, { ChangeEvent } from "react";
import { FieldHookConfig, useField } from "formik";
import TextField from "@mui/material/TextField";
import { TextFieldProps } from "@mui/material/TextField/TextField";
import persianJs from 'persianjs';
import onlyNumbers from "@zhava/utility/onlyNumbers";
import { digitsFaToEn } from "@persian-tools/persian-tools";


const AppTextFieldNumber = (props: TextFieldProps & FieldHookConfig<string>) => {
  const [field, meta, helpers] = useField(props);
  const { setValue } = helpers;
  const errorText = meta.error && meta.touched ? meta.error : "";


  return (
    <TextField
      {...props}
      {...field}
      value={meta.value}
      onChange={(e) => {
        setValue(digitsFaToEn(e?.target?.value))
      }}
      helperText={errorText}
      error={!!errorText}
    />
  );
};

const handleNumberOnChange = (
  event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  setFieldValue: (value: any, shouldValidate?: boolean | undefined) => void) => {
  if (event?.target?.value) {
    const number = onlyNumbers(persianJs(event.target.value).persianNumber().toString());
    const value = persianJs(number ? number.toString() : '').persianNumber().toString();
    setFieldValue(value);
  } else {
    setFieldValue('');
  }
}




export default AppTextFieldNumber;
