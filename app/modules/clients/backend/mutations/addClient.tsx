import { resolver, SecurePassword } from "blitz"
import db from "db"
import { AddClient } from "../validation"

export default resolver.pipe(resolver.zod(AddClient), async (params, ctx) => {
  await ctx.session.$authorize();
  const input = AddClient.parse(params)
  const hashedPassword = await SecurePassword.hash(input.nationalCode.trim());

  const client = await db.clients.create({
    data: {
      ...input, hashedPassword,
      userId: ctx.session.userId,
    },
    include: { introduced: true, parent: true, gifts: true, _count: { select: { introduced: true } } }
  });

  return client
})




