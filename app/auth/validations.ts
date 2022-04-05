import { nationalCode } from "app/clients/backend/validation"
import { GeneralErrors } from "shared/constants/ErrorsEnums"
import { z } from "zod"

export const email = z
  .string({ required_error: GeneralErrors.REQUIRED })
  .email({ message: GeneralErrors.EMAIL_FORMAT })
  .transform((str) => str.toLowerCase().trim())

export const password = z
  .string({ required_error: GeneralErrors.REQUIRED })
  .min(10, 'تعداد کارکترهای رمز عبور باید از ۹ بیشتر باشد')
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

export const EditUserSelfAccount = AddUser.omit({ role: true });

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
  currentPassword: z.string({ required_error: GeneralErrors.REQUIRED }),
  newPassword: password,
})

