import { numberErrorObject } from '@zhava/generalValidation';
import { GeneralErrors } from 'shared/constants/ErrorsEnums';
import { z } from 'zod'


export const BuyValidate = z.object({
  price: z.number(numberErrorObject),
  description: z.string().optional(),
  percentsAndLevels: z.object({
    childId: z.number(numberErrorObject),
    percent: z.number({ ...numberErrorObject, }).min(0, 'درصد تخفیف باید مساوی یا بزرگتر از ۰ باشد').max(100, 'درصد تخفیف باید کوچکتر یا مساوی ۱۰۰ باشد'),
    level: z.number(numberErrorObject)
  }).array().optional(),
});

export const AddBuyHiatory = z.object({
  clientId: z.number(numberErrorObject),
  priceWithDiscount: z.number(numberErrorObject),
  clientIds: z.number().array().optional(),
}).merge(BuyValidate);
