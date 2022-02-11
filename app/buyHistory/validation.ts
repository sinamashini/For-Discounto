import { GeneralErrors } from 'shared/constants/ErrorsEnums';
import { z } from 'zod'

export const BuyValidate = z.object({
  price: z.number({ required_error: GeneralErrors.REQUIRED, invalid_type_error: "باید عدد وارد کنید" }),
  description: z.string().optional()
});

export const AddBuyHiatory = z.object({
  clientId: z.number({ required_error: GeneralErrors.REQUIRED, invalid_type_error: "باید عدد وارد کنید" }),
}).merge(BuyValidate);
