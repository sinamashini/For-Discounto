import { resolver, SecurePassword } from "blitz"
import db from "db"
import { AddClient, DeleteClient } from "../validation"

// input = { email, name, contact, nationalCode, parentId, notes, address }
export default resolver.pipe(resolver.zod(DeleteClient), async ({ id }, ctx) => {
  await ctx.session.$authorize();

  await db.clients.delete({ where: { id } });
  return 'Done!';
})

