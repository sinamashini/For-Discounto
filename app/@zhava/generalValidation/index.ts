import { FormValidateError, GeneralErrors } from 'shared/constants/ErrorsEnums'
import { z } from 'zod'

export const numberErrorObject = { required_error: GeneralErrors.REQUIRED, invalid_type_error: "باید عدد وارد کنید" };

export const DeleteGenral = z.object({
  id: z.number({ required_error: FormValidateError.DELETE_FORMAT })
})

