import { FormValidateError } from 'shared/constants/ErrorsEnums'
import { z } from  'zod'

export const DeleteGenral = z.object({
  id: z.number({ required_error: FormValidateError.DELETE_FORMAT })
})
