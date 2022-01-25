import { resolver, SecurePassword } from "blitz"
import db from "db"
import { AddClient } from "../validation"

// input = { email, name, contact, nationalCode, parentId, notes, address }
export default resolver.pipe(resolver.zod(AddClient), async (input, ctx) => {
  await ctx.session.$authorize();
  const hashedPassword = await SecurePassword.hash(input.nationalCode.trim());

  const client = await db.clients.create({
    data: { ...input, hashedPassword },
    include: {introduced: true, parent: true}
  });

  return client
})

