import { nationalCode } from "app/modules/clients/backend/validation"
import { GeneralErrors } from "shared/constants/ErrorsEnums"
import { z } from "zod"
import { Role } from 'types';

export const email = z
  .string({required_error: GeneralErrors.REQUIRED })
  .email({message: GeneralErrors.EMAIL_FORMAT})
  .transform((str) => str.toLowerCase().trim())

export const password = z
  .string()
  .min(10)
  .max(100)
  .transform((str) => str.trim())

export const Signup = z.object({
  email,
  password,
  nationalCode: nationalCode,
  name: z.string(),
  contact: z.string(),
  role: z.string()
})

export const AddUser = z.object({
  email,
  nationalCode: nationalCode,
  name: z.string(),
  contact: z.string(),
  role: z.string()
})

export const UpdateUser = AddUser.merge(z.object({
  id: z.number()
}))


export const Login = z.object({
  email,
  password: z.string(),
})

export const ForgotPassword = z.object({
  email,
})

export const ResetPassword = z
  .object({
    password: password,
    passwordConfirmation: password,
    token: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: ["passwordConfirmation"], // set the path of the error
  })

export const ChangePassword = z.object({
  currentPassword: z.string(),
  newPassword: password,
})

