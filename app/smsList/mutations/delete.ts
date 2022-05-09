import db from "db";
import { z } from "zod";
import { DeleteSmsListSingle } from "../validations";


export const deleteSmsListSingle = async (input: z.infer<typeof DeleteSmsListSingle>) => {
    await db.smsList.delete({ where: { id: input.id } });
    return 'Done!';
}