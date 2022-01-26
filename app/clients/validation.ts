import { z } from "zod"
import { GeneralErrors } from '../shared/constants/ErrorsEnums';

export const name = z.string({required_error: GeneralErrors.REQUIRED});

export const contact = z.string({required_error: GeneralErrors.REQUIRED});

export const nationalCode = z.string({required_error: GeneralErrors.REQUIRED}).refine((data) => checkNationalCode(data) === true, {
  message: GeneralErrors.NATIONALCODE_FORMAT
});

export const AddClient = z.object({
  email: z.string().email({message: GeneralErrors.EMAIL_FORMAT}).transform((str) => str.toLowerCase().trim()).optional(),
  name,
  contact,
  nationalCode,
  notes: z.string().optional(),
  address: z.string().optional(),
  parentId: z.number().nullable()
});

export const UpdateClient = z.object({
  id: z.number({ required_error: 'error' }),
}).extend({ AddClient });

export const DeleteClient = z.object({
  id: z.number({ required_error: 'مشکل در پاک کردن کاربر' })
})

export function checkNationalCode(input: string) {
  if(input.length !== 10) return false;
  if (!/^\d{10}$/.test(input)
      || input == '0000000000'
      || input == '1111111111'
      || input == '2222222222'
      || input == '3333333333'
      || input == '4444444444'
      || input == '5555555555'
      || input == '6666666666'
      || input == '7777777777'
      || input == '8888888888'
      || input == '9999999999') return false;
  let check = parseInt(input[9] as string);
  let sum = 0;
  let i;
  for (i = 0; i < 9; ++i) {
      sum += parseInt(input[i] as string) * (10 - i);
  }
  sum %= 11;
  return (sum < 2 && check == sum) || (sum >= 2 && check + sum == 11);
}

