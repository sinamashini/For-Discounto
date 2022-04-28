import { numberErrorObject } from '@zhava/generalValidation';
import { GeneralErrors } from 'shared/constants/ErrorsEnums';
import { z } from 'zod'


export const BuyValidate = z.object({
  price: z.number(numberErrorObject).min(1, 'پرداختی باید از ۰ بیشتر باشد').max(1000000000000000, ' پرداختی از حد مجاز بیشتر است خداییش انقد پول داده!!!!!'),
  description: z.string().optional(),
});

export const ParentWithPrice = z.object({ id: z.number(), discount: z.number() }).array().optional();

export const AddBuyHiatory = z.object({
  clientId: z.number(numberErrorObject),
  priceWithDiscount: z.number(numberErrorObject),
  clientIds: z.number().array().optional(),
  parentWithPrice: ParentWithPrice
}).merge(BuyValidate);
