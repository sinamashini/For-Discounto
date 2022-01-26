import { sendSingle } from "app/sms/sendSingle";
import { resolver, SecurePassword } from "blitz"
import db from "db"
import { UpdateClient } from "../validation"

// input = { email, name, contact, nationalCode, parentId, notes, address }
export default resolver.pipe(resolver.zod(UpdateClient), async (input, ctx) => {
  await ctx.session.$authorize();

  const client = await db.clients.update({
    where: {id: input.id},
    data: input.AddClient,
    include: {introduced: true, parent: true}
  });

  sendSingle('thanks', client.contact, { token: client.name });

  return client
})

