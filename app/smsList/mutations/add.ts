// import { resolver } from "blitz";
import { DbTransaction } from "types";
import { z } from "zod";
import { AddSmsList } from "../validations";

export const addSmsList = async (input: z.infer<typeof AddSmsList>, prisma: DbTransaction) => {
    const addedSms = await prisma.smsList.create({ data: input });
    return addedSms;
}

//export default resolver.pipe(resolver.zod(AddSmsList), addSmsList)



