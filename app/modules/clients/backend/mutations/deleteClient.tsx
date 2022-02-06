import { DeleteGenral } from "@zhava/generalValidation";
import { resolver, SecurePassword } from "blitz"
import db from "db"

// input = { email, name, contact, nationalCode, parentId, notes, address }
export default resolver.pipe(resolver.zod(DeleteGenral), async ({ id }, ctx) => {
  await ctx.session.$authorize();

  await db.clients.delete({ where: { id } });

  return 'Done!';
})



