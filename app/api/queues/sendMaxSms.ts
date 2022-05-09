import { SmsList } from "@prisma/client";
import { sendSingle } from "app/sms/sendSingle";
import { deleteSmsListSingle } from "app/smsList/mutations/delete";
import { Queue } from "quirrel/blitz"

export default Queue("api/queues/sendMaxSms", async (sms: SmsList) => {
    const { receptor, token1, token2, token3, template, id } = sms;

    await sendSingle(template, receptor, {
        token: token1,
        token2,
        token3
    });

    await deleteSmsListSingle({ id })
});
