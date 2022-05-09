import { GeneralErrors } from 'shared/constants/ErrorsEnums'
import { z } from 'zod'

export const AddSmsList = z.object({
    jobId: z.string({ required_error: GeneralErrors.REQUIRED }),
    receptor: z.string(),
    template: z.string().optional(),
    token1: z.string().optional(),
    token2: z.string().optional(),
    token3: z.string().optional(),
    text: z.string().optional(),
});

export const DeleteSmsListSingle = z.object({
    id: z.number({ required_error: GeneralErrors.REQUIRED })
});

export const DeleteSmsListBatch = DeleteSmsListSingle.array();