import { GeneralErrors } from "shared/constants/ErrorsEnums"
import { z } from "zod"

export const Levels = z.object({
  levelNumber: z.number(),
  percent: z.number().min(0).max(100)
})

export const AddPackage = z.object({
  name: z.string({ required_error: GeneralErrors.REQUIRED }),
  maxPayment: z.number({ required_error: GeneralErrors.REQUIRED }),
  deadLineAfterMaxPayment: z.number({ required_error: GeneralErrors.REQUIRED }),
  levels: Levels.array(),
  version: z.number().optional(),
  numberOfPeopleIncluded: z.number({ required_error: GeneralErrors.REQUIRED }),
})

export const EditPackage = AddPackage.merge(z.object({
  id: z.number(),
}))
