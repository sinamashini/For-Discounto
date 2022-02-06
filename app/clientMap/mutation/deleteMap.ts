import { DeleteGenral } from "@zhava/generalValidation";
import { resolver, SecurePassword } from "blitz"
import db from "db"

export default resolver.pipe(resolver.zod(DeleteGenral), async ({ id }, ctx) => {
  await ctx.session.$authorize();

  await db.clientsMap.delete({ where: { id } });

  return 'Done!';
})



