import React, { ChangeEvent } from "react";
import { FieldHookConfig, useField } from "formik";
import TextField from "@mui/material/TextField";
import { TextFieldProps } from "@mui/material/TextField/TextField";
import persianJs from 'persianjs';
import onlyNumbers from "@zhava/utility/onlyNumbers";


const AppTextFieldPrice = (props: TextFieldProps & FieldHookConfig<string>) => {
  const [field, meta, helpers] = useField(props);
  const { setValue } = helpers;
  const errorText = meta.error && meta.touched ? meta.error : "";

  return (
    <TextField
      {...props}
      {...field}
      value={meta.value.toLocaleString()}
      onChange={(e) => handlePriceOnChange(e, setValue)}
      helperText={errorText}
      error={!!errorText}
    />
  );
};

const handlePriceOnChange = (
  event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  setFieldValue: (value: any, shouldValidate?: boolean | undefined) => void) => {
  if (event?.target?.value) {
    const number = onlyNumbers(persianJs(event.target.value).persianNumber().toString());
    const value = persianJs(number ? number.toString() : '0').persianNumber().toString();
    setFieldValue(parseInt(value));
  } else {
    setFieldValue(0);
  }
}




export default AppTextFieldPrice;
